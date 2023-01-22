const productTitle = document.querySelector(
  "#product-title"
) as HTMLInputElement;

const productQuantity = document.querySelector(
  "#product-quantity"
) as HTMLInputElement;

const productCategory = document.querySelector(
  "#product-category"
) as HTMLSelectElement;

const addProductBtn = document.querySelector(
  "#add-product-btn"
) as HTMLButtonElement;

const productList = document.querySelector("#product-list") as HTMLDivElement;

const productQuantityWarning = document.querySelector(
  "#product-quantity-warning"
) as HTMLSpanElement;

const productCategoryWarning = document.querySelector(
  "#product-category-warning"
) as HTMLSpanElement;

const productTitleWarning = document.querySelector(
  "#product-title-warning"
) as HTMLSpanElement;

interface productType {
  id: number;
  title: string;
  category: string;
  quantity: number;
  createdDate: number;
}

class ProductView {
  products: productType[];

  constructor() {
    addProductBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      this.productValidation();
    });
    this.products = JSON.parse(localStorage.getItem("products")!) || [];
  }

  setProducts(): void {
    let list: string = "";
    this.products.forEach((item) => {
      list += `
      <div class="flex justify-between items-center" id="${item.id}">
      <span id="title" class="block text">${item.title}</span>
      <div class="flex items-center gap-x-4 ">
          <span id="date" class="block text">${item.createdDate}</span>
          <span id="category"
              class="block text border border-slate-400 rounded-md p-1 text-sm">${item.category}</span>
          <span id="quantity"
              class="bg-transparent flex items-center justify-center w-6 h-6 text border border-slate-500 rounded-full">${item.quantity}</span>
          <button id="delete-btn"
              class="p-1 text-sm text-red-700 dark:text-red-400 font-bold border-red-400 dark:border-red-500">delete</button>
      </div>
  </div>
  `;
    });
    productList.innerHTML = list;
  }

  productValidation(): void {
    if(productTitle.value.length === 0){
      this.removeWarning();
      this.setTitleWarning("Type a title for product")
    }
    else if (Number(productQuantity.value) < 1 ) {
      this.removeWarning();
      this.setQuantityWarning("Product number must be larger than 0");
    } else if (productCategory.value === "none"){
      this.removeWarning();
      this.setCategoryWarning("Select a category");
    } else {
      this.addProduct();
      this.removeWarning();
    }
  }

  addProduct(): void {
    const newProduct: productType = {
      title: productTitle.value,
      quantity: Number(productQuantity.value),
      category: productCategory.options[productCategory.selectedIndex].text,
      id: new Date().getTime(),
      createdDate: new Date().getFullYear(),
    };
    if (localStorage.getItem("products")) {
      const productsData: productType[] = JSON.parse(
        localStorage.getItem("products")!
      );
      productsData.push(newProduct);
      localStorage.setItem("products", JSON.stringify(productsData));
    } else {
      localStorage.setItem("products", JSON.stringify([newProduct]));
    }
    this.products = JSON.parse(localStorage.getItem("products")!);
    this.setProducts();
    productTitle.value = "";
    productQuantity.value = "";
  }

  setTitleWarning(error: string): void {
    productTitleWarning.classList.remove("hidden");
    productTitleWarning.classList.add("block");
    productTitleWarning.innerText = error;
    productTitle.classList.add("border-red-500");
  }

  setQuantityWarning(error: string): void {
    productQuantityWarning.classList.remove("hidden");
    productQuantityWarning.classList.add("block");
    productQuantityWarning.innerText = error;
    productQuantity.classList.add("border-red-500");
  }

  setCategoryWarning(error: string): void {
    productCategoryWarning.classList.remove("hidden");
    productCategoryWarning.classList.add("block");
    productCategoryWarning.innerText = error;
    productCategory.classList.add("border-red-500");
  }

  removeWarning(): void {
    productQuantityWarning.classList.remove("block");
    productQuantityWarning.classList.add("hidden");
    productQuantity.classList.remove("border-red-500");

    productCategoryWarning.classList.remove("block");
    productCategoryWarning.classList.add("hidden");
    productCategory.classList.remove("border-red-500");

    productTitleWarning.classList.remove("block");
    productTitleWarning.classList.add("hidden");
    productTitle.classList.remove("border-red-500");
  }
}

export default new ProductView();
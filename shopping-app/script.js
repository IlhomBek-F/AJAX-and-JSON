const navToggler = document.querySelector(".navbar-toggler");
const navCollapse = document.querySelector(".navbar-collapse");
const cardContainer = document.querySelector(".card-container");
const cardBtn = document.querySelector("#card-btn");
const countInfo = document.getElementById("card-count-info");
const productList = document.querySelector(".product-list");
const banner = document.getElementById("banner");
const shoppingText = document.getElementById("shopping-text");

let productID = 1;
let count = 0;
let msc = 1;
counter();
navToggler.addEventListener("click", () => {
  navCollapse.classList.toggle("show-navbar");
});

window.addEventListener("DOMContentLoaded", () => {
  ProductWillLoad();
});

function ProductWillLoad() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "products.json", true);

  xhr.onload = function () {
    if (this.status == 200) {
      productLoaded(this.responseText);
    }
  };

  xhr.send();
}

function productLoaded(data) {
  const prd = JSON.parse(data);

  prd.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product-item");
    div.innerHTML = `
    <div class="product-img">
    <img src="${
      product.imgSrc === 404 ? console.log("not found") : product.imgSrc
    }" />
    <button class="add-to-card-btn">
      <i class="fas fa-shopping-cart"></i>Add to Cart
    </button>
  </div>

  <div class="product-content">
    <h3 class="product-name">${product.name}</h3>
    <span class="product-category">${product.category}</span>
    <p class="product-price">$${product.price}</p>
  </div>
    `;
    const btn = div.querySelector(".add-to-card-btn");
    btn.addEventListener("click", purchaseProduct);

    productList.appendChild(div);
  });
}

function purchaseProduct(e) {
  let product = e.target.parentElement.parentElement;
  getProductInfo(product);
  counter();
}

function counter() {
  productLength = getFromLocal();
  countInfo.innerHTML = count++;
  countInfo.innerHTML = productLength.length;
}

function minusCount() {
  productLength = getFromLocal();
  countInfo.innerHTML = productLength.length - msc;
}

function getProductInfo(product) {
  let productInfo = {
    id: productID,
    imgSrc: product.querySelector(".product-img img").src,
    name: product.querySelector(".product-name").textContent,
    category: product.querySelector(".product-category").textContent,
    price: product.querySelector(".product-price").textContent,
  };
  productID++;

  AddToLocalStorage(productInfo);
}

function AddToLocalStorage(product) {
  let fromLocal = getFromLocal();
  fromLocal.push(product);
  localStorage.setItem("product", JSON.stringify(fromLocal));
}

function getFromLocal() {
  return localStorage.getItem("product")
    ? JSON.parse(localStorage.getItem("product"))
    : [];
}

cardBtn.addEventListener("click", () => {
  const fromLocal = getFromLocal();
  productList.innerHTML = "";
  fromLocal.forEach((item) => {
    const { category, imgSrc, name, price } = item;
    const div = document.createElement("div");
    div.setAttribute("data-id", `${item.id}`);
    div.classList.add("product-item");
    div.innerHTML = `
    <div class="product-img">
    <img src="${imgSrc}" />
    <button class="add-to-card-btn delete">
      <i class="fas fa-trash"></i>Delete
    </button>
  </div>

  <div class="product-content">
    <h3 class="product-name">${name}</h3>
    <span class="product-category">${category}</span>
    <p class="product-price">$${price}</p>
  </div>
    `;
    productList.addEventListener("click", deleteProduct);
    productList.appendChild(div);
  });
});

function deleteProduct(e) {
  let cardItem;
  if (e.target.classList.contains("delete")) {
    cardItem = e.target.parentElement.parentElement;
    cardItem.remove();
  } else if (e.target.tagName === "I") {
    cardItem = e.target.parentElement.parentElement;
  }
  minusCount();
  let product = getFromLocal();
  let deleteProductfromLocal = product.filter((proId) => {
    return proId.id !== parseInt(cardItem.dataset.id);
  });

  localStorage.setItem("product", JSON.stringify(deleteProductfromLocal));
}

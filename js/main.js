let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCate");
let productDescInput = document.getElementById("productDes");
let productImgInput = document.getElementById("productImg");
let searchInput = document.getElementById("searchInput");
let btnAdd = document.getElementById("btnAdd");
let btnUpdate = document.getElementById("btnUpdate");

let currentIndex = 0;
let allProducts = [];

if (localStorage.getItem("allProducts") != null) {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  displayProduct();
}

// function to add product
function addProduct() {
  let staticImg = productImgInput.files[0]
    ? productImgInput.files[0].name
    : "1.jpg";
  if (
    validateForm(productNameInput, "msgName") &&
    validateForm(productPriceInput, "msgPrice") &&
    validateForm(productCategoryInput, "msgCategory") &&
    validateForm(productDescInput, "msgDescription")
  ) {
    let product = {
      name: productNameInput.value.trim(),
      price: Number(productPriceInput.value),
      category: productCategoryInput.value.trim(),
      desc: productDescInput.value.trim(),
      img: staticImg,
    };

    allProducts.push(product);
    localStorage.setItem("allProducts", JSON.stringify(allProducts));

    displayProduct();
    clearForm();
  }
}

// function to clear form
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
  productImgInput.value = "";
  document.querySelectorAll(".form-control").forEach(input => {
    input.classList.remove("is-valid", "is-invalid");
  });
  document.querySelectorAll(".alert").forEach(msg => {
    msg.classList.add("d-none");
  });
}

// cardProduct
function cardProduct(i) {
  return `<div class="col-lg-3 col-md-4 g-4 product">
      <div class="card rounded-3" >
          <img src="./images/${allProducts[i].img}" class="card-img-top " alt="${allProducts[i].name}" >
          <div class="card-body">
              <h3 class="card-title d-flex justify-content-center">${allProducts[i].name}</h3>
              <h6 class="card-title d-flex justify-content-between">Price: <span>${allProducts[i].price} EGP</span></h6>
              <h6 class="card-title d-flex justify-content-between">Category: <span>${allProducts[i].category}</span></h6>
              <div class="d-flex justify-content-between mt-4">
              <button onclick=deleteProduct(${i}) class="btn btn-danger"><i class="fa fa-trash"></i></button>
              <button onclick=setUpdateInfo(${i}) class="btn btn-warning"><i class="fa fa-pen"></i></button>
             </div>
            </div>
          </div>
      </div>`;
}

// function displayProduct
function displayProduct() {
  let container = ``;
  for (let i = 0; i < allProducts.length; i++) {
    container += cardProduct(i);
  }
  document.getElementById("rowData").innerHTML = container;
}

//function to delete Product
function deleteProduct(index) {
  allProducts.splice(index, 1);
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  displayProduct();
}

//function to setUpdate Information
function setUpdateInfo(index) {
  currentIndex = index;
  productNameInput.value = allProducts[index].name;
  productPriceInput.value = allProducts[index].price;
  productCategoryInput.value = allProducts[index].category;
  productDescInput.value = allProducts[index].desc;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

//function to Update Product
function updateProduct() {
  let staticImg = allProducts[currentIndex].img;
  if (productImgInput.files[0]) {
    staticImg = productImgInput.files[0].name;
  }
  let product = {
    name: productNameInput.value.trim(),
    price: Number(productPriceInput.value),
    category: productCategoryInput.value.trim(),
    desc: productDescInput.value.trim(),
    img: staticImg,
  };
  allProducts.splice(currentIndex, 1, product);
  localStorage.setItem("allProducts", JSON.stringify(allProducts));

  clearForm();
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  displayProduct();
}

// function to search
function searchProduct(search) {
  let container = ``;
  let found = false;

  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name.toLowerCase().includes(search.toLowerCase())) {
      found = true;
      container += cardProduct(i);
    }
  }

  if (!found) {
    container = `<h2 class="text-center w-100 mt-5">No products found</h2>`;
  }

  document.getElementById("rowData").innerHTML = container;
}

// validation function
function validateForm(element, msgId) {
  var text = element.value;
  var regex = {
    productName: /^[A-Z][a-z]{2,19}$/,
    productPrice: /^\d{1,10}(\.\d{1,2})?$/,
    productCate: /^(Mobile|Tv|Screen|Tablet|Laptop)$/i,
    productDes: /^.{3,150}$/,
    productImage: /^.{1,}\.(jpg|png|avif|jpeg|svg)$/,

  };
  
  var msg = document.getElementById(msgId);
  if (regex[element.id].test(text) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
  }
}

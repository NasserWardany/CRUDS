var productName = document.getElementById("name");
var productPrice = document.getElementById("price");
var productCategory = document.getElementById("category");
var productInfo = document.getElementById("info");

var products = [];
var mainIndex;
if (localStorage.getItem("products") != null) {
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}

function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        info: productInfo.value
    }

    if (document.getElementById("addUpdatebtn").innerHTML == "Add Product") {
        products.push(product);
    } else {
        products.splice(mainIndex, 1, product);
        document.getElementById("addUpdatebtn").innerHTML = "Add Product";
    }

    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();
    clear();
}

function displayProducts() {
    var searchTerm = document.getElementById("searchInput").value
    var container = "";
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
            container += `
    <tr>
    <td>${i + 1}</td>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].category}</td>
    <td>${products[i].info}</td>
    <td>
        <button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button>
    </td>
    <td>
        <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button>
    </td>
    </tr>
    `;
        }
    }

    document.getElementById("tbody").innerHTML = container;

}

function clear() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productInfo.value = "";
}
function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts()
    localStorage.setItem("products", JSON.stringify(products));

}

function updateProduct(index) {
    mainIndex = index;
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productCategory.value = products[index].category;
    productInfo.value = products[index].info;

    document.getElementById("addUpdatebtn").innerHTML = "Update Product";

}







var logOut = document.querySelector('#logOut')
var userName = document.querySelector('#userName')

if (localStorage.getItem('name') != null) {
    userName.append(JSON.parse(localStorage.getItem('name')))
}




logOut.addEventListener('click' , function () {
    window.location.replace('index.html')
})


//--------------------imageChanger

var userImageChanger = document.querySelector('.userImageChanger')
userImageChanger.src = JSON.parse(localStorage.getItem('img'))

// ------------------  crud js ********************

//CRUD
//--> Create = Add
//--> Read  = Display
//--> Update
//--> Delete


var productName = document.getElementById("Product-name");
var productPrice = document.getElementById("Product-Price");
var productCategory = document.getElementById("Product-Cat");
var productSale = document.getElementById("Product-Sale");
var productDescription = document.getElementById("Product-Desc");
var searchInput = document.getElementById("search");
var allProducts = [];
var userEmail = JSON.parse(localStorage.getItem('userEmail'))
var allUsers = JSON.parse(localStorage.getItem('userData'))

    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].userEmail == userEmail) {
        if (allUsers[i].userProducts) {
          allProducts = allUsers[i].userProducts
        }
        else {
          allProducts = []
        }
      }
    }
showData()
function addProduct() {
        var product = {
            name: productName.value,
            price: Number(productPrice.value),
            category: productCategory.value,
            sale: productSale.checked,
            description: productDescription.value
        };
        if (product.sale == true) {
            product.sale = 'yes'
        }
        else {
            product.sale = 'no'
        }
        // ------------------------------------> علشان الداتا تتخزن كل مره function خطوة التخزين هتبقي جوه ال  // c--------------------> ( 4 )
        allProducts.push(product);

        //localStorage.setItem("products", JSON.stringify(allProducts)); *****
       

        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].userEmail == userEmail) {
            allUsers[i].userProducts = allProducts
            localStorage.setItem('userData', JSON.stringify(allUsers))
          }
        }
        // ------------------------------------> المسؤوله عن حذف المدخلات وهتتنفذ بعد ما الداتا تتخزن function هنا هستدعي ال // c------------------> ( 5 )
        clearForm();
        // -------------------------------------------------------------------------------> المسؤوله عن عرض الداتا function هنا هستدعي ال // c------------------> ( 6 )
        showData();
}

function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "TV";
    productSale.checked = false;
    productDescription.value = ""
}

function showData() {
    var cartona = ""
    // بدون  الكرتونه الداتا اللي هتظهر هتكون لاخر منتج اتضاف فقط
    for (i = 0; i < allProducts.length; i++) {
        cartona += `<tr>
        <td>`+ (i+1) + `</td>
        <td>${allProducts[i].name.toLowerCase()}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].category.toLowerCase()}</td>
        <td>${allProducts[i].sale}</td>
        <td>${allProducts[i].description}</td>
        <td><button onclick="updateProduct(`+ i + `)" class="upBtn">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="delBtn">Delete</button></td>
        <td></td>
    </tr>`
    }

    document.getElementById("tBody").innerHTML = cartona
}


function deleteProduct(elementNumber) {
    allProducts.splice(elementNumber, 1)
   

        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].userEmail == userEmail) {
            allUsers[i].userProducts = allProducts
            localStorage.setItem('userData', JSON.stringify(allUsers))
          }
        }

    showData()
}

/* *********************************** */

function deleteAll() {
    allProducts.splice(0)
 

        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].userEmail == userEmail) {
            allUsers[i].userProducts = allProducts
            localStorage.setItem('userData', JSON.stringify(allUsers))
          }
        }
    showData()
}


/* ******************************* */

function updateProduct(y) {
  if (allProducts[y].sale == 'yes') {
    productSale.checked = true
  }
  else {
    productSale.checked = false
  }
    productName.value = allProducts[y].name;
    productPrice.value = allProducts[y].price;
    productCategory.value = allProducts[y].category;
    productDescription.value = allProducts[y].description;
    document.getElementById("Add").innerHTML = `<button onclick="editProduct(${y})" class="editBtn mt-2" >Edit Product</button>`
}

/* ***************************** */

function editProduct(x) {
    var edit = {
        name: productName.value,
        price: Number(productPrice.value),
        category: productCategory.value,
        sale: productSale.checked,
        description: productDescription.value
    };
    if (edit.sale == true) {
        edit.sale = 'yes'
    }
    else {
        edit.sale = 'no'
    }
    allProducts.splice(x, 1, edit)
    showData()
    

        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].userEmail == userEmail) {
            allUsers[i].userProducts = allProducts
            localStorage.setItem('userData', JSON.stringify(allUsers))
          }
        }
    clearForm()
    document.getElementById("Add").innerHTML = '<button onclick="addProduct()" class="addBtn mt-2" >Add Product</button>'
}

// ******************* > filter معموله display وهو عباره عن search هنا هعمل جزء ال 
function searchProduct(term) {
    var cartona = ""
   
    for (i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name.toLowerCase().includes(term.toLowerCase())==true || allProducts[i].category.toLowerCase().includes(term.toLowerCase())==true) {
            cartona += `<tr>
        <td>`+ (i+1) + `</td>
        <td>${allProducts[i].name.toLowerCase().replace( term.toLowerCase() , `<span class='bg-main'>${term.toLowerCase()}</span>`)}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].category.toLowerCase().replace( term.toLowerCase() , `<span class='bg-main'>${term.toLowerCase()}</span>`)}</td>
        <td>${allProducts[i].sale}</td>
        <td>${allProducts[i].description}</td>
        <td><button onclick="updateProduct(`+ i + `)" class="upBtn">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="delBtn">Delete</button></td>
        <td></td>
    </tr>`
        }
    }
    document.getElementById("tBody").innerHTML = cartona
}




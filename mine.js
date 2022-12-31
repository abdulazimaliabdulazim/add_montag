// Summon Items From Html
let title = document.getElementById("title");
let price = document.getElementById("price");
let ms = document.getElementById("ms");
let discounts = document.getElementById("discounts");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let button = document.getElementById("deleteAll");
let mood = "create";
let index;

// Get Total
function getTotal() {
  if (price.value !== "") {
    let result = +price.value - +discounts.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// Clare Input
function clareData() {
  title.value = "";
  price.value = "";
  ms.value = "";
  discounts.value = "";
  count.value = "";
  category.value = "";
}

// Create Product
let dataProduct;
if (window.localStorage.getItem("Product") != null) {
  dataProduct = JSON.parse(window.localStorage.getItem("Product"));
} else {
  dataProduct = [];
}

create.onclick = function () {
  // Create Object
  let dataObject = {
    title: title.value.toLowerCase(),
    price: price.value,
    ms: ms.value,
    discounts: discounts.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
    date: new Date(),
  };
  // Clean Data
  if (title.value != "" && price.value != "" && dataObject.count < 101) {
    // Mood (Create)
    if (mood === "create") {
      // Create Product Or Products
      if (dataObject.count > 1) {
        for (let i = 0; i < dataObject.count; i++) {
          dataProduct.push(dataObject); // Create Products ......
        }
      } else {
        dataProduct.push(dataObject); // Create Product One
      }
      addProduct("تم أضافة منتج بنجاح", "#ffffffc2", "#000000bd");
    } else {
      // Mood (Update)
      dataProduct[index] = dataObject;
      mood = "create";
      create.innerHTML = "Create";
      count.style.display = "block";
      addProduct("تم تعديل المنتج بنجاح", "#222", "#white");
    }
  } else {
    addProduct("أدخل بيانات صحيحية", "#222", "white");
  }
  // Save LocalStorage
  window.localStorage.setItem("Product", JSON.stringify(dataProduct));
  // Function Restart
  clareData();
  showData();
  getTotal();
};

// show Data
function showData() {
  let tbody = "";
  for (let i = 0; i < dataProduct.length; i++) {
    tbody += `<tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].ms}</td>
                    <td>${dataProduct[i].discounts}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td>${dataProduct[i].date}</td>
                    <td><button onclick="update(${i})" id="update">UPDATE</button></td>
                    <td><button onclick="delate(${i})" id="delate">DELETE</button></td>
                </tr>`;
    document.getElementById("tbody").innerHTML = tbody;
  }
  //Create Button (Delate All)
  if (dataProduct.length > 0) {
    button.innerHTML = `<button>Delate All (${dataProduct.length})</button>`;
  } else {
    button.innerHTML = "";
  }
}

// Delate product
function delate(i) {
  dataProduct.splice(i, 1);
  window.localStorage.Product = JSON.stringify(dataProduct);
  showData();
  addProduct("تم حذف المنتج بنجاح", "#222", "red");
}

// Update
function update(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  ms.value = dataProduct[i].ms;
  discounts.value = dataProduct[i].discounts;
  getTotal();
  count.style.display = "none";
  create.innerHTML = "Update";
  category.value = dataProduct[i].category;
  mood = "update";
  index = i;
  let tbody = "";
  tbody += `<tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}....</td>
                <td>${dataProduct[i].price}....</td>
                <td>${dataProduct[i].ms}....</td>
                <td>${dataProduct[i].discounts}....</td>
                <td>${dataProduct[i].total}....</td>
                <td>${dataProduct[i].category}....</td>
                <td>${dataProduct[i].date}....</td>
                <td><button onclick="update(${i})" id="update">UPDATE</button></td>
                <td><button onclick="delate(${i})" id="delate">DELETE</button></td>
            </tr>`;
  document.getElementById("tbody").innerHTML = tbody;
}

// Mood By Search
let searchMood = "ms";
function moodByTitleAndCategory(id) {
  if (id === "ms") {
    searchMood = "ms";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}
// Search
function searchOnData(val) {
  let tbody = "";
  for (let i = 0; i < dataProduct.length; i++) {
    // Loop And Data On Title & Category
    if (searchMood == "ms") {
      // Search And Title
      if (dataProduct[i].ms.includes(val.toLowerCase())) {
        tbody += `<tr>
                            <td>${i + 1}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].ms}</td>
                            <td>${dataProduct[i].discounts}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td>${dataProduct[i].date}</td>
                            <td><button onclick="update(${i})" id="update">UPDATE</button></td>
                            <td><button onclick="delate(${i})" id="delate">DELETE</button></td>
                        </tr>`;
      }
    } else {
      // Search And Category
      if (dataProduct[i].category.includes(val.toLowerCase())) {
        tbody += `<tr>
                            <td>${i + 1}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].ms}</td>
                            <td>${dataProduct[i].discounts}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td>${dataProduct[i].date}</td>
                            <td><button onclick="update(${i})" id="update">UPDATE</button></td>
                            <td><button onclick="delate(${i})" id="delate">DELETE</button></td>
                        </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = tbody;
}

// Facilitate the user
search.addEventListener("keyup", function () {
  scroll({
    top: 310,
    behavior: "smooth",
  });
});

// Add Product
async function addProduct(text, background, color) {
  const resolve = await new Promise((res, rej) => {
    let div = document.createElement("div");
    div.innerHTML = text;
    div.style.cssText = `position: fixed; top: 90%; left: 50%; transform: translate(-50%, -50%) ;background-color: ${background}; color: ${color}; font-size: 20px; font-weight: bold; padding: 7px 10px; border: 2px solid white; border-radius: 5px`;
    res(div);
  });
  document.body.appendChild(resolve);
  setTimeout(() => resolve.remove(), 3000);
}

// Check
let parent = document.createElement("div");
const deleteAll = async function () {
  // let parent = document.createElement("div");
  // Clare
  let clare = document.createElement("span");
  let clareText = document.createTextNode("Delete");
  clare.append(clareText);
  clare.style.cssText =
    "font-size: 20px; color: red; font-weight: bold; border: 2px solid; cursor: pointer; margin: 0 8px 0 0; border-radius: 10px; padding: 5px 10px";
  clare.addEventListener("click", () => {
    window.localStorage.clear();
    dataProduct.splice(0);
    addProduct("تم حذف جميع المنتجات", "red", "white");
    showData();
    parent.remove();
  });
  return clare;
};
deleteAll()
  .then((clare) => {
    // Clare
    let parentCloseAndClear = document.createElement("div");
    parentCloseAndClear.style.cssText = "text-align: center; margin-top: 10px";
    parentCloseAndClear.appendChild(clare);
    return parentCloseAndClear;
  })
  .then((parentCloseAndClear) => {
    // Close
    let closeA = document.createElement("span");
    let closeText = document.createTextNode("Close");
    closeA.append(closeText);
    closeA.style.cssText =
      "font-size: 20px; color: #ffc107d1; font-weight: bold; border: 2px solid; cursor: pointer; margin: 0 0 0 8px; border-radius: 10px; padding: 5px 10px";
    parentCloseAndClear.appendChild(closeA);
    closeA.onclick = () => parent.remove();
    return parentCloseAndClear;
  })
  .then((parentCloseAndClear) => {
    parent.style.cssText = // Parent
      "position: fixed; width: auto; height: 100px; background-color: black; padding: 25px; display: flex; justify-content: space-between; align-items: center; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 20px;font-weight: bold; display: block";
    let check = document.createElement("div");
    let checkText = document.createTextNode(
      "هل أنت متأكد من حذف جميع المنتجات"
    );
    check.append(checkText);
    check.style.cssText = "padding: 0 0 25px 0; text-align: center";
    parent.append(check);
    parent.appendChild(parentCloseAndClear);
    return parent;
  })
  .then((parent) => {
    button.onclick = () => document.body.appendChild(parent);
  });

showData();

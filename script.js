// Swal.fire({
//   html: `<div class="welcome">Welcome To The Shop</div>`,
//   allowOutsideClick: false,
//   showConfirmButton: false,
//   timer: 3500,
//   backdrop:'white',
//   width:'100%',
//   willOpen: () => {
//     Swal.showLoading();
//   },
// });

const products = [
  {
    name: "1.5 ltr Bottle",
    price: 20,
    image: "/product/1.5.avif",
    intro: "Extra Virgin Olive Oil 1.5ltr Bottle 0.3 Acidity",
    category: "olive"
  },
  {
    name: "2 ltr Bottle",
    price: 20,
    image: "/product/2.avif",
    intro: "Extra Virgin Olive Oil 2ltr Bottle 0.3 Acidity",
    category: "olive"
  },
  {
    name: "5 ltr Bottle",
    price: 20,
    image: "/product/5.avif",
    intro: "Extra Virgin Olive Oil 5ltr Bottle 0.3 Acidity",
    category: "olive"
  },
  {
    name: "0.25 ltr Bottle",
    price: 20,
    image: "/product/25.png",
    intro: "Extra Virgin Olive Oil 0.25ltr Bottle 0.3 Acidity",
    category: "olive"
  },
  {
    name: "0.5 ltr Bottle",
    price: 20,
    image: "/product/5.png",
    intro: "Extra Virgin Olive Oil 0.5ltr Bottle 0.3 Acidity",
    category: "olive"
  },
];

const shoppingCart = [];
let cartButton = document.querySelector(".navbar-text.btn.btn-warning i");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 350 ||
    document.documentElement.scrollTop > 400
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function SearchFunction() {
  var input, filter, div, products, h5, i, txtValue, noResults;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("product-list");
  products = div.getElementsByClassName("product");
  noResults = true;

  for (i = 0; i < products.length; i++) {
      h5 = products[i].getElementsByTagName("h5")[0];
      txtValue = h5.textContent || h5.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          products[i].style.display = "";
          noResults = false;
      } else {
          products[i].style.display = "none";
      }
  }

  var noResultsMessage = document.getElementById("no-results-message");
  if (noResults) {
      if (!noResultsMessage) {
          noResultsMessage = document.createElement("h3");
          noResultsMessage.id = "no-results-message";
          noResultsMessage.innerHTML = `<div class="container mt-5"><center>No product with the name "${input.value}"</center></div>`;
          noResultsMessage.style.color = "red";
          div.appendChild(noResultsMessage);
      } else{
        noResultsMessage.remove();
      }
  } else{
      noResultsMessage.remove();
  }
}


function filterByCategory() {
    const selectedCategories = Array.from(document.querySelectorAll('#category-filter input[type="checkbox"]:checked')).map(cb => cb.value.toUpperCase());
    const products = document.querySelectorAll("#product-list .product");
    products.forEach(product => {
        const category = product.querySelector("h6").innerText.toUpperCase();
        if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}

displayProducts();

function displayProducts() {
  const productListDiv = document.getElementById("product-list");
  productListDiv.innerHTML = "";

  products.forEach((product) => {
    const productCard = `
            <div class="col-lg-4 col-md-6 col-sm-6 mb-4 product" id="computer">
                <div class="card bg-dark text-white">
                    <img src="${product.image}" class="card-img-top" alt="product img" onclick="description('${product.intro}', '${product.image}', '${product.name}', '${product.price}')">
                    <div class="card-body ">
                        <h6 style="display:none">${product.category}</h6>
                        <h5 class="card-title">${product.name}</h5><hr>
                        <p class="card-text">Price: ${product.price} <small><b>دت</b></small></p>
                        <button class="btn btn-primary float-right" onclick="confirmAddToCart('${product.name}', ${product.price}, '${product.intro}', '${product.image}')">Add to Cart</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 mb-4 product" id="phone">
                <div class="card bg-dark text-white horizontal-card">
                    <img src="${product.image}" class="card-img-top" alt="product img" onclick="description('${product.intro}', '${product.image}', '${product.name}', '${product.price}')">
                    <div class="card-body horizontal-card-body">
                        <h6 style="display:none">${product.category}</h6>
                        <h5 class="card-title">${product.name}</h5><hr>
                        <p class="card-text">Price: ${product.price} <small><b>دت</b></small></p>
                        <button class="btn btn-primary float-right" onclick="confirmAddToCart('${product.name}', ${product.price}, '${product.intro}', '${product.image}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    productListDiv.innerHTML += productCard;
  });
}

function description(intro, image, productName, price) {
  Swal.fire({
    title:`<h2> ${productName}</h2>`,
    html: `
        <div style="display: flex; align-items: center;">
            <div style="flex: 1; padding-right: 20px;">
                <img src="${image}" style="width: 100%; height: 100%; object">
            </div>
            <div style="flex: 1; border-left:dashed">
                <p>${intro}</p> <br><small><b>دت</b></small> ${price}
            </div>
        </div>
            `,
    backdrop:'#f333333',
    showConfirmButton: false,
    background: "#f4f4f4",
  });
}

function confirmAddToCart(productName, price, intro, image) {
  Swal.fire({
    title: "Add to Cart",
    html: `
            <div style="display: flex; align-items: center;">
                <div style="flex: 1; padding-right: 20px;">
                    <img src="${image}" alt="${productName}" style="width: 100%;">
                    <h5>${productName}</h5>
                </div>
                <div style="flex: 1;">
                    <p>${intro}</p>
                    <input type="number" id="quantity" class="swal2-input" placeholder="Quantity" min="1" max="10" value="1" style="width: 100%;">
                    <button class="swal2-confirm swal2-styled" onclick="addToCart('${productName}', ${price}, document.getElementById('quantity').value)">Add to Cart</button>
                </div>
            </div>
        `,
    showConfirmButton: false,
    background: "#f4f4f4",
  });
}

function addToCart(productName, price, quantity) {
  const existingProductIndex = shoppingCart.findIndex(
    (item) => item.productName === productName
  );
  if (existingProductIndex !== -1) {
    shoppingCart[existingProductIndex].count += parseInt(quantity);
  } else {
    shoppingCart.push({ productName, price, count: parseInt(quantity) });
  }
  console.log("Shopping Cart:", shoppingCart);

  // Change the cart button icon
  cartButton.classList.remove("fa-cart-plus");
  cartButton.classList.add("fa-bell");

  Swal.fire({
    icon: "success",
    title: `<h3> ${productName}</h3>`,
    text: `Added ${quantity} to Cart.`,
    showConfirmButton: false,
    timer: 1000,
  });
}

function openCart() {
  let cartContent = "<h6>Shopped Items</h6>";
  if (shoppingCart.length === 0) {
    cartContent += "<p>Your cart is empty.</p>";
    // Change the cart button icon back to the regular icon
    cartButton.classList.remove("fa-bell");
    cartButton.classList.add("fa-cart-plus");
  } else {
    shoppingCart.forEach((item) => {
      cartContent += `
                <div>
                    <p>
                    <button class="btn btn-danger" onclick="removeFromCart('${item.productName}')"><i class="fa fa-close"></i></button>
                    <big><u>${item.productName}</u> :</big> ${item.price} <small><b>دت</b></small> =>
                        <input type="number" min="1" value="${item.count}" onchange="updateCount('${item.productName}', this.value)" style="width:40px" controls="true">
                    </p>
                </div>
            `;
    });
    cartContent += `
            <div>
                <button class="btn btn-primary" onclick="checkout()" width="100%">Buy <i class="fa fa-paper-plane"></i></button>
            </div>
        `;
  }
  Swal.fire({
    title: "Your shopping cart",
    html: cartContent,
    confirmButtonText: "Continue Shopping",
    confirmButtonColor: "#fc5d",
  });
}

function removeFromCart(productName) {
  const index = shoppingCart.findIndex(
    (item) => item.productName === productName
  );
  if (index !== -1) {
    shoppingCart.splice(index, 1);
    openCart(); // Update the cart display after removal
  }
  // Check if cart is empty to change the icon back
  if (shoppingCart.length === 0) {
    cartButton.classList.remove("fa-bell");
    cartButton.classList.add("fa-cart-plus");
  }
}

function updateCount(productName, newCount) {
  const index = shoppingCart.findIndex(
    (item) => item.productName === productName
  );
  if (index !== -1) {
    shoppingCart[index].count = parseInt(newCount);
  }
}

function promptUserData(callback) {
  Swal.fire({
    title: "Enter Your Name",
    input: "text",
    inputPlaceholder: "Full Name",
    confirmButtonText: "Next",
    confirmButtonColor: "#F9ff",
    inputValidator: (value) => {
      if (!value) {
        return "Please enter your name";
      }
      const nameRegex = /^[a-zA-Z\s]*$/;
      if (!nameRegex.test(value)) {
        return "Invalid Name";
      }
    },
  }).then((nameResult) => {
    if (nameResult.isConfirmed) {
      Swal.fire({
        title: "Enter Your Phone Number",
        input: "tel",
        inputPlaceholder: "Phone Number",
        confirmButtonText: "Next",
        confirmButtonColor: "#F9ff",
        inputValidator: (value) => {
          if (!value) {
            return "Please enter your phone number";
          }
          const phoneRegex = /\d{2}\d{3}\d{3}/; // Modified regex to allow numbers, spaces, and '+'
          if (!phoneRegex.test(value)) {
            return "Example 50 101 300";
          }
        },
      }).then((phoneResult) => {
        if (phoneResult.isConfirmed) {
          Swal.fire({
            title: "Select Your City",
            input: "select",
            inputOptions: {
              Tunis: "Tunis",
              Sfax: "Sfax",
              Sousse: "Sousse",
              Kairouan: "Kairouan",
              Bizerte: "Bizerte",
              Gabes: "Gabes",
              Ariana: "Ariana",
              Gafsa: "Gafsa",
              Monastir: "Monastir",
              Manouba: "Manouba",
              "Ben Arous": "Ben Arous",
              Kasserine: "Kasserine",
              Medenine: "Medenine",
              Mahdia: "Mahdia",
              Zaghouan: "Zaghouan",
              Beja: "Beja",
              Jendouba: "Jendouba",
              Nabeul: "Nabeul",
              Kebili: "Kebili",
              Siliana: "Siliana",
              Tataouine: "Tataouine",
              Tozeur: "Tozeur",
              Kef: "Kef",
              Kasserine: "Kasserine",
            },
            inputPlaceholder: "Select your city",
            confirmButtonText: "Buy 💰",
            confirmButtonColor: "blue",
            showCancelButton: false,
            inputValidator: (value) => {
              if (!value) {
                return "Please select your city";
              }
            },
          }).then((cityResult) => {
            if (cityResult.isConfirmed) {
              const userData = {
                name: nameResult.value,
                phone: phoneResult.value,
                location: cityResult.value,
              };
              callback(userData);
            }
          });
        }
      });
    }
  });
}

function checkout() {
  // Check if the cart is empty
  if (shoppingCart.length === 0) {
    Swal.fire({
      title: "Error!",
      text: "Your cart is empty. Please add some products before checking out.",
      icon: "error",
    });
    return;
  }

  // Calculate total price
  const totalPrice = shoppingCart.reduce((total, item) => total + item.price * item.count, 0);

  // Prompt for user data
  promptUserData((userData) => {
    Swal.fire({
      title: "Confirm Purchase",
      html: `
        <p>Total Price: ${totalPrice} دت<br>Are you sure you want to proceed with the purchase?</p>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor:"green",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        shoppingCart.forEach((item) => {
          sendProductToGoogleSheets(
            item.productName,
            item.price,
            item.count,
            userData
          );
        });

        // Clear the shopping cart after successful checkout
        shoppingCart.length = 0;
        updateCartIcon(); // Update cart icon
        const newUrl = '/checkout'; // Change this to the desired URL
        const newState = { page: 'checkout' }; // Change this to any state you want to associate
        history.pushState(newState, '', newUrl);
      }
    });
  });
}

// Function to send a product along with user data to Google Sheets
function sendProductToGoogleSheets(productName, price, count, userData) {
  Swal.fire({
    title: "Sending...",
    titleColor: "#fc1111",
    text: "Please wait while your purchase is being processed.",
    icon: "info",
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });

  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbwgGhYluZtg_c5KVcgmVqv8XeJ5cGYOqAiXoDgAaK0LCicFveU6LkwVCluixUgERlx7/exec";

  const formData = new FormData();
  formData.append("productName", productName);
  formData.append("price", price);
  formData.append("count", count);
  formData.append("phone", userData.phone);
  formData.append("name", userData.name);
  formData.append("location", userData.location);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", scriptUrl);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Product sent successfully:", productName);
      // Show success message
      Swal.fire({
        title: "Demand Reached",
        text: "Your purchase was successful. We'll contact you soon.",
        imageUrl: "/img/sc.png",
        imageAlt: "Custom Success Icon",
        showConfirmButton: false,
        timer: 2000,
        icon: null,
        background: "black",
        color: "white",
      });
    } else {
      console.error("Error sending product:", productName);
    }
  };
  xhr.onerror = function () {
    console.error("Error sending product:", productName);
  };
  xhr.send(formData);
}

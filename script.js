const products = [
  {
    name: "Product 1",
    price: 20,
    image: "/product/product.avif",
    intro: "Product with great reviews",
    category: "Good"
  },
  {
    name: "Product 2",
    price: 15,
    image: "/product/product.avif",
    intro: "A bad product",
    category: "bad"
  },
  {
    name: "Product 3",
    price: 75,
    image: "/product/product.avif",
    intro: "Too expensive product",
    category: "expensive"
  },
  {
    name: "Product 4",
    price: 5,
    image: "/product/product.avif",
    intro: "Too cheap product",
    category: "cheap"
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
          noResultsMessage.innerHTML = `<div class="container mt-5"><center>mafamech produit bil ism hetha "${input.value}"</center></div>`;
          noResultsMessage.style.color = "red";
          div.appendChild(noResultsMessage);
      } else{
        noResultsMessage.remove();
      }
  } else{
      noResultsMessage.remove();
  }
}

displayProducts();

function displayProducts() {
  const productListDiv = document.getElementById("product-list");
  productListDiv.innerHTML = "";

  products.forEach((product) => {
    const productCard = `
            <div class="col-lg-4 col-md-6 col-sm-6 mb-4 product">
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
        `;
    productListDiv.innerHTML += productCard;
  });
}

function description(intro, image, productName) {
  Swal.fire({
    title:`<h2> ${productName}</h2>`,
    html: `
          <div style="display: flex; align-items: center;">
            <img src="${image}" style="width: 100%; height: 100%; object">
          </div>
          `,
    backdrop:'#f333333',
    showConfirmButton: false,
    background: "#fffff4",
  });
}

function confirmAddToCart(productName, price, intro, image) {
  Swal.fire({
    title: "7ot fil panier",
    html: `
            <div style="display: flex; align-items: center;">
                <div style="padding-right: 20px;">
                    <img src="${image}" alt="${productName}" style="width: 100%;"><hr>
                    <h5>${productName}</h5>
                    <input type="number" id="quantity" class="swal2-input" placeholder="Quantity" min="1" max="10" value="1" style="width: 30%;">
                    <button class="swal2-confirm swal2-styled" onclick="addToCart('${productName}', ${price}, document.getElementById('quantity').value)">Add to Cart</button>
            </div>
        `,
    showConfirmButton: false,
    background: "#fffff4",
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
  cartButton.classList.remove("fa-cart-shopping");
  cartButton.classList.add("fa-cart-plus");

  Swal.fire({
    icon: "success",
    title: `<h3> ${productName}</h3>`,
    text: `Added ${quantity} to Cart.`,
    showConfirmButton: false,
    timer: 1000,
  });
}

function openCart() {
  let cartContent = "<h6>Added Items</h6>";
  if (shoppingCart.length === 0) {
    cartContent += "<p>Mazidt chy lil panier mte3ik</p>";
    // Change the cart button icon back to the regular icon
    cartButton.classList.remove("fa-cart-plus");
    cartButton.classList.add("fa-cart-shopping");
  } else {
    shoppingCart.forEach((item) => {
      cartContent += `
                <div>
                    <p>
                    <button class="btn btn-danger" onclick="removeFromCart('${item.productName}')"><i class="fa fa-close"></i></button>
                    <big><u>${item.productName}</u> :</big> ${item.price}
                    <input type="number" min="1" class="swal2-input" value="${item.count}" onchange="updateCount('${item.productName}', this.value)" style="width:24%" controls="true">
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
    confirmButtonText: "irja3 bech t7ot 7weyij fil panier",
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
    cartButton.classList.remove("fa-cart-plus");
    cartButton.classList.add("fa-cart-shopping");
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
    title: "Enter Your Details",
    html:
      '<input id="swal-input1" class="swal2-input" placeholder=ismik kemil">' +
      '<input id="swal-input2" class="swal2-input" placeholder="noumro telifounik">' +
      '<input id="swal-input2" type="email" required class="swal2-input" placeholder="email">' +
      '<select id="swal-input3" class="swal2-input">' +
        '<option value="" disabled selected>7ot inti mnin</option>' +
        '<option value="Tunis">Tunis</option>' +
        '<option value="Sfax">Sfax</option>' +
        '<option value="Sousse">Sousse</option>' +
        '<option value="Kairouan">Kairouan</option>' +
        '<option value="Bizerte">Bizerte</option>' +
        '<option value="Gabes">Gabes</option>' +
        '<option value="Ariana">Ariana</option>' +
        '<option value="Gafsa">Gafsa</option>' +
        '<option value="Monastir">Monastir</option>' +
        '<option value="Manouba">Manouba</option>' +
        '<option value="Ben Arous">Ben Arous</option>' +
        '<option value="Kasserine">Kasserine</option>' +
        '<option value="Medenine">Medenine</option>' +
        '<option value="Mahdia">Mahdia</option>' +
        '<option value="Zaghouan">Zaghouan</option>' +
        '<option value="Beja">Beja</option>' +
        '<option value="Jendouba">Jendouba</option>' +
        '<option value="Nabeul">Nabeul</option>' +
        '<option value="Kebili">Kebili</option>' +
        '<option value="Siliana">Siliana</option>' +
        '<option value="Tataouine">Tataouine</option>' +
        '<option value="Tozeur">Tozeur</option>' +
        '<option value="Kef">Kef</option>' +
      '</select>' +
      '<input id="swal-input4" class="swal2-input" placeholder="Your Address">',
    focusConfirm: false,
    preConfirm: () => {
      const name = document.getElementById('swal-input1').value;
      const phone = document.getElementById('swal-input2').value;
      const city = document.getElementById('swal-input3').value;
      const address = document.getElementById('swal-input4').value;

      // Validation logic for each field
      const nameRegex = /^[a-zA-Z\s]*$/;
      const phoneRegex = /\d{2}\d{3}\d{3}/;

      if (!name) {
        Swal.showValidationMessage('Please enter your name');
        return false;
      } else if (!nameRegex.test(name)) {
        Swal.showValidationMessage('Invalid name');
        return false;
      }

      if (!phone) {
        Swal.showValidationMessage('Please enter your phone number');
        return false;
      } else if (!phoneRegex.test(phone)) {
        Swal.showValidationMessage('Phone number should follow the format: 50 101 300');
        return false;
      }

      if (!city) {
        Swal.showValidationMessage('Please select your city');
        return false;
      }

      if (!address) {
        Swal.showValidationMessage('Please enter your home address');
        return false;
      }

      // Return the data for use in callback
      return {
        name: name,
        phone: phone,
        location: city,
        address: address,
      };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Pass the data to the callback function
      callback(result.value);
    }
  });
}


// function promptUserData(callback) {
//   Swal.fire({
//     title: "Enter Your Name",
//     input: "text",
//     inputPlaceholder: "Full Name",
//     confirmButtonText: "Next",
//     confirmButtonColor: "#F9ff",
//     inputValidator: (value) => {
//       if (!value) {
//         return "Please enter your name";
//       }
//       const nameRegex = /^[a-zA-Z\s]*$/;
//       if (!nameRegex.test(value)) {
//         return "Invalid Name";
//       }
//     },
//   }).then((nameResult) => {
//     if (nameResult.isConfirmed) {
//       Swal.fire({
//         title: "Enter Your Phone Number",
//         input: "tel",
//         inputPlaceholder: "Phone Number",
//         confirmButtonText: "Next",
//         confirmButtonColor: "#F9ff",
//         inputValidator: (value) => {
//           if (!value) {
//             return "Please enter your phone number";
//           }
//           const phoneRegex = /\d{2}\d{3}\d{3}/; // Modified regex to allow numbers, spaces, and '+'
//           if (!phoneRegex.test(value)) {
//             return "Example 50 101 300";
//           }
//         },
//       }).then((phoneResult) => {
//         if (phoneResult.isConfirmed) {
//           Swal.fire({
//             title: "Select Your City",
//             input: "select",
//             inputOptions: {
//               Tunis: "Tunis",
//               Sfax: "Sfax",
//               Sousse: "Sousse",
//               Kairouan: "Kairouan",
//               Bizerte: "Bizerte",
//               Gabes: "Gabes",
//               Ariana: "Ariana",
//               Gafsa: "Gafsa",
//               Monastir: "Monastir",
//               Manouba: "Manouba",
//               "Ben Arous": "Ben Arous",
//               Kasserine: "Kasserine",
//               Medenine: "Medenine",
//               Mahdia: "Mahdia",
//               Zaghouan: "Zaghouan",
//               Beja: "Beja",
//               Jendouba: "Jendouba",
//               Nabeul: "Nabeul",
//               Kebili: "Kebili",
//               Siliana: "Siliana",
//               Tataouine: "Tataouine",
//               Tozeur: "Tozeur",
//               Kef: "Kef",
//             },
//             inputPlaceholder: "Select your city",
//             confirmButtonText: "Next",
//             showCancelButton: false,
//             inputValidator: (value) => {
//               if (!value) {
//                 return "Please select your city";
//               }
//             },
//           }).then((cityResult) => {
//             if (cityResult.isConfirmed) {
//               Swal.fire({
//                 title: "Enter Your Address",
//                 input: "text",
//                 inputPlaceholder: "Your address",
//                 confirmButtonText: "Next",
//                 showCancelButton: false,
//                 inputValidator: (value) => {
//                   if (!value) {
//                     return "Please enter your home address";
//                   }
//                 },
//               }).then((addressResult) => {
//                 if (addressResult.isConfirmed) {
//                   const userData = {
//                     name: nameResult.value,
//                     phone: phoneResult.value,
//                     location: cityResult.value,  // Use cityResult for city value
//                     address: addressResult.value, // Use addressResult for address value
//                   };
//                   callback(userData); // Pass the collected user data to the callback
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//   });
// }

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
        <p>Total Price: ${totalPrice} دت<br>heka totale kamil lili baa3do</p>
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
    text: "9e3din n3adiwlik fil command mte3ik",
    icon: "info",
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });

  const scriptUrl = " ";

  const formData = new FormData();
  formData.append("productName", productName);
  formData.append("price", price);
  formData.append("count", count);
  formData.append("phone", userData.phone);
  formData.append("name", userData.name);
  formData.append("location", userData.location);
  formData.append("addressResult", userData.address);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", scriptUrl);
  xhr.onload = function () {
    if (xhr.status === 200) {
      navigator.vibrate(1000); // vibrate for 200ms
      navigator.vibrate([200, 100, 200]);
      console.log("Product sent successfully:", productName);
      // Show success message
      Swal.fire({
        title: "Demand Reached",
        text: "wsol ! taw nkalmouk 3la 9rib nchallah.",
        imageUrl: "/img/sc.png",
        imageAlt: "Custom Success Icon",
        showConfirmButton: false,
        timer: 2000,
        icon: null,
        background: "black",
        color: "gold",
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
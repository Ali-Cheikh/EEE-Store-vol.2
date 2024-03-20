
const products = [
    { name: 'product 1', price: 20, image: '/product/product.avif', intro: 'product description' },
    { name: 'product 2', price: 15, image: '/product/product.avif', intro: 'product description' },
    { name: 'product 3', price: 150, image: '/product/product.avif', intro: 'product description' },
];

// Array to store items in the shopping cart
const shoppingCart = [];

// Initialize the display of products
displayProducts();

function displayProducts() {
    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="product img " onclick="description('${product.intro}', '${product.image}', '${product.name}' , '${product.price}')">
                    <div class="card-body">
                        <center><h5 class="card-title">${product.name}</h5></center><hr>
                        <p class="card-text">Price: ${product.price} <small><b>دت</b></small>
                        <button class="btn btn-primary float-right" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button></p>
                    </div>
                </div>
            </div>
        `;
        productListDiv.innerHTML += productCard;
    });
}

function description(intro, image, name, price) {
    Swal.fire({
        title: `<h5>${name}</h5><br><img src="${image}" width="50%"><br> `,
        html: `<h2>${intro}</h2> <br><small><b>دت</b></small> ${price}`,
        showConfirmButton: false,
    });
}

function addToCart(productName, price) {
    const existingProductIndex = shoppingCart.findIndex(item => item.productName === productName);
    if (existingProductIndex !== -1) {
        shoppingCart[existingProductIndex].count++;
    } else {
        shoppingCart.push({ productName, price, count: 1 });
    }
    console.log('Shopping Cart:', shoppingCart); // Log the shopping cart contents
    Swal.fire({
        icon: 'success',
        title: `<h3 style="color:#ffc5dd"> ${productName}</h3>`,
        text: ` Added to Cart.`,
        showConfirmButton: false,
        timer: 950
    });
}

function openCart() {
    let cartContent = '<h6>Shopped Items</h6>';
    if (shoppingCart.length === 0) {
        cartContent += '<p>Your cart is empty.</p>';
    } else {
        shoppingCart.forEach(item => {
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
        title: 'Your shopping cart',
        html: cartContent,
        confirmButtonText: 'Continue Shopping',
        confirmButtonColor: "#fc5d"
    });
}

function removeFromCart(productName) {
    const index = shoppingCart.findIndex(item => item.productName === productName);
    if (index !== -1) {
        shoppingCart.splice(index, 1);
        openCart(); // Update the cart display after removal
    }
}

function updateCount(productName, newCount) {
    const index = shoppingCart.findIndex(item => item.productName === productName);
    if (index !== -1) {
        shoppingCart[index].count = parseInt(newCount);
    }
}

function promptUserData(callback) {
    Swal.fire({
        title: 'Enter Your Name',
        input: 'text',
        inputPlaceholder: 'Full Name',
        confirmButtonText: 'Next',
        confirmButtonColor: "#FC3882",
        inputValidator: (value) => {
            if (!value) {
                return 'Please enter your name';
            }
            const nameRegex = /^[a-zA-Z\s]*$/;
            if (!nameRegex.test(value)) {
                return 'Invalid Name';
            }
        }
    }).then((nameResult) => {
        if (nameResult.isConfirmed) {
            Swal.fire({
                title: 'Enter Your Phone Number',
                input: 'tel',
                inputPlaceholder: 'Phone Number',
                confirmButtonText: 'Next',
                confirmButtonColor: "#FC3882",
                inputValidator: (value) => {
                    if (!value) {
                        return 'Please enter your phone number';
                    }
                    const phoneRegex = /^\d{8}$/;
                    if (!phoneRegex.test(value)) {
                        return 'Invalid Phone Number';
                    }
                }
            }).then((phoneResult) => {
                if (phoneResult.isConfirmed) {
                    Swal.fire({
                        title: 'Select Your City',
                        input: 'select',
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
                            'Ben Arous': "Ben Arous",
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
                            Kasserine: "Kasserine"
                        },
                        inputPlaceholder: 'Select your city',
                        confirmButtonText: 'Buy 💰',
                        confirmButtonColor: "#F4f411",
                        showCancelButton: false,
                        inputValidator: (value) => {
                            if (!value) {
                                return 'Please select your city';
                            }
                        }
                    }).then((cityResult) => {
                        if (cityResult.isConfirmed) {
                            const userData = {
                                name: nameResult.value,
                                phone: phoneResult.value,
                                location: cityResult.value
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
    // Prompt user for their information
    promptUserData(userData => {
        if (shoppingCart.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'Your cart is empty. Please add some products before checking out.',
                icon: 'error'
            });
            return;
        }

        Swal.fire({
            title: 'Confirm Purchase',
            text: 'Are you sure you want to proceed with the purchase?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#6c757d'
        }).then((result) => {
            if (result.isConfirmed) {
                // Send each product in the shopping cart along with the user's data
                shoppingCart.forEach(item => {
                    sendProductToGoogleSheets(item.productName, item.price, item.count, userData);
                });

                // Clear the shopping cart
                shoppingCart.length = 0;
            }
        });
    });
}

// Function to send a product along with user data to Google Sheets
function sendProductToGoogleSheets(productName, price, count, userData) {
    Swal.fire({
        title: 'Sending...',
        titleColor: '#fc1111',
        text: 'Please wait while your purchase is being processed.',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzz6FTDNRMLv0_U8tuhDzP5TloXU8p5EmE3isFZCzDRH35K-oLgbySsPLLpicXmSaks/exec';

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('count', count);
    formData.append('phone', userData.phone);
    formData.append('name', userData.name);
    formData.append('location', userData.location);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', scriptUrl);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Product sent successfully:', productName);
            // Show success message
            Swal.fire({
                title: 'Demand Reached',
                text: "Your purchase was successful. We'll contact you soon.",
                imageUrl: '/img/logo.jpg',
                imageAlt: 'Custom Success Icon',
                confirmButtonText: 'Yeyy 🥳',
                confirmButtonColor: 'dark-pink',
                icon: null
            });
        } else {
            console.error('Error sending product:', productName);
        }
    };
    xhr.onerror = function () {
        console.error('Error sending product:', productName);
    };
    xhr.send(formData);
}

const products = [
    { name: '5obz', price: .2, image: '/product/product.avif', intro: 'product description' },
    { name: '3tham', price: 1.5, image: '/product/product.avif', intro: 'product description' },
    { name: 'casque jdida', price: 239, image: 'https://mk-media.mytek.tn/media/catalog/product/cache/8be3f98b14227a82112b46963246dfe1/m/i/micro-casque-gamer-aqirys-lyra-double-mode-blanc_1_.jpg', intro: '<a style="color:"red" href="https://www.mytek.tn/micro-casque-gamer-aqirys-lyra-double-mode-blanc.html">Click Me for more info</a>' },
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
                    <img src="${product.image}" class="card-img-top" alt="product img ">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <q>${product.intro}</q><br><hr>
                        <p class="card-text">Price: ${product.price} <small><b>دت</b></small></p>
                        <button class="btn btn-primary" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        productListDiv.innerHTML += productCard;
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
        title: 'Item Added to Cart',
        text: `${productName} added to your shopping cart.`,
        showConfirmButton: false,
        timer: 1500
    });
}

function openCart() {
    let cartContent = '<h5>Shopping Cart</h5>';
    if (shoppingCart.length === 0) {
        cartContent += '<p>Your cart is empty.</p>';
    } else {
        shoppingCart.forEach(item => {
            cartContent += `
                <div>
                    <p>${item.productName} - ${item.price} TND - Quantity: 
                        <input type="number" min="1" value="${item.count}" onchange="updateCount('${item.productName}', this.value)">
                    </p>
                    <button class="btn btn-danger" onclick="removeFromCart('${item.productName}')">Remove</button>
                </div>
            `;
        });
        cartContent += `
            <div>
                <button class="btn btn-primary" onclick="checkout()">Buy</button>
            </div>
        `;
    }
    Swal.fire({
        title: 'Shopping Cart',
        html: cartContent,
        showCancelButton: true,
        cancelButtonText: 'Close',
        confirmButtonColor: "#6c757d"
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
                        confirmButtonColor: "#F4f499",
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
var products = [

    {
        id: 1,
        name: "T-Shirt",
        price: 599,
        category: "Men",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },

    {
        id: 2,
        name: "Jeans",
        price: 999,
        category: "Men",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
    },

    {
        id: 3,
        name: "Dress",
        price: 1499,
        category: "Women",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"
    },

    {
        id: 4,
        name: "Shoes",
        price: 1999,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },

    {
        id: 5,
        name: "Hoodie",
        price: 899,
        category: "Men",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
    },

    {
        id: 6,
        name: "Jacket",
        price: 2499,
        category: "Women",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    },

    {
        id: 7,
        name: "Handbag",
        price: 1299,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
    },

    {
        id: 8,
        name: "Sunglasses",
        price: 499,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    }

];

var cart = [];

function showPopup(message) {

    var popup =
        document.getElementById("popup");

    var popupMessage =
        document.getElementById("popup-message");


    popupMessage.innerText = message;


    popup.classList.add("show");


    setTimeout(function() {

        popup.classList.remove("show");

    }, 2500);
}

function displayProducts(productArray) {

    var productList =
        document.getElementById("product-list");

    productList.innerHTML = "";


    if (productArray.length == 0) {

        productList.innerHTML =
            "<p>No products found.</p>";

        return;
    }


    for (var i = 0; i < productArray.length; i++) {

        var product = productArray[i];


        var productCard =
            document.createElement("div");

        productCard.className =
            "product-card";


        productCard.innerHTML =

            "<img src='" +
            product.image +
            "' alt='" +
            product.name +
            "'>" +

            "<h3>" +
            product.name +
            "</h3>" +

            "<p>₹" +
            product.price +
            "</p>" +

            "<p>Category: " +
            product.category +
            "</p>" +

            "<button onclick='addToCart(" +
            product.id +
            ")'>" +
            "Add to Cart" +
            "</button>";


        productList.appendChild(productCard);
    }
}

function addToCart(productId) {

    var found = false;

    var productName = "";


    for (var i = 0; i < cart.length; i++) {

        if (cart[i].id == productId) {

            cart[i].quantity++;

            found = true;

            productName = cart[i].name;

            break;
        }
    }


    if (found == false) {

        for (var i = 0; i < products.length; i++) {

            if (products[i].id == productId) {

                var item = {

                    id: products[i].id,

                    name: products[i].name,

                    price: products[i].price,

                    quantity: 1

                };

                cart.push(item);

                productName = products[i].name;

                break;
            }
        }
    }


    displayCart();

    showPopup(
        productName + " added to cart!"
    );
}

function displayCart() {

    var cartItems =
        document.getElementById("cart-items");

    var cartCount =
        document.getElementById("cart-count");

    var cartTotal =
        document.getElementById("cart-total");

    var checkoutTotal =
        document.getElementById("checkout-total");


    cartItems.innerHTML = "";

    var total = 0;

    var totalQuantity = 0;


    if (cart.length == 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.innerHTML =
            "<h3>Total: ₹0</h3>";

        checkoutTotal.innerText = "0";

        cartCount.innerText = "0";

        return;
    }


    for (var i = 0; i < cart.length; i++) {

        var item = cart[i];

        var itemTotal =
            item.price * item.quantity;

        total = total + itemTotal;

        totalQuantity =
            totalQuantity + item.quantity;


        var cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML =

            "<h3>" +
            item.name +
            "</h3>" +

            "<p>Price: ₹" +
            item.price +
            "</p>" +

            "<p>Quantity: " +
            item.quantity +
            "</p>" +

            "<p>Subtotal: ₹" +
            itemTotal +
            "</p>" +

            "<button onclick='decreaseQuantity(" +
            item.id +
            ")'>-</button>" +

            "<button onclick='increaseQuantity(" +
            item.id +
            ")'>+</button>" +

            "<button onclick='removeItem(" +
            item.id +
            ")'>Remove</button>";


        cartItems.appendChild(cartItem);
    }


    cartTotal.innerHTML =
        "<h3>Total: ₹" +
        total +
        "</h3>";


    checkoutTotal.innerText = total;

    cartCount.innerText = totalQuantity;
}

function increaseQuantity(productId) {

    for (var i = 0; i < cart.length; i++) {

        if (cart[i].id == productId) {

            cart[i].quantity++;

            break;
        }
    }

    displayCart();
}

function decreaseQuantity(productId) {

    for (var i = 0; i < cart.length; i++) {

        if (cart[i].id == productId) {

            if (cart[i].quantity > 1) {

                cart[i].quantity--;

            } else {

                cart.splice(i, 1);
            }

            break;
        }
    }

    displayCart();
}

function removeItem(productId) {

    for (var i = 0; i < cart.length; i++) {

        if (cart[i].id == productId) {

            cart.splice(i, 1);

            break;
        }
    }

    displayCart();
}

function chooseCategory(categoryName) {

    document.getElementById("category").value =
        categoryName;


    document.getElementById("products")
        .scrollIntoView();


    filterProducts();
}

function filterProducts() {

    var searchText =
        document.getElementById("search")
        .value
        .toLowerCase();


    var selectedCategory =
        document.getElementById("category")
        .value;


    var result = [];


    for (var i = 0; i < products.length; i++) {

        var nameMatch =
            products[i].name
            .toLowerCase()
            .includes(searchText);


        var categoryMatch =
            selectedCategory == "All" ||
            products[i].category ==
            selectedCategory;


        if (nameMatch && categoryMatch) {

            result.push(products[i]);
        }
    }


    displayProducts(result);
}

document.getElementById("search")
    .addEventListener("keyup", function() {

        filterProducts();

    });

document.getElementById("category")
    .addEventListener("change", function() {

        filterProducts();

    });

document.getElementById("checkout-form")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        if (cart.length == 0) {

            showPopup(
                "Your cart is empty!"
            );

            return;
        }


        var name =
            document.getElementById("name").value;

        document.getElementById("message")
            .innerText =
            "Thank you " +
            name +
            "! Your order has been placed successfully.";

        showPopup(
            "Order placed successfully!"
        );

        cart = [];

        displayCart();

        document.getElementById("checkout-form")
            .reset();

    });

displayProducts(products);

displayCart();
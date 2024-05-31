document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = [
        { id: 1, name: "Green Polo", color: "Green", type: "Polo", price: 320, quantity: 10, image: "images/green-polo.jpg", gender: "Men" },
        { id: 2, name: "Blue T-Shirt", color: "Blue", type: "T Shirt", price: 950, quantity: 5, image: "images/blue-tshirt.jpg", gender: "Men" },
        { id: 3, name: "Red Tank Top", color: "Red", type: "Top", price: 1800, quantity: 8, image: "images/red-tanktop.jpg", gender: "Women" },
        { id: 4, name: "White T-Shirt", color: "White", type: "T Shirt", price: 1160, quantity: 9, image: "images/white-tshirt.jpg", gender: "Men" },
        { id: 5, name: "Black T-Shirt", color: "Black", type: "T Shirt", price: 250, quantity: 19, image: "images/black-tshirt.jpg", gender: "Men" },
        { id: 11, name: "Pink Tank Top", color: "Pink", type: "Top", price: 1100, quantity: 8, image: "images/pink-tanktop.jpg", gender: "Women" },
        { id: 12, name: "White Top", color: "White", type: "Top", price: 900, quantity: 8, image: "images/white-top.jpg", gender: "Women" },
        { id: 6, name: "Yellow T-Shirt", color: "Yellow", type: "T Shirt", price: 2230, quantity: 5, image: "images/yellow-tshirt.jpg", gender: "Men" },
        { id: 7, name: "Black T-Shirt", color: "Black", type: "T Shirt", price: 750, quantity: 19, image: "images/black-tshirt2.jpg", gender: "Men" },
        { id: 8, name: "Olive Green Polo", color: "Olive Green", type: "Polo", price: 800, quantity: 10, image: "images/olive-green-polo.jpg", gender: "Men" },
        { id: 9, name: "Black Polo", color: "Black", type: "Polo", price: 2400, quantity: 10, image: "images/black-polo.jpg", gender: "Men" },
        { id: 10, name: "White Polo", color: "White", type: "Polo", price: 1500, quantity: 7, image: "images/white-polo.jpg", gender: "Men" },
        { id: 13, name: "Pink Top", color: "Pink", type: "Top", price: 1300, quantity: 8, image: "images/pink-top.jpg", gender: "Women" },
        { id: 14, name: "Green Top", color: "Green", type: "Top", price: 2300, quantity: 8, image: "images/green-top.jpg", gender: "Women" },
        { id: 15, name: "Grey Top", color: "Grey", type: "Top", price: 1900, quantity: 8, image: "images/grey-top.jpg", gender: "Women" },
    ];

    const cartContent = document.getElementById("cart-content");
    const cartCountElement = document.getElementById('cart-count');

    function updateCartCount() {
        const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCountElement.innerText = totalCount;
    }

    function displayCart() {
        cartContent.innerHTML = "";
        if (cart.length === 0) {
            cartContent.innerHTML = `
                <h4>Oops, nothing in the cart</h4><br>
                <button onclick="location.href='products.html'" class="Shop-Now-btn2">Shop Now</button>
                <br><br>
            `;
            updateCartCount();
            return;
        }

        let totalAmount = 0;
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            totalAmount += item.price * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-2">
                                <img src="${product.image}" alt="${item.name}" class="img-responsive">
                            </div>
                            <div class="items-center">
                            <div class="col-sm-6">
                                <h4>${item.name}</h4>
                                <p>Price: &#8377;${item.price}</p>
                                <h5>Quantity: 
                                    <button class="btn btn-default btn-sm change-quantity" data-id="${item.id}" data-change="-1">-</button>
                                    ${item.quantity}
                                    <button class="btn btn-default btn-sm change-quantity" data-id="${item.id}" data-change="1">+</button>
                                </h5>
                            </div>
                            </div>
                            <div class="items-bottom">
                            <div class="col-sm-2 d-flex align-items-center justify-content-center">
                                <p class="m-0">&#8377;${item.price * item.quantity}</p>
                            </div>
                            <div class="col-sm-2 d-flex align-items-center justify-content-center">
                                <button class="btn btn-danger remove-from-cart-btn" data-id="${item.id}">Remove</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cartContent.appendChild(cartItem);
        });
        const totalDisplay = document.createElement("div");
        totalDisplay.innerHTML = `<h3 class="total-price-txt">Total : &#8377;${totalAmount}</h3>`;
        cartContent.appendChild(totalDisplay);
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }

    cartContent.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-from-cart-btn")) {
            const productId = parseInt(event.target.dataset.id);
            const itemIndex = cart.findIndex(item => item.id === productId);
            if (itemIndex !== -1) {
                const product = products.find(p => p.id === productId);
                product.quantity += cart[itemIndex].quantity;
                cart.splice(itemIndex, 1);
                updateCart();
            }
        } else if (event.target.classList.contains("change-quantity")) {
            const productId = parseInt(event.target.dataset.id);
            const change = parseInt(event.target.dataset.change);
            const cartItem = cart.find(item => item.id === productId);
            const product = products.find(p => p.id === productId);

            if (cartItem && product) {
                const newQuantity = cartItem.quantity + change;
                if (newQuantity > 0 && newQuantity <= product.quantity) {
                    if (change === 1 && product.quantity > 0) {
                        product.quantity -= 1;
                        cartItem.quantity = newQuantity;
                    } else if (change === -1) {
                        product.quantity += 1;
                        cartItem.quantity = newQuantity;
                    }
                    updateCart();
                }
            }
        }
    });

    displayCart();
    updateCartCount();
});

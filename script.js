document.addEventListener("DOMContentLoaded", function() {
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

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productList = document.getElementById("product-list");
    const cartCount = document.getElementById("cart-count");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    // Function to display products
    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("col-sm-4", "product-card");
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: &#8377; ${product.price}</p>
                <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(card);
        });
    }

    // Function to add product to cart
    function addToCart(productId) {
        const product = products.find(p => p.id == productId);
        if (product) {
            const existingItem = cart.find(item => item.id == productId);
            if (existingItem) {
                if (existingItem.quantity < product.quantity) {
                    existingItem.quantity++;
                } else {
                    alert('Sorry, no more stock available!');
                }
            } else {
                cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
            }
            updateCartCount();
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }

    // Function to update cart icon count
    function updateCartCount() {
        const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalCount;
    }

    // Event listener for adding to cart
    productList.addEventListener("click", function(event) {
        if (event.target.classList.contains("add-to-cart-btn")) {
            const productId = event.target.dataset.id;
            addToCart(productId);
        }
    });

    // Event listener for search functionality
    searchButton.addEventListener("click", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.color.toLowerCase().includes(searchTerm) ||
            product.type.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // Event listeners for filter functionality
    const filterInputs = document.querySelectorAll(".filters input");

    filterInputs.forEach(input => {
        input.addEventListener("change", function() {
            applyFilters();
        });
    });

    function applyFilters() {
        const selectedColors = Array.from(document.querySelectorAll(".filter-color:checked")).map(cb => cb.value);
        const selectedGenders = Array.from(document.querySelectorAll(".filter-gender:checked")).map(cb => cb.value);
        const selectedPrices = Array.from(document.querySelectorAll(".filter-price:checked")).map(cb => cb.value);
        const selectedTypes = Array.from(document.querySelectorAll(".filter-type:checked")).map(cb => cb.value);

        const filteredProducts = products.filter(product => {
            const colorMatch = selectedColors.length ? selectedColors.includes(product.color) : true;
            const genderMatch = selectedGenders.length ? selectedGenders.includes(product.gender) : true;
            const priceMatch = selectedPrices.length ? selectedPrices.some(priceRange => {
                const [min, max] = priceRange.split('-').map(Number);
                if (isNaN(max)) {
                    return product.price >= min;
                } else {
                    return product.price >= min && product.price <= max;
                }
            }) : true;
            const typeMatch = selectedTypes.length ? selectedTypes.includes(product.type) : true;

            return colorMatch && genderMatch && priceMatch && typeMatch;
        });

        displayProducts(filteredProducts);
    }

    // Display initial products and update cart count
    displayProducts(products);
    updateCartCount();
});

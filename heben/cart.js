document.addEventListener("DOMContentLoaded", function () {
    // Load Header and Footer
    fetch("header.html").then(response => response.text()).then(data => document.getElementById("header").innerHTML = data);
    fetch("footer.html").then(response => response.text()).then(data => document.getElementById("footer").innerHTML = data);

    // Cart
    let cartItems = JSON.parse(localStorage.getItem("reviewCart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let checkoutButton = document.getElementById("checkout-btn");
    let totalPriceDisplay = document.getElementById("total-price");

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
        checkoutButton.style.display = "none";
        return;
    }

    // Display cart items
    cartItems.forEach((item, index) => {
        let itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        let totalPrice = itemPrice * item.quantity;

        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item", "d-flex", "align-items-center", "mb-3", "p-3", "border", "rounded");
        cartItem.innerHTML = `
            <input type="checkbox" class="item-checkbox me-3" data-index="${index}" data-price="${totalPrice}">
            <img src="./assets/items/${item.img}" class="cart-img me-3" alt="Product Image">
            <div class="cart-details">
                <h5 class="cart-title">${item.name}</h5>
                <p class="cart-price">Price: PHP${itemPrice.toFixed(2)}</p>
                <p class="cart-quantity">Quantity: ${item.quantity}</p>
                <p class="cart-total"><strong>Total: PHP${totalPrice.toFixed(2)}</strong></p>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Update total when checkboxes are clicked
    document.querySelectorAll(".item-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", updateTotal);
    });

    function updateTotal() {
        let selectedTotal = 0;
        document.querySelectorAll(".item-checkbox:checked").forEach((checkedItem) => {
            selectedTotal += parseFloat(checkedItem.getAttribute("data-price"));
        });
        totalPriceDisplay.textContent = selectedTotal.toFixed(2);
    }

    // Handle checkout confirmation
    document.getElementById("confirm-checkout").addEventListener("click", function () {
        let selectedItems = document.querySelectorAll(".item-checkbox:checked");

        if (selectedItems.length === 0) {
            alert("Please select at least one item to checkout.");
            return;
        }

        let checkoutItems = [];
        selectedItems.forEach((item) => {
            let index = parseInt(item.getAttribute("data-index"));
            checkoutItems.push(cartItems[index]);
        });

        localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));
    });
});

// Payment Modal Logic
document.getElementById('checkout-btn').addEventListener('click', function() {
    document.getElementById('payment-modal').style.display = 'flex';
});

document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('payment-modal').style.display = 'none';
});

document.getElementById('confirm-payment').addEventListener('click', function() {
    // Get selected payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    
    if (paymentMethod) {
        alert(`Payment Successful with ${paymentMethod.value}!`);
        
        // Clear cart items from localStorage
        localStorage.removeItem("reviewCart");

        // Clear cart items from the page
        document.getElementById("cart-items").innerHTML = '';
        document.getElementById('total-price').textContent = '0.00';
        
        // Close the payment modal
        document.getElementById('payment-modal').style.display = 'none';

        // Optionally, redirect to a confirmation page
        // window.location.href = 'confirmation.html';  // Uncomment if needed
    } else {
        alert("Please select a payment method!");
    }
});


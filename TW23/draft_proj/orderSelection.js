document.addEventListener("DOMContentLoaded", function () {
    const orderSummary = document.getElementById("order-summary");
    const confirmButton = document.querySelector(".confirm-btn");
    const reviewPopup = document.getElementById("review-popup");
    const paymentMethods = document.querySelectorAll('input[name="payment"]');

    let orders = [];

    // Function to add an order
    function addOrder(itemName, quantity, price, imageUrl) {
        let existingOrder = orders.find(order => order.itemName === itemName);
        
        if (existingOrder) {
            existingOrder.quantity += quantity;
            existingOrder.totalPrice += price * quantity;
        } else {
            orders.push({ itemName, quantity, totalPrice: price * quantity, imageUrl });
        }

        updateOrderSummary();
    }

    // Function to update the order summary UI
    function updateOrderSummary() {
        orderSummary.innerHTML = "";

        orders.forEach(order => {
            const orderDiv = document.createElement("div");
            orderDiv.classList.add("details-card");
            orderDiv.innerHTML = `
                <img src="${order.imageUrl}" alt="Order Image">
                <div class="details-content">
                    <h2>${order.itemName}</h2>
                    <p class="details-amount">Qty: ${order.quantity}</p>
                    <p class="details-price">Total: $${order.totalPrice.toFixed(2)}</p>
                </div>
            `;
            orderSummary.appendChild(orderDiv);
        });
    }

    // Function to show a pop-up notification
    function showPopup(message, isError = false) {
        reviewPopup.innerHTML = `
            <i class="${isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}"></i>
            <span>${message}</span>
        `;
        reviewPopup.style.backgroundColor = isError ? "#cc0000" : "#003366"; // Red for errors, blue for success
        reviewPopup.classList.add("show");

        // Hide after 3 seconds
        setTimeout(() => {
            reviewPopup.classList.remove("show");
        }, 3000);
    }

    // Function to confirm order
    function confirmOrder() {
        let selectedPayment = false;

        // Check if any payment method is selected
        paymentMethods.forEach(method => {
            if (method.checked) {
                selectedPayment = true;
            }
        });

        if (orders.length === 0) {
            showPopup("No items selected!", true);
            return;
        }

        if (!selectedPayment) {
            showPopup("Please select a payment method!", true);
            return;
        }

        // Show success pop-up
        showPopup("Purchase Complete!", false);
    }

    // Event listener for Confirm Order button
    confirmButton.addEventListener("click", confirmOrder);

    // Mock function to simulate item selection (Replace with actual selection logic)
    document.getElementById("add-item").addEventListener("click", function () {
        addOrder("PokéCoins", 1, 10.00, "./assets/transact/poke_coins.png");
    });
});

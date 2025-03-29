document.addEventListener("DOMContentLoaded", function () {
    const orderSummary = document.getElementById("order-summary");
    const confirmButton = document.getElementById("confirm-order");

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

    // Mock function to simulate item selection (Replace with actual selection logic)
    document.getElementById("add-item").addEventListener("click", function () {
        addOrder("PokéCoins", 1, 10.00, "./assets/transact/poke_coins.png");
    });

    confirmButton.addEventListener("click", function () {
        if (orders.length === 0) {
            alert("No items selected!");
        } else {
            alert("Order confirmed!");
        }
    });
});
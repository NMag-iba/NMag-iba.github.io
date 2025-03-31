document.addEventListener("DOMContentLoaded", function () {
    let orderSummaryContainer = document.getElementById("order-summary");
    let totalPriceDisplay = document.getElementById("total-price");
    let confirmOrderButton = document.getElementById("confirm-order");

    let checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

    if (checkoutItems.length === 0) {
        orderSummaryContainer.innerHTML = "<p class='text-center'>No items in order summary.</p>";
        confirmOrderButton.style.display = "none";
        return;
    }

    let totalPrice = 0;
    checkoutItems.forEach((item) => {
        let itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        let itemTotal = itemPrice * item.quantity;
        totalPrice += itemTotal;

        let orderItem = document.createElement("div");
        orderItem.classList.add("order-item", "d-flex", "align-items-center", "mb-3", "p-3", "border", "rounded");
        orderItem.innerHTML = `
            <img src="./assets/items/${item.img}" class="order-img me-3" alt="Product Image">
            <div class="order-details">
                <h5 class="order-title">${item.name}</h5>
                <p class="order-price">Price: PHP${itemPrice.toFixed(2)}</p>
                <p class="order-quantity">Quantity: ${item.quantity}</p>
                <p class="order-total"><strong>Total: PHP${itemTotal.toFixed(2)}</strong></p>
            </div>
        `;
        orderSummaryContainer.appendChild(orderItem);
    });

    totalPriceDisplay.textContent = totalPrice.toFixed(2);
    confirmOrderButton.style.display = "block";
});

document.addEventListener("DOMContentLoaded", function () {
    const viewButtons = document.querySelectorAll(".card-btn");
    const detailsSection = document.getElementById("details");
    const productsSection = document.getElementById("products");

    // Elements to update dynamically
    const detailsImg = document.getElementById("details-img");
    const detailsTitle = document.getElementById("details-title");
    const detailsLocation = document.getElementById("details-location");
    const detailsCategory = document.getElementById("details-category");
    const detailsPrice = document.getElementById("details-price");
    const detailsDesc = document.getElementById("details-desc");

    const restaurantData = {
        "Din Tai Fung": {
            img: "./assets/FOOD_D.jpg",
            location: "SM Megamall, Mandaluyong City",
            category: "Asian Cuisine",
            price: "$$",
            desc: "Experience the world-renowned Xiao Long Bao (soup dumplings) at Din Tai Fung. Known for its delicate dumplings, flavorful stir-fried dishes, and authentic Taiwanese flavors, this Michelin-starred restaurant is a must-visit for food lovers."
        },
        "Mamou": {
            img: "./assets/FOOD_MA.jpg",
            location: "Serendra, Bonifacio Global City",
            category: "Steakhouse",
            price: "$$$",
            desc: "A homey yet upscale dining experience, Mamou serves some of the best dry-aged steaks and truffle pasta in the metro. Perfect for intimate gatherings, this restaurant is all about comfort food done right with a gourmet touch."
        },
        "Capri Club": {
            img: "./assets/FOOD_C.jpg",
            location: "Roxas Boulevard, Manila",
            category: "Italian Cuisine",
            price: "$$",
            desc: "Step into the heart of Italy with Capri Club’s exquisite selection of wines, handcrafted pasta, and artisanal pizza. Whether you're here for the Neapolitan-style pizza or a cozy wine night, this restaurant transports you straight to the Mediterranean."
        },
        "Kamayan": {
            img: "./assets/FOOD_K.jpg",
            location: "Roxas Boulevard, Manila",
            category: "Filipino Cuisine",
            price: "$",
            desc: "A true Filipino feast! Kamayan specializes in boodle fights, where delicious Filipino classics like lechon, grilled seafood, and pancit are served on banana leaves for a hands-on dining experience. A must-try for those who love authentic local flavors."
        }
    };

    viewButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const restaurantName = this.closest(".card__article").querySelector(".card__label").innerText;

            // Update details with restaurant info
            if (restaurantData[restaurantName]) {
                detailsImg.src = restaurantData[restaurantName].img;
                detailsTitle.innerText = restaurantName;
                detailsLocation.innerText = "📌 " + restaurantData[restaurantName].location;
                detailsCategory.innerText = "🍽️ " + restaurantData[restaurantName].category;
                detailsPrice.innerText = "💲 " + restaurantData[restaurantName].price;
                detailsDesc.innerText = restaurantData[restaurantName].desc;
            }

            // Hide product section and show details
            productsSection.style.display = "none";
            detailsSection.style.display = "block";
        });
    });

    // "MENU" button acts as a back button
    document.querySelector(".view-all-btn").addEventListener("click", function () {
        detailsSection.style.display = "none";
        productsSection.style.display = "block";
    });
});
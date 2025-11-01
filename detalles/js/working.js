window.onload = () => {
    const imgGallery = document.querySelector("#main-product-img");
    const thumbs = document.querySelectorAll(".thumb");
    const sizes = document.querySelectorAll(".size-btn");
    const priceElement = document.querySelector(".current");
    const decrease = document.getElementById("decrease");
    const increase = document.getElementById("increase");
    const quantityInput = document.getElementById("quantity");
    const old = document.querySelector(".old")
    const discPercent = document.querySelector(".discount")
    const reviewsContainer = document.getElementById("reviews-container");
    const nameInput = document.getElementById("review-name");
    const textInput = document.getElementById("review-text");
    const submitBtn = document.getElementById("submit-review");

    const prices = {
        "50ml": 15.0,
        "100ml": 20.0
    };

    let selectedSize = "100ml";
    let basePrice = prices[selectedSize];
    let quantity = 1;
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    thumbs.forEach((thumb) => {
        thumb.addEventListener("click", (evt) => {
            imgGallery.src = evt.target.src.replace("thumbs/", "");
            thumbs.forEach((item) => item.classList.remove("active"));
            evt.target.classList.add("active");
        });
    });

    sizes.forEach((btn) => {
        btn.addEventListener("click", (evt) => {
            sizes.forEach((s) => s.classList.remove("active"));
            evt.target.classList.add("active");
            selectedSize = evt.target.textContent.trim();
            basePrice = prices[selectedSize];
            updateTotal();
        });
    });

    increase.addEventListener("click", () => {
        if (quantity < 15) {
            quantity++;
            quantityInput.value = quantity;
            updateTotal();
        }
    });

    decrease.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            updateTotal();
        }
    });

    quantityInput.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter") {
            let val = parseInt(quantityInput.value);
            if (isNaN(val) || val < 1) val = 1;
            if (val > 15) val = 15;
            quantity = val;
            quantityInput.value = quantity;
            updateTotal();
        }
    });

    function updateTotal() {
        let subtotal = basePrice * quantity;
        let discount = 0;

        if (quantity > 10) {
            discount = 0.2;
        }
        else if (quantity > 5) {
            discount = 0.1;
        }

        discPercent.textContent = `${discount * 100}% OFF`;

        if (discount == 0) {
            discPercent.textContent = "";
        }

        let total = subtotal * (1 - discount);
        old.textContent = `$${subtotal.toFixed(2)}`;

        priceElement.textContent = `$${total.toFixed(2)}`;
    }

    updateTotal();

    mostrarReviews();

    submitBtn.onclick = () => {
        let name = nameInput.value.trim();
        let text = textInput.value.trim();

        if (!name || !text) {
            alert("Please enter your name and review.");
            return;
        }

        let rating = (Math.random() * 4 + 1).toFixed(1);;

        let newReview = {
            name: name,
            text: text,
            rating: rating,
            date: new Date().toLocaleString()
        };

        reviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(reviews));

        nameInput.value = "";
        textInput.value = "";

        mostrarReviews();
    };

    function mostrarReviews() {
        reviewsContainer.innerHTML = "";

        reviews.forEach(r => {
            let div = document.createElement("div");
            div.classList.add("review");

            let rating = parseFloat(r.rating);
            let fullStars = Math.floor(rating);
            let hasHalfStar = rating % 1 !== 0;
            let emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

            let stars = "";

            stars += '<i class="fas fa-star"></i>'.repeat(fullStars);

            if (hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }

            stars += '<i class="far fa-star"></i>'.repeat(emptyStars);

            div.innerHTML = `
      <div class="stars">${stars} <span class="score">(${rating.toFixed(1)}/5)</span></div>
      <h4>${r.name}</h4>
      <p>${r.text}</p>
      <small>${r.date}</small>
    `;

            reviewsContainer.appendChild(div);
        });
    }


}
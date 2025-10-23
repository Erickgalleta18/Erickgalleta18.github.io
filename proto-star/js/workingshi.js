const form = document.getElementById("review-form");
const reviewSection = document.querySelector(".reviews");

// Función para calcular "hace cuanto"
function timeAgo(timestamp) {
    const now = new Date();
    const diff = Math.floor((now - new Date(timestamp)) / 1000); // en segundos

    if (diff < 60) return "Just now";
    if (diff < 3600) return Math.floor(diff / 60) + " minute(s) ago";
    if (diff < 86400) return Math.floor(diff / 3600) + " hour(s) ago";
    return Math.floor(diff / 86400) + " day(s) ago";
}

// Función para mostrar una review en el DOM
function displayReview(review, prepend = true) {
    const div = document.createElement("article");
    div.classList.add("review-card");
    div.innerHTML = `
      <div class="review-header">
        <div>
          <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Reviewer photo">
          <p>${review.name}</p>
          <p>${review.rating} / 5 <i class="fa-solid fa-star"></i></p>
        </div>
        <h5>${timeAgo(review.timestamp)}</h5>
      </div>
      <p>${review.text}</p>
    `;
    if (prepend) reviewSection.prepend(div);
    else reviewSection.appendChild(div);
}

// Cargar reviews del LocalStorage
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
reviews.forEach(r => displayReview(r, false));

// Manejar formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newReview = {
        name: document.getElementById("reviewer-name").value,
        rating: document.getElementById("review-rating").value,
        text: document.getElementById("review-text").value,
        timestamp: new Date().toISOString()
    };

    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    displayReview(newReview);

    form.reset();
});

// Actualizar "hace cuanto" cada minuto
setInterval(() => {
    document.querySelectorAll(".review-card").forEach((card, i) => {
        const ts = reviews[reviews.length - 1 - i]?.timestamp;
        if (ts) card.querySelector("h5").textContent = timeAgo(ts);
    });
}, 60000);


const sidebar = document.getElementById("sidebar");
const mainImage = document.querySelector(".main-image");
const colorButtons = document.querySelectorAll(".color-container button");
const deleteButton = document.getElementById("delete-btn");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "KRxuV6uSPQlLDlfCmSH09C-3o5c6hOg1Gr8SedOoxl8"; // Replace with your Unsplash Access Key

// Fetch images from API and display them in the sidebar
async function fetchImages(query) {
    try {
        const response = await fetch(`${API_URL}?query=${query}&client_id=${API_KEY}`);
        const data = await response.json();
        sidebar.innerHTML = ""; // Clear previous images
        data.results.forEach((image) => {
            const img = document.createElement("img");
            img.src = image.urls.small;
            img.alt = image.alt_description || "Image";
            img.addEventListener("click", () => {
                mainImage.src = img.src; // Update the main image
            });
            sidebar.appendChild(img);
        });
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Change border color of the main image
colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.getAttribute("data-color");
        mainImage.style.borderColor = color;
    });
});


// Delete main image, clear sidebar, and reset search bar
deleteButton.addEventListener("click", () => {
    mainImage.src = "main.jpg"; // Reset main image
    mainImage.style.borderColor = "#52ab98"; // Reset border color
    sidebar.innerHTML = ""; // Clear sidebar images
    searchInput.value = ""; // Clear the search bar input
    console.log("Main image, search items, and search input cleared.");
});



// Search images
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchImages(query);
});

// Set default image on load
document.addEventListener("DOMContentLoaded", () => {
    mainImage.src = "main.jpg"; // Default image file
});

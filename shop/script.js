const hamburger = document.getElementById("hamburger");
  const navItems = document.getElementById("nav-items");

  hamburger.addEventListener("click", () => {
    navItems.classList.toggle("active");
    // Toggle hamburger icon between ☰ and ✖
    hamburger.textContent = navItems.classList.contains("active") ? "✖" : "☰";
  });

let allProducts = [];
let filteredProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    allProducts = await res.json();

    allProducts = allProducts.map(p => ({
      ...p,
      colours: ["red", "blue", "green", "black", "white"].filter(() => Math.random() > 0.5),
      sizes: ["s", "m", "l", "xl"].filter(() => Math.random() > 0.5)
    }));

    filteredProducts = allProducts;
    renderProducts(filteredProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

function renderProducts(products) {
  const section = document.querySelector("main-content section");
  section.innerHTML = "";

  if (products.length === 0) {
    section.innerHTML = `<p style="color:red; font-size:18px;"> No products found.</p>`;
    return;
  }

  const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"];
  categories.forEach(cat => {
    const group = products.filter(p => p.category === cat);
    if (group.length > 0) {
      const categoryDiv = document.createElement("div");
      categoryDiv.innerHTML = `<h2>${capitalize(cat)}</h2><div class="product-row"></div>`;
      const row = categoryDiv.querySelector(".product-row");

      group.forEach(p => {
        const productCard = document.createElement("div");
        productCard.classList.add("item");
        productCard.innerHTML = `
          <div class="item">
          <img src="${p.image}" alt="${p.title}"/>
          <div class="info">
            <div class="row">           
              <div class="price">$${p.price}</div>
              <div class="sized">${p.sizes.join(",").toUpperCase()}</div>
            </div>
            <div class="colors">
              Colors:
              <div class="row">
                ${p.colours.map(c => `<div class="circle" style="background-color:${c}"></div>`).join("")}
              </div>
            </div>
            <div class="row">Rating: ⭐ ${p.rating.rate} (${p.rating.count})</div>
          </div>
          <button class="addBtn" data-id="${p.id}">Add to Cart</button>
          </div>
        `;
        row.appendChild(productCard);
      });

      section.appendChild(categoryDiv);
    }
  });

  document.querySelectorAll(".addBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const product = allProducts.find(p => p.id === id);
      addToCart(product);
    });
  });
}

function addToCart(product) {
  let existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to cart`);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", e => {
  const searchTerm = e.target.value.toLowerCase();
  filteredProducts = allProducts.filter(p =>
    p.title.toLowerCase().includes(searchTerm)
  );
  applyAllFilters();
});

// Category filter toggle
document.querySelectorAll(".filter").forEach(filter => {
  filter.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(f => f.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.textContent.toLowerCase();
    if (category === "all") {
      filteredProducts = allProducts;
    } else if (category === "mens") {
      filteredProducts = allProducts.filter(p => p.category === "men's clothing");
    } else if (category === "womens") {
      filteredProducts = allProducts.filter(p => p.category === "women's clothing");
    } else if (category === "jewellery") {
      filteredProducts = allProducts.filter(p => p.category === "jewelery");
    } else if (category === "electronics") {
      filteredProducts = allProducts.filter(p => p.category === "electronics");
    }
    applyAllFilters();
  });
});

// Sidebar filters
function applyAllFilters() {
  let results = [...filteredProducts];

  // Color filter
  const selectedColors = Array.from(document.querySelectorAll("input[name=color]:checked")).map(c => c.id);
  if (selectedColors.length > 0) {
    results = results.filter(p => selectedColors.some(c => p.colours.includes(c)));
  }

  // Size filter
  const selectedSizes = Array.from(document.querySelectorAll("input[id=s], input[id=m], input[id=l], input[id=xl]"))
    .filter(c => c.checked)
    .map(c => c.id);
  if (selectedSizes.length > 0) {
    results = results.filter(p => selectedSizes.some(s => p.sizes.includes(s)));
  }

  // Rating filter
  const minRating = parseFloat(document.getElementById("range").value) || 0;
  results = results.filter(p => p.rating.rate >= minRating);

  // Price filter
  const selectedPriceRanges = Array.from(document.querySelectorAll("input[name=prange]:checked")).map(p => p.id);
  if (selectedPriceRanges.length > 0) {
    results = results.filter(p => {
      return selectedPriceRanges.some(range => {
        if (range === "0-25") return p.price >= 0 && p.price <= 25;
        if (range === "25-50") return p.price > 25 && p.price <= 50;
        if (range === "50-100") return p.price > 50 && p.price <= 100;
        if (range === "100on") return p.price > 100;
      });
    });
  }

  renderProducts(results);
}

// Attach sidebar filters
document.querySelectorAll("input[type=checkbox], #range").forEach(input => {
  input.addEventListener("change", applyAllFilters);
});

// Init
fetchProducts(); 

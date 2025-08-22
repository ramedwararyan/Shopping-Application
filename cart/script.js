let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-items");
const checkoutList = document.getElementById("checkout-list");
const totalPriceEl = document.getElementById("total-price");

function renderCart() {
  cartContainer.innerHTML = "";
  checkoutList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
        
          <div class="item">
          <img src="${item.image}" alt="${item.title}"/>
          <div class="info">
            <div class="row">            
              <div class="price">$${item.price}</div>
              <div class="sized">${item.sizes.join(",").toUpperCase()}</div>
            </div>
            <div class="colors">
              Colors:
              <div class="row">
                ${item.colours.map(c => `<div class="circle" style="background-color:${c}"></div>`).join("")}
              </div>
            </div>
            <div class="row">Rating: ⭐ ${item.rating.rate} (${item.rating.count})</div>
          </div>
         <button class="remove-btn" onclick="removeItem(${index})">Remove From Cart</button></div>
          </div>
        `;
    cartContainer.appendChild(div);

    const p = document.createElement("p");
    p.innerHTML = `<span>${item.title}</span> <span>$${item.price}</span>`;
    checkoutList.appendChild(p);

    total += item.price;
  });

  totalPriceEl.textContent = "$ " + total + "/-";
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

renderCart();


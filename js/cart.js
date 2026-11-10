(function () {
  "use strict";
  const CART_KEY = "stylenest_cart";
  const FREE_SHIPPING_MINIMUM = 999;
  const SHIPPING_FEE = 79;
  const itemsContainer = document.getElementById("cart-items");
  const money = value => "₹" + (Number(value) || 0).toLocaleString("en-IN");

  function readCart() {
    try {
      const data = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
  }

  function showToast(message) {
    const toast = document.getElementById("cart-toast");
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2100);
  }

  function updateSummary(cart) {
    const count = cart.reduce((sum, item) => sum + Math.max(1, Number(item.quantity) || 1), 0);
    const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * Math.max(1, Number(item.quantity) || 1), 0);
    const delivery = subtotal === 0 || subtotal >= FREE_SHIPPING_MINIMUM ? 0 : SHIPPING_FEE;
    document.getElementById("header-cart-count").textContent = count;
    document.getElementById("items-heading").textContent = `Your items (${count})`;
    document.getElementById("subtotal").textContent = money(subtotal);
    document.getElementById("delivery").textContent = delivery === 0 ? (subtotal ? "FREE" : money(0)) : money(delivery);
    document.getElementById("total").textContent = money(subtotal + delivery);
    document.getElementById("shipping-note").textContent = subtotal === 0
      ? "Add an item to see your delivery estimate."
      : subtotal >= FREE_SHIPPING_MINIMUM
        ? "You have unlocked free delivery!"
        : `Add ${money(FREE_SHIPPING_MINIMUM - subtotal)} more for free delivery.`;
    document.getElementById("checkout-button").classList.toggle("disabled", count === 0);
    document.getElementById("checkout-button").setAttribute("aria-disabled", count === 0 ? "true" : "false");
  }

  function render() {
    const cart = readCart();
    updateSummary(cart);
    if (!cart.length) {
      itemsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">♡</div>
          <h2>Your bag is waiting</h2>
          <p>Looks like you haven't added anything to your bag yet.</p>
          <a class="shop-button" href="shop.html">Explore the Collection</a>
        </div>`;
      return;
    }

    itemsContainer.innerHTML = cart.map((item, index) => {
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const image = item.image || "";
      return `
        <article class="cart-item" data-index="${index}">
          <img class="item-image" src="${escapeHTML(image)}" alt="${escapeHTML(item.name || "StyleNest product")}" onerror="this.style.visibility='hidden'">
          <div class="item-info">
            <p class="item-category">STYLENEST COLLECTION</p>
            <h3 class="item-name">${escapeHTML(item.name || "Fashion item")}</h3>
            <p class="item-meta">Size: ${escapeHTML(item.size || "Not selected")}</p>
            <div class="item-price">${money(item.price)}</div>
            <div class="quantity-control" aria-label="Quantity controls">
              <button type="button" data-action="decrease" aria-label="Decrease quantity">−</button>
              <span>${quantity}</span>
              <button type="button" data-action="increase" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="item-actions">
            <strong class="line-total">${money((Number(item.price) || 0) * quantity)}</strong>
            <button class="remove-button" type="button" data-action="remove">Remove</button>
          </div>
        </article>`;
    }).join("");
  }

  itemsContainer.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const row = button.closest("[data-index]");
    if (!row) return;
    const index = Number(row.dataset.index);
    const cart = readCart();
    if (!cart[index]) return;
    const action = button.dataset.action;

    if (action === "increase") {
      cart[index].quantity = Math.min(10, (Number(cart[index].quantity) || 1) + 1);
    } else if (action === "decrease") {
      cart[index].quantity = Math.max(1, (Number(cart[index].quantity) || 1) - 1);
    } else if (action === "remove") {
      cart.splice(index, 1);
      showToast("Item removed from your bag.");
    }
    saveCart(cart);
    render();
  });

  document.getElementById("checkout-button").addEventListener("click", event => {
    if (!readCart().length) {
      event.preventDefault();
      showToast("Your bag is empty. Add a product first.");
    }
  });

  render();
})();

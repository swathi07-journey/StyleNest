
(function () {
  "use strict";

  const KEY = "stylenest_wishlist";
  const grid = document.getElementById("wishlist-grid");
  const empty = document.getElementById("wishlist-empty");
  const count = document.getElementById("wishlist-count");

  const products = Array.isArray(window.STYLENEST_PRODUCTS)
    ? window.STYLENEST_PRODUCTS
    : [];

  const money = value =>
    "₹" + (Number(value) || 0).toLocaleString("en-IN");

  function read() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function getProduct(item) {
    const id = typeof item === "object" ? item.id : item;
    const product = products.find(p => String(p.id) === String(id));

    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    };
  }

  function render() {
    const saved = read();
    const items = saved.map(getProduct).filter(Boolean);

    save(items);

    count.textContent = items.length + (items.length === 1 ? " item" : " items");
    empty.hidden = items.length !== 0;
    grid.hidden = items.length === 0;

    if (!items.length) {
      grid.innerHTML = "";
      return;
    }

    grid.innerHTML = items.map(item => `
      <article class="wishlist-card">
        <button class="wishlist-remove" type="button"
          data-remove="${item.id}" aria-label="Remove item">×</button>

        <a class="wishlist-card-image" href="product.html?id=${item.id}">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </a>

        <div class="wishlist-card-info">
          <h2><a href="product.html?id=${item.id}">${item.name}</a></h2>
          <p class="wishlist-card-price">${money(item.price)}</p>
          <a class="wishlist-view-btn" href="product.html?id=${item.id}">
            VIEW PRODUCT
          </a>
        </div>
      </article>
    `).join("");
  }

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-remove]");
    if (!button) return;

    const id = button.dataset.remove;
    save(read().filter(item => {
      const itemId = typeof item === "object" ? item.id : item;
      return String(itemId) !== String(id);
    }));

    render();
  });

  render();
})();

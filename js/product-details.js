/* StyleNest Stage 3 - Product details
   Uses the existing product catalogue from js/products.js.
   Expected product fields: id, name, image, price, oldPrice, rating, reviews.
*/
(function () {
  "use strict";

  const view = document.getElementById("product-view");
  const relatedSection = document.getElementById("related-section");
  const relatedGrid = document.getElementById("related-products");
  const breadcrumbName = document.getElementById("breadcrumb-name");
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  // Supports common catalogue variable names without changing products.js.
 function getCatalogue() {
    if (Array.isArray(window.STYLENEST_PRODUCTS)) {
        return window.STYLENEST_PRODUCTS;
    }

    if (Array.isArray(window.products)) return window.products;
    if (Array.isArray(window.PRODUCTS)) return window.PRODUCTS;
    if (typeof products !== "undefined" && Array.isArray(products)) return products;
    if (typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS)) return PRODUCTS;

    return [];
}

  function money(value) {
    const number = Number(value) || 0;
    return "₹" + number.toLocaleString("en-IN");
  }

  function safeText(value, fallback) {
    return value === undefined || value === null || value === "" ? fallback : String(value);
  }

  function getImages(product) {
    const candidates = Array.isArray(product.images) ? product.images : [];
    const all = [product.image, ...candidates].filter(Boolean);
    return [...new Set(all)].slice(0, 4);
  }

  function showError(message) {
    view.innerHTML = `
      <div class="pd-error">
        <h2>We couldn't find this product</h2>
        <p>${message}</p>
        <a href="shop.html">← Back to Shop</a>
      </div>`;
  }

  function addToCart(product, quantity, size) {
    // Stage 3 demo storage. Later cart stages can reuse this key.
    const key = "stylenest_cart";
    let cart = [];
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      cart = Array.isArray(saved) ? saved : [];
    } catch (_) {
      cart = [];
    }

    const existing = cart.find(item =>
      String(item.id) === String(product.id) && String(item.size || "") === String(size || "")
    );

    if (existing) {
      existing.quantity = (Number(existing.quantity) || 0) + quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        size: size || ""
      });
    }
    localStorage.setItem(key, JSON.stringify(cart));
  }

  function addToWishlist(product) {
    // Stage 3 demo storage. The wishlist page can use this key in a later stage.
    const key = "stylenest_wishlist";
    let wishlist = [];
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      wishlist = Array.isArray(saved) ? saved : [];
    } catch (_) {
      wishlist = [];
    }

    const exists = wishlist.some(item =>
      String(typeof item === "object" ? item.id : item) === String(product.id)
    );
    if (!exists) {
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      localStorage.setItem(key, JSON.stringify(wishlist));
      return true;
    }
    return false;
  }

  function renderRelated(product, catalogue) {
    const related = catalogue
      .filter(item => String(item.id) !== String(product.id))
      .filter(item => !product.category || !item.category || item.category === product.category)
      .slice(0, 4);

    if (!related.length) return;
    relatedGrid.innerHTML = related.map(item => `
      <a class="pd-related-card" href="product.html?id=${encodeURIComponent(item.id)}">
        <img src="${item.image}" alt="${safeText(item.name, "StyleNest product")}" loading="lazy">
        <h3>${safeText(item.name, "Fashion item")}</h3>
        <p>${money(item.price)}</p>
      </a>`).join("");
    relatedSection.hidden = false;
  }

  function renderProduct(product, catalogue) {
    const images = getImages(product);
    const firstImage = images[0] || "";
    const oldPrice = Number(product.oldPrice) || 0;
    const price = Number(product.price) || 0;
    const discount = oldPrice > price && oldPrice > 0
      ? Math.round((1 - price / oldPrice) * 100)
      : 0;
    let selectedSize = "";
    let quantity = 1;

    breadcrumbName.textContent = safeText(product.name, "Product");
    document.title = `${safeText(product.name, "Product")} | StyleNest`;

    const sizes = Array.isArray(product.sizes) && product.sizes.length
      ? product.sizes
      : ["XS", "S", "M", "L", "XL"];

    view.innerHTML = `
      <div class="pd-gallery">
        <div class="pd-thumbnails" id="pd-thumbnails">
          ${images.map((image, index) => `
            <button class="pd-thumb ${index === 0 ? "active" : ""}" type="button" data-image="${index}" aria-label="View product image ${index + 1}">
              <img src="${image}" alt="">
            </button>`).join("")}
        </div>
        <div class="pd-main-image-wrap">
          ${discount ? `<span class="pd-image-badge">-${discount}% OFF</span>` : ""}
          <img class="pd-main-image" id="pd-main-image" src="${firstImage}" alt="${safeText(product.name, "Product image")}">
        </div>
      </div>

      <div class="pd-info">
        <p class="pd-category">${safeText(product.category || product.gender, "STYLE NEST COLLECTION")}</p>
        <h1 class="pd-title">${safeText(product.name, "Fashion essential")}</h1>
        <div class="pd-rating">★★★★★ <span>${Number(product.rating || 4.5).toFixed(1)} · ${Number(product.reviews || 0).toLocaleString()} reviews</span></div>
        <div class="pd-price-row">
          <span class="pd-price">${money(price)}</span>
          ${oldPrice > price ? `<span class="pd-old-price">${money(oldPrice)}</span>` : ""}
          ${discount ? `<span class="pd-discount">Save ${discount}%</span>` : ""}
        </div>
        <p class="pd-description">${safeText(product.description, "A thoughtfully selected StyleNest essential, designed to bring comfort and effortless style to your everyday wardrobe.")}</p>

        <div class="pd-divider"></div>
        <div class="pd-option-heading"><span>Select size</span><small>Choose your preferred size</small></div>
        <div class="pd-sizes" id="pd-sizes">
          ${sizes.map(size => `<button class="pd-size" type="button" data-size="${size}">${size}</button>`).join("")}
        </div>

        <div class="pd-quantity-row">
          <span class="pd-option-heading" style="margin:0">Quantity</span>
          <div class="pd-quantity">
            <button type="button" id="pd-minus" aria-label="Decrease quantity">−</button>
            <output id="pd-quantity">1</output>
            <button type="button" id="pd-plus" aria-label="Increase quantity">+</button>
          </div>
          <span class="pd-stock">● Available</span>
        </div>

        <div class="pd-actions">
          <button class="pd-add-cart" type="button" id="pd-add-cart">Add to Bag</button>
          <button class="pd-wishlist" type="button" id="pd-wishlist" aria-label="Add to wishlist">♡</button>
        </div>
        <p class="pd-message" id="pd-message" role="status"></p>

        <div class="pd-details-note">
          <div class="pd-note"><strong>Easy returns</strong>Simple demo store return information.</div>
          <div class="pd-note"><strong>Secure shopping</strong>This is a frontend demo. No real payment is collected.</div>
        </div>
      </div>`;

    const mainImage = document.getElementById("pd-main-image");
    document.getElementById("pd-thumbnails").addEventListener("click", event => {
      const button = event.target.closest("[data-image]");
      if (!button) return;
      const index = Number(button.dataset.image);
      mainImage.src = images[index];
      document.querySelectorAll(".pd-thumb").forEach(thumb => thumb.classList.remove("active"));
      button.classList.add("active");
    });

    document.getElementById("pd-sizes").addEventListener("click", event => {
      const button = event.target.closest("[data-size]");
      if (!button) return;
      selectedSize = button.dataset.size;
      document.querySelectorAll(".pd-size").forEach(sizeButton => sizeButton.classList.remove("selected"));
      button.classList.add("selected");
      document.getElementById("pd-message").textContent = "";
    });

    const quantityOutput = document.getElementById("pd-quantity");
    document.getElementById("pd-minus").addEventListener("click", () => {
      quantity = Math.max(1, quantity - 1);
      quantityOutput.textContent = quantity;
    });
    document.getElementById("pd-plus").addEventListener("click", () => {
      quantity = Math.min(10, quantity + 1);
      quantityOutput.textContent = quantity;
    });

    document.getElementById("pd-add-cart").addEventListener("click", () => {
      const message = document.getElementById("pd-message");
      if (!selectedSize) {
        message.textContent = "Please select a size before adding this item to your bag.";
        return;
      }
      addToCart(product, quantity, selectedSize);
      message.textContent = "Added to your bag successfully!";
    });

    document.getElementById("pd-wishlist").addEventListener("click", event => {
      const added = addToWishlist(product);
      event.currentTarget.classList.toggle("active", added);
      event.currentTarget.textContent = added ? "♥" : "♡";
      document.getElementById("pd-message").textContent = added
        ? "Added to your wishlist!"
        : "This product is already in your wishlist.";
    });

    renderRelated(product, catalogue);
  }

  const catalogue = getCatalogue();
  if (!productId) {
    showError("Open a product from the Shop page to view its details.");
    return;
  }
  if (!catalogue.length) {
    showError("The product catalogue was not found. Check that js/products.js is loaded before js/product-details.js.");
    return;
  }
  const selectedProduct = catalogue.find(item => String(item.id) === String(productId));
  if (!selectedProduct) {
    showError("This product ID is not available in the current catalogue. Return to the Shop page and choose another product.");
    return;
  }
  renderProduct(selectedProduct, catalogue);
})();

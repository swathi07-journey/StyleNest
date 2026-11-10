/* Shared header, footer and homepage interactions for StyleNest */
const headerRoot = document.getElementById("site-header");
const footerRoot = document.getElementById("site-footer");

if (headerRoot) {
  headerRoot.innerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="StyleNest home"><span class="brand-mark">S</span><span>StyleNest</span></a>
        <nav class="main-nav" id="main-nav" aria-label="Main navigation">
          <a href="index.html">Home</a><a href="shop.html">Shop</a><a href="#categories">Men</a><a href="#categories">Women</a><a href="#new-arrivals">New arrivals</a>
        </nav>
        <div class="header-actions">
        <a href="shop.html" aria-label="Search products">
  <span class="header-icon">⌕</span>
  <span>Search</span>
</a>

<a href="wishlist.html" aria-label="Wishlist">
  <span class="header-icon">♡</span>
  <span class="count">0</span>
</a>

<a href="cart.html" aria-label="Shopping cart">
  <span class="header-icon">♧</span>
  <span class="count">0</span>
</a>
          <a class="account-link" href="account.html" aria-label="Account">
  <span class="header-icon">♙</span>
</a>
        </div>
        <button class="menu-toggle" id="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="main-nav">☰</button>
      </div>
    </header>`;
}

if (footerRoot) {
  footerRoot.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand"><a class="brand" href="index.html"><span class="brand-mark">S</span><span>StyleNest</span></a><p>Thoughtful everyday fashion. Discover pieces that feel like you, whatever the day brings.</p></div>
          <div class="footer-column"><h3>EXPLORE</h3><a href="#categories">Women</a><a href="#categories">Men</a><a href="#trending">New arrivals</a><a href="#trending">Best sellers</a></div>
          <div class="footer-column"><h3>HELP & SUPPORT</h3><a href="#site-footer">Shipping information</a><a href="#site-footer">Returns & exchanges</a><a href="#site-footer">FAQs</a><a href="mailto:hello@example.com">Contact us</a></div>
          <div class="footer-column"><h3>SAY HELLO</h3><p>hello@example.com</p><p>Mon–Fri, 9 AM–5 PM</p><p><a href="#site-footer">Instagram ↗</a><a href="#site-footer">Pinterest ↗</a></p></div>
        </div>
        <div class="footer-bottom"><span>© 2026 StyleNest. Portfolio demonstration project.</span><span>Made for everyday style.</span></div>
      </div>
    </footer>`;
}

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  }));
}

const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll(".heart-button").forEach(button => {
  button.addEventListener("click", () => {
    const saved = button.classList.toggle("is-saved");
    button.textContent = saved ? "♥" : "♡";
    button.style.color = saved ? "#D94A4A" : "";
    showToast(saved ? "Added to your preview wishlist" : "Removed from your preview wishlist");
  });
});

const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();
    const emailInput = document.getElementById("newsletter-email");
    const message = document.getElementById("newsletter-message");
    const email = emailInput.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      message.textContent = "Please enter a valid email address.";
      message.style.color = "#D94A4A";
      emailInput.setAttribute("aria-invalid", "true");
      emailInput.focus();
      return;
    }
    message.textContent = "Thanks for subscribing! This is a demo form.";
    message.style.color = "#23865B";
    emailInput.removeAttribute("aria-invalid");
    newsletterForm.reset();
  });
}

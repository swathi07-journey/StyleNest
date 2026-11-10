# StyleNest – Stage 3 Add-on
## Product Details Page

### Files included
- `product.html` – product details page
- `css/product.css` – responsive product page styling
- `js/product-details.js` – reads the selected product ID, displays product details, size selection, quantity, demo cart/wishlist actions and related products

### Install into the existing project
Extract this ZIP and copy the included files into the matching locations in your existing `StyleNest` project. Do not replace Stage 1 or Stage 2 files.

### Important compatibility note
This stage expects the existing `js/products.js` catalogue to expose an array named `products` or `PRODUCTS` (or `window.products` / `window.PRODUCTS`). Each product should contain at least:
`id`, `name`, `image`, `price`, `oldPrice`, `rating`, `reviews`.
Optional fields: `description`, `category`, `gender`, `images`, `sizes`.

The page loads `js/products.js` before `js/product-details.js`. Product links from the Shop page should use:
`product.html?id=PRODUCT_ID`

### Demo storage
This page stores demo cart data under `stylenest_cart` and wishlist data under `stylenest_wishlist`. No real payment or personal payment information is collected.

### Test
1. Start Live Server from `index.html`.
2. Open Shop.
3. Click a product image or product name.
4. Confirm the correct product name, image and price appear.
5. Select a size and adjust quantity.
6. Add to Bag and verify the success message.
7. Click the wishlist heart and verify its message.
8. Refresh the product page and check that it still displays the same product.

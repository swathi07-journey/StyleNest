STYLENEST - STAGE 4: SHOPPING CART

FILES INCLUDED
- cart.html
- css/cart.css
- js/cart.js

INSTALL
1. Extract this ZIP.
2. Copy cart.html into the main StyleNest project folder.
3. Copy the css folder's cart.css into StyleNest/css/.
4. Copy the js folder's cart.js into StyleNest/js/.
5. If Windows asks whether to replace files, do not replace your existing files; these Stage 4 files have new names.

CONNECT THE NAVIGATION
In the shared navigation used by your home/shop/product pages, set the Bag/Cart link to:
<a href="cart.html">Bag</a>

If your navigation is generated in js/main.js, find the existing Cart/Bag link there and change only its href to cart.html. Keep the rest of the navigation unchanged.

TEST
1. Start Live Server and open shop.html.
2. Open any product and choose a size.
3. Click Add to Bag.
4. Open http://127.0.0.1:5500/cart.html
5. Confirm the product appears. Test +, -, and Remove.

IMPORTANT
- Uses the same LocalStorage key as Stage 3: stylenest_cart.
- Free delivery is shown for subtotal of Rs. 999 or more; otherwise demo delivery is Rs. 79.
- Checkout button points to checkout.html, which will be created in a later stage.
- This is a frontend demo. It does not collect real payments.

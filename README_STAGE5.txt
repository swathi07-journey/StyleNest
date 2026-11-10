STYLENEST - STAGE 5: CHECKOUT

Files:
- checkout.html -> copy to your main StyleNest folder
- css/checkout.css -> copy into StyleNest/css
- js/checkout.js -> copy into StyleNest/js

This checkout reads the existing `stylenest_cart` LocalStorage key created by Stage 3/4.
It validates customer and delivery fields, displays an order summary, records a demo order in
`stylenest_last_order`, clears the cart, and displays an on-page confirmation.

No real payment is collected. Do not enter card or banking details.

Test:
1. Add a product to your bag and select a size.
2. Open cart.html and click Proceed to Checkout.
3. Fill the required contact and delivery fields.
4. Submit Place Demo Order.
5. Confirm that the order confirmation appears and the bag is cleared.

Use Live Server from the project root, as in earlier stages.

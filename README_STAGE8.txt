STYLENEST STAGE 8 - MY ACCOUNT

Files included:
- account.html
- css/account.css
- js/account.js

Installation:
1. Copy account.html into the main StyleNest project folder (same folder as index.html and shop.html).
2. Copy account.css into the existing css folder.
3. Copy account.js into the existing js folder.
4. Do not replace main.js, style.css, checkout.js, or success.js.

Navigation:
If your shared navigation does not already contain an Account link, add an anchor to account.html using the same navigation markup/style as the other links. Example: <a href="account.html">Account</a>

Testing:
1. Open account.html with Live Server.
2. Enter name, email and phone, then click Save Profile. Refresh and confirm the fields remain filled.
3. Complete a demo checkout. Return to account.html and confirm the most recent order appears.

Notes:
- This is a frontend-only demo. Profile and latest order are stored in this browser's LocalStorage.
- The current checkout implementation stores only the latest order, so this page displays the most recent order, not a full historical order list.

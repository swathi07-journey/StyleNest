(function(){
  "use strict";
  const CART_KEY="stylenest_cart", ORDER_KEY="stylenest_last_order";
  const FREE_SHIPPING_MINIMUM=999, SHIPPING_FEE=79;
  const form=document.getElementById("checkout-form");
  const money=value=>"₹"+(Number(value)||0).toLocaleString("en-IN");
  function readCart(){try{const data=JSON.parse(localStorage.getItem(CART_KEY)||"[]");return Array.isArray(data)?data:[]}catch(_){return[]}}
  function totals(cart){const subtotal=cart.reduce((sum,item)=>sum+(Number(item.price)||0)*Math.max(1,Number(item.quantity)||1),0);const delivery=!subtotal||subtotal>=FREE_SHIPPING_MINIMUM?0:SHIPPING_FEE;return{subtotal,delivery,total:subtotal+delivery}}
  function render(){const cart=readCart();if(!cart.length){document.getElementById("checkout-layout").innerHTML='<section class="form-card"><h2>Your bag is empty</h2><p>Add a product before checking out.</p><a class="place-order" href="shop.html">Explore the collection →</a></section>';return false}
    document.getElementById("checkout-items").innerHTML=cart.map(item=>`<div class="mini-item"><img src="${escapeHTML(item.image||"")}" alt="" onerror="this.style.visibility='hidden'"><div><h3>${escapeHTML(item.name||"Fashion item")}</h3><p>Size: ${escapeHTML(item.size||"—")} · Qty: ${Math.max(1,Number(item.quantity)||1)}</p></div><strong>${money((Number(item.price)||0)*Math.max(1,Number(item.quantity)||1))}</strong></div>`).join("");
    const t=totals(cart);document.getElementById("subtotal").textContent=money(t.subtotal);document.getElementById("delivery").textContent=t.delivery?money(t.delivery):"FREE";document.getElementById("total").textContent=money(t.total);return true;
  }
  function escapeHTML(value){return String(value==null?"":value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))}
  if(!render())return;
  form.addEventListener("submit",event=>{event.preventDefault();const error=document.getElementById("form-error");error.textContent="";if(!form.reportValidity())return;const cart=readCart();if(!cart.length){error.textContent="Your bag is empty. Please add a product first.";return}
    const data=Object.fromEntries(new FormData(form).entries());const t=totals(cart);const order={orderNumber:"SN"+Date.now().toString().slice(-8),createdAt:new Date().toISOString(),customer:{fullName:data.fullName,email:data.email,phone:data.phone,address:data.address,city:data.city,state:data.state,pin:data.pin},payment:data.payment,items:cart,subtotal:t.subtotal,delivery:t.delivery,total:t.total};
    try{localStorage.setItem(ORDER_KEY,JSON.stringify(order));localStorage.removeItem(CART_KEY);}catch(_){error.textContent="Unable to save this demo order in your browser. Please try again.";return}
    window.location.href="success.html";
  });
})();

(function(){
  "use strict";
  const ORDER_KEY="stylenest_last_order";
  const money=value=>"₹"+(Number(value)||0).toLocaleString("en-IN");
  const escapeHTML=value=>String(value==null?"":value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  let order=null;
  try{order=JSON.parse(localStorage.getItem(ORDER_KEY)||"null")}catch(_){order=null}
  if(!order||!Array.isArray(order.items)||!order.items.length){document.getElementById("success-card").hidden=true;document.getElementById("empty-card").hidden=false;return;}
  document.getElementById("order-number").textContent=order.orderNumber||"StyleNest demo order";
  const date=order.createdAt?new Date(order.createdAt):new Date();
  document.getElementById("order-date").textContent=isNaN(date.getTime())?"—":date.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
  document.getElementById("payment-method").textContent=order.payment||"Demo payment";
  const items=order.items;
  const count=items.reduce((sum,item)=>sum+Math.max(1,Number(item.quantity)||1),0);
  document.getElementById("item-count").textContent=count+ (count===1?" item":" items");
  document.getElementById("order-items").innerHTML=items.map(item=>{const qty=Math.max(1,Number(item.quantity)||1);return `<article class="order-item"><img src="${escapeHTML(item.image||"")}" alt="${escapeHTML(item.name||"Product")}" onerror="this.style.visibility='hidden'"><div><p class="item-name">${escapeHTML(item.name||"Fashion item")}</p><p class="item-detail">Size: ${escapeHTML(item.size||"—")} · Qty: ${qty}</p></div><strong class="item-price">${money((Number(item.price)||0)*qty)}</strong></article>`}).join("");
  document.getElementById("subtotal").textContent=money(order.subtotal);
  document.getElementById("delivery").textContent=Number(order.delivery)===0?"FREE":money(order.delivery);
  document.getElementById("total").textContent=money(order.total);
  document.title="Order "+(order.orderNumber||"Confirmed")+" | StyleNest";
})();

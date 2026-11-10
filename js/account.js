(function(){
  "use strict";
  const PROFILE_KEY="stylenest_profile";
  const ORDER_KEY="stylenest_last_order";
  const form=document.getElementById("profile-form");
  const money=value=>"₹"+(Number(value)||0).toLocaleString("en-IN");
  const escapeHTML=value=>String(value==null?"":value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  try{
    const profile=JSON.parse(localStorage.getItem(PROFILE_KEY)||"null");
    if(profile){form.elements.fullName.value=profile.fullName||"";form.elements.email.value=profile.email||"";form.elements.phone.value=profile.phone||"";}
  }catch(_){/* Ignore invalid saved profile data. */}
  form.addEventListener("submit",function(event){
    event.preventDefault();
    if(!form.reportValidity())return;
    const profile={fullName:form.elements.fullName.value.trim(),email:form.elements.email.value.trim(),phone:form.elements.phone.value.trim()};
    try{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));document.getElementById("profile-message").textContent="Your profile details have been saved on this device.";}
    catch(_){document.getElementById("profile-message").textContent="Unable to save your profile in this browser.";}
  });
  let order=null;
  try{order=JSON.parse(localStorage.getItem(ORDER_KEY)||"null");}catch(_){order=null;}
  const container=document.getElementById("order-content");
  if(!order||!Array.isArray(order.items)||!order.items.length)return;
  const date=order.createdAt?new Date(order.createdAt):null;
  const dateText=date&&!isNaN(date.getTime())?date.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"Date unavailable";
  const itemRows=order.items.map(item=>{
    const quantity=Math.max(1,Number(item.quantity)||1);
    return `<div class="account-order-item"><span>${escapeHTML(item.name||"Fashion item")} · ${quantity} × ${money(item.price)}</span><strong>${money((Number(item.price)||0)*quantity)}</strong></div>`;
  }).join("");
  container.innerHTML=`<div class="order-summary"><div class="order-top"><span class="order-number">${escapeHTML(order.orderNumber||"StyleNest order")}</span><span class="order-status">Confirmed</span></div><p class="order-meta">Placed on ${dateText} · ${order.items.reduce((sum,item)=>sum+Math.max(1,Number(item.quantity)||1),0)} item(s)</p>${itemRows}<div class="account-order-total"><span>Order total</span><span>${money(order.total)}</span></div></div>`;
})();

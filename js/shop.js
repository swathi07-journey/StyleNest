(() => {
 const products=window.STYLENEST_PRODUCTS||[], grid=document.getElementById("shopProductGrid");
 if(!grid)return;
 const search=document.getElementById("shopSearch"),sort=document.getElementById("sortProducts"),count=document.getElementById("resultCount");
 const load=document.getElementById("loadMore"),empty=document.getElementById("emptyResults"),filters=document.querySelector(".shop-filters");
const pageSize = 8;
let visible = pageSize;

const params = new URLSearchParams(window.location.search);
const initialGender = params.get("gender");
const showNewArrivals = params.get("arrival") === "new";

if (initialGender) {
  const checkbox = document.querySelector(
    `input[name="gender"][value="${initialGender}"]`
  );
  if (checkbox) checkbox.checked = true;
}
 const money=n=>"$"+n.toFixed(2);
 const selected=name=>[...document.querySelectorAll(`input[name="${name}"]:checked`)].map(x=>x.value);
function filtered(){
  const term=search.value.trim().toLowerCase();
  const cats=selected("category");
  const genders=selected("gender");
  const max=Number(document.getElementById("maxPrice").value);

  let list=products.filter(p=>
    (!term||`${p.name} ${p.category} ${p.gender}`.toLowerCase().includes(term)) &&
    (!cats.length||cats.includes(p.category)) &&
    (!genders.length||genders.includes(p.gender)) &&
    p.price<=max &&
    (!showNewArrivals || Number(p.id.replace("p",""))>=17)
  );

  if(sort.value==="low")list.sort((a,b)=>a.price-b.price);
  if(sort.value==="high")list.sort((a,b)=>b.price-a.price);
  if(sort.value==="rating")list.sort((a,b)=>b.rating-a.rating);
  if(sort.value==="name")list.sort((a,b)=>a.name.localeCompare(b.name));

  return list;
}
 function toast(msg){let t=document.querySelector(".snack-toast");if(!t){t=document.createElement("div");t.className="snack-toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");clearTimeout(window.__styleToast);window.__styleToast=setTimeout(()=>t.classList.remove("show"),2000)}
 function render(){
  const list=filtered(),shown=list.slice(0,visible);count.textContent=`Showing ${shown.length} of ${list.length} products`;empty.hidden=list.length>0;
  grid.innerHTML=shown.map(p=>{const off=Math.round((1-p.price/p.oldPrice)*100);return `<article class="shop-product-card">
   <a class="shop-product-image" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${p.image}" alt="${p.name}" loading="lazy">${off>0?`<span class="product-discount">-${off}%</span>`:""}</a>
   <button class="product-heart" type="button" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist">♡</button>
   <div class="shop-product-info"><a href="product.html?id=${encodeURIComponent(p.id)}"><h3>${p.name}</h3></a><div class="product-price">${money(p.price)}<span class="product-old-price">${money(p.oldPrice)}</span></div><div class="product-rating"><span>★</span> ${p.rating.toFixed(1)} (${p.reviews.toLocaleString()})</div><button class="add-cart-button" type="button" data-cart="${p.id}">＋ Add to Cart</button></div></article>`}).join("");
  load.hidden=shown.length>=list.length;
 }
 function clear(){document.querySelectorAll('.shop-filters input[type="checkbox"]').forEach(x=>x.checked=false);document.getElementById("maxPrice").value=100;document.getElementById("maxPriceLabel").textContent="$100";search.value="";sort.value="featured";visible=pageSize;render()}
 [search,sort].forEach(el=>el.addEventListener(el===search?"input":"change",()=>{visible=pageSize;render()}));
 document.querySelectorAll('.shop-filters input[type="checkbox"]').forEach(el=>el.addEventListener("change",()=>{visible=pageSize;render()}));
 document.getElementById("maxPrice").addEventListener("input",e=>{document.getElementById("maxPriceLabel").textContent="$"+e.target.value;visible=pageSize;render()});
 document.getElementById("clearFilters").addEventListener("click",clear);document.getElementById("emptyClear").addEventListener("click",clear);
 load.addEventListener("click",()=>{visible+=pageSize;render()});document.getElementById("mobileFilterToggle").addEventListener("click",()=>filters.classList.toggle("is-open"));
 grid.addEventListener("click",e=>{
  const cartBtn=e.target.closest("[data-cart]"),wishBtn=e.target.closest("[data-wish]");
  if(cartBtn){const p=products.find(x=>x.id===cartBtn.dataset.cart),cart=JSON.parse(localStorage.getItem("stylenest_cart")||"[]");const old=cart.find(x=>x.id===p.id);if(old)old.quantity=(old.quantity||1)+1;else cart.push({id:p.id,name:p.name,price:p.price,image:p.image,quantity:1});localStorage.setItem("stylenest_cart",JSON.stringify(cart));toast(p.name+" added to your demo cart")}
  if(wishBtn){const id=wishBtn.dataset.wish,w=JSON.parse(localStorage.getItem("stylenest_wishlist")||"[]"),has=w.includes(id),next=has?w.filter(x=>x!==id):[...w,id];localStorage.setItem("stylenest_wishlist",JSON.stringify(next));wishBtn.classList.toggle("is-active",!has);wishBtn.textContent=has?"♡":"♥";toast(has?"Removed from wishlist":"Added to wishlist")}
 });
 render();
})();


const TELEGRAM = "https://t.me/merxio_manager";

async function loadProducts(){
  const res = await fetch('data/products.json', {cache:'no-store'});
  if(!res.ok) throw new Error('Cannot load products.json');
  return await res.json();
}
function euro(n){ return new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR'}).format(n); }

function makeCard(p){
  const el = document.createElement('article');
  el.className = 'card';
  const imgSrc = (p.images && p.images[0]) ? p.images[0] : 'images/hero.jpg';
  el.innerHTML = `
    <img src="${imgSrc}" alt="${p.title}">
    <div class="body">
      <div class="title">${p.title}</div>
      <div class="meta">${(p.materials||[]).join(' / ') || ''}</div>
      <div class="row">
        <span>${euro(p.price)}</span>
        <a class="cta" href="product.html?id=${encodeURIComponent(p.id)}">View</a>
      </div>
    </div>`;
  return el;
}

async function renderCatalog(){
  const grid = document.getElementById('catalog-grid');
  if(!grid) return;
  const items = await loadProducts();
  grid.innerHTML = '';
  items.forEach(p=> grid.appendChild(makeCard(p)));
}

async function renderFeatured(){
  const wrap = document.getElementById('featured-grid');
  if(!wrap) return;
  const items = await loadProducts();
  wrap.innerHTML = '';
  items.filter(p=>p.featured).slice(0,3).forEach(p=> wrap.appendChild(makeCard(p)));
}

async function renderProduct(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id'); if(!id) return;
  const all = await loadProducts();
  const p = all.find(x=>x.id===id); if(!p) return;

  document.querySelector('[data-p-title]').textContent = p.title;
  document.querySelector('[data-p-meta]').textContent = `${(p.materials||[]).join(' / ')} · Handmade`;
  document.querySelector('[data-p-price]').textContent = euro(p.price);
  document.querySelector('[data-p-size]').textContent = p.size || '';

  const gal = document.getElementById('gallery');
  gal.innerHTML = '';
  (p.images||[]).forEach(src=>{
    const t = document.createElement('img');
    t.src = src; t.alt = p.title; t.style.cursor='zoom-in';
    t.addEventListener('click', ()=> window.openLightbox(src));
    gal.appendChild(t);
  });

  document.querySelectorAll('[data-cta-telegram]').forEach(a=> a.href = TELEGRAM);
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('[data-telegram]').forEach(a=> a.href = TELEGRAM);
  renderCatalog();
  renderFeatured();
  renderProduct();
});

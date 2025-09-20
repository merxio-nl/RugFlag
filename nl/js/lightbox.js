
(function(){
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.9);display:none;align-items:center;justify-content:center;z-index:9999;padding:20px';
  const img = document.createElement('img');
  img.style.maxWidth = '100%'; img.style.maxHeight='100%';
  overlay.appendChild(img);
  overlay.addEventListener('click',()=>overlay.style.display='none');
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') overlay.style.display='none';});
  document.body.appendChild(overlay);
  window.openLightbox = (src)=>{ img.src = src; overlay.style.display='flex'; };
})();

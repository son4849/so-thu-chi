const C="stc-v1";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","config.js","manifest.webmanifest","apple-touch-icon.png"])).catch(()=>{}))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
  if(r.method!=="GET")return;
  if(!(u.origin===location.origin||u.hostname==="www.gstatic.com"))return;
  e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(r);
    const net=fetch(r).then(res=>{if(res&&res.ok)c.put(r,res.clone());return res}).catch(()=>hit);
    return hit||net}))});

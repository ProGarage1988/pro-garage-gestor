const C='pgd-gestor-v13';
const F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});

self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={title:'PRO GARAGE',body:e.data?e.data.text():''}}
e.waitUntil(self.registration.showNotification(d.title||'PRO GARAGE',{body:d.body||'',icon:'./icon-192.png',badge:'./icon-192.png',tag:'cita',renotify:true,data:{url:'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow('./')}))});

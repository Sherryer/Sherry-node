// sw 监听 install 方法

const cacheName = 'my-cache-v2';

const cacheList = [
  '/',
  '/test.js',
  '/ajax.js',
  '/index.js',
  '/test-get',
  '/socket.io',
];

// 安装
this.addEventListener('install', (event) => {
  event.waitUntil(
    // 通过 caches.open 开辟一块这个 sw 专用的缓存区，并命名
    caches.open(cacheName)
    // 缓存开启 成功触发 then
      .then((cache) => {
        // addAll 中有一条失败，则全部失败
        return cache.addAll(cacheList)
      })
  )
});

// 激活
this.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      this.clients.claim(),  // 获取clients 全部控制权，为了获取 sw 激活前页面加载文件的控制权
      caches.keys().then((cacheList) => {
        return Promise.all(cacheList.map((name) => {
          console.log('激活-name', name);
          if (name !== cacheName) {
            // 清理缓存
            console.log('移除-name', name);
            return caches.delete(name)
          }
        }))
      })
    ])
  )
});

// 更新 ？？

// 其他
this.addEventListener('fetch', (event) => {
  console.log('request:', event.request.url)
})


// 可以 on message 嘛
this.addEventListener('message', (message) => {
  console.log('message:', message)
})

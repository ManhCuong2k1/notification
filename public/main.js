function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
  const publicVapidKey = 'BKanM7sYb4dy-WciO3zWxMHbuTR--Wed6q3QD7nvj-rE1I6I2dgdA9IPNpIL9X6OVbtgncxxUcrYzVMVd_wZuPw';
  
  const triggerPush = document.querySelector('.trigger-push');
  
  async function triggerPushNotification() {
    if ('serviceWorker' in navigator) {
      const register = await navigator.serviceWorker.register('./sw.js', {
        scope: '/'
      });
  
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
    
      await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.error('Service workers are not supported in this browser');
    }
  }
  
  triggerPush.addEventListener('click', () => {
    triggerPushNotification().catch(error => console.error(error));
    var x = document.createElement("p");
    var t = document.createTextNode("hello");
    x.appendChild(t);
    document.querySelector('.content').appendChild(x);
  });
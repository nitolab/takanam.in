
const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

let sw = null
let cb = () => {}
let sb = null
let loaded = false

const action = () => {
  navigator.serviceWorker.register('/sw.js')
    .then(registration=>{
      sw = registration
      registration.pushManager.getSubscription()
        .then((subscription)=>{
          cb(subscription)
          sb=subscription
          loaded=true
        })
    })
}

export const serviceworker = () => sw
export const isSubscribed = (c) => {
  if(loaded) c(sb)
  else cb = c
}
export const unsubscribe = () => {
  if(sb !== null){
    return sb.unsubscribe()
  }
  return null
}
export const subscribe = (applicationServerKey) => {
  return sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(applicationServerKey)
  })
}

export default () => {
  if(process.server) return;
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', action)
  }
}


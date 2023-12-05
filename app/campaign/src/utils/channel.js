const key = "tbook-message";

export function broadcast(message) {
  localStorage.setItem(key, message);
  localStorage.removeItem(key);
}

export function receive(ev, cb) {
  if (ev.key !== key) return;
  var message = ev.newValue;
  if (!message) return;
  cb(message);
}

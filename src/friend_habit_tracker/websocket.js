export class FriendClient{
    observers = [];
    connected = false;
    socket = null;

  constructor(userEmail) {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    this.socket.onopen = () => {
      this.connected = true;

      this.socket.send(JSON.stringify({
        type: 'connect',
        email: userEmail,
      }));
    };

    this.socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      this.notifyObservers(data);
    };

    this.socket.onclose = () => {
      this.connected = false;
    };
  }

  sendUpdate(from, to, habits, message){
    if (!this.connected) return;

    this.socket.send(JSON.stringify({
        type: "friendUpdate",
        from,
        to,
        habits,
        message,
    }));
  }
  addObserver(fn) {
    this.observers.push(fn);
  }

  notifyObservers(data) {
    this.observers.forEach((fn) => fn(data));
  }
}
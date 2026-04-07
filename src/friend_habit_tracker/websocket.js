export class FriendClient{
    observers = [];
    connected = false;
    socket = null;

  constructor(userEmail) {
    console.log('FriendClient constructor running for', userEmail);
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    this.socket.onopen = () => {
    
        console.log('socket opened for', userEmail);
        this.connected = true;

      this.socket.send(JSON.stringify({
        type: 'connect',
        email: userEmail,
      }));
    };

    this.socket.onerror = (event) => {
    console.log('socket error for', userEmail, event);
    };

    this.socket.onclose = (event) => {
    console.log('socket closed for', userEmail, event.code, event.reason);
    this.connected = false;
    };

    this.socket.onmessage = async (event) => {
      console.log('message received:', event.data);
      const data = JSON.parse(event.data);
      this.notifyObservers(data);
    };

    this.socket.onclose = () => {
      console.log('socket closed for', userEmail);
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

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
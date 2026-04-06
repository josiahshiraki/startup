export class friendClient{
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
  }
}
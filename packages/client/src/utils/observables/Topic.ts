export class Topic<Payload> {
  listeners: Array<(payload: Payload) => void> = [];
  subscribe(listener: (payload: Payload) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  publish(payload: Payload) {
    for (const listener of [...this.listeners]) {
      listener(payload);
    }
  }
}

export class EventBase {
  private events: Map<string, Set<(...args: any) => any>> = new Map();

  on(event: string, listener: (...args: any) => any) {
    const oldListeners = this.events.get(event);
    if (!oldListeners) {
      const newListeners = new Set<(...args: any) => any>();
      newListeners.add(listener);
      this.events.set(event, newListeners);
    } else {
      oldListeners.add(listener);
    }
  }
  emit(event: string) {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach((listener) => listener());
    }
  }
}

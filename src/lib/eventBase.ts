export class EventBase<Events> {
  events: Map<Events, Set<(...args: any) => any>> = new Map();
  remove(event: Events, listener: (...args: any) => any) {
    const eventListeners = this.events.get(event);
    eventListeners?.delete(listener);
  }
  on(event: Events, listener: (...args: any) => any) {
    const oldListeners = this.events.get(event);
    if (!oldListeners) {
      const newListeners = new Set<(...args: any) => any>();
      newListeners.add(listener);
      this.events.set(event, newListeners);
    } else {
      oldListeners.add(listener);
    }
  }

  emit<T>(event: Events, data?: T) {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }
  subscribe<T>(eventName: Events, fn: (...args: any) => any) {
    const listenerFunction = (props: T) => {
      if (typeof fn !== "function") {
        throw new Error(`${eventName} callback can only be a function.`);
      } else {
        fn(props);
      }
    };
    this.on(eventName, listenerFunction);

    return () => this.remove(eventName, listenerFunction);
  }
}

export class EventBase {
  events: Map<string, Set<(...args: any) => any>> = new Map();
  remove(event: string, listener: (...args: any) => any) {
    const eventListeners = this.events.get(event);
    eventListeners?.delete(listener);
  }
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
  onEventFired(eventName: string, fn: (...args: any) => any) {
    const listenerFunction = () => {
      if (typeof fn !== "function") {
        throw new Error(`${eventName} callback can only be a function.`);
      } else {
        fn();
      }
    };

    this.on(eventName, listenerFunction);

    return () => this.remove(eventName, listenerFunction);
  }
  onFilterUpdate(fn: (...args: any) => any) {
    return this.onEventFired("filterValueUpdate", fn);
  }
  onFilterClear(fn: (...args: any) => any) {
    return this.onEventFired("filterClear", fn);
  }
}

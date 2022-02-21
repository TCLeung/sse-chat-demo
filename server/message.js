import {v4 as uuidv4} from 'uuid';

export class MessageRepository {
  _subscribers = {};

  subscribe(onMessage) {
    const id = uuidv4();
    console.debug(`Creating new subscription[${id}]`);
    this._subscribers[id] = onMessage;
    return id;
  }

  unsubscribe(id) {
    console.debug(`Removing subscription[${id}]`);
    delete this._subscribers[id];
  }

  publishMessage(message) {
    for (const id in this._subscribers) {
      console.debug(`Publishing message to subscriber[${id}]`);
      const onMessage = this._subscribers[id];
      onMessage(message);
    }
  }
}
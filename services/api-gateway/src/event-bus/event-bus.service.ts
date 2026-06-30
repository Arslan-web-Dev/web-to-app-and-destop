import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

@Injectable()
export class EventBusService extends EventEmitter {
  publish(event: string, payload: any) {
    this.emit(event, payload);
  }

  subscribe(event: string, handler: (payload: any) => void) {
    this.on(event, handler);
  }
}

import { merge, cloneDeep } from 'lodash';

type ListenerFn = () => void;

const observablePrototype = {
  _listeners: [] as ListenerFn[],

  subscribe(listenerFn: ListenerFn) {
    this._listeners.push(listenerFn);
    return () => { // unsubscribe function
      this._listeners = this._listeners.filter((fn) => fn !== listenerFn);
    };
  },

  _notifyListeners() {
    this._listeners.forEach((listenerFn) => listenerFn());
  }
};

export default function createObservableService(serviceDefinition: any) {
  return merge({}, cloneDeep(observablePrototype), serviceDefinition);
}

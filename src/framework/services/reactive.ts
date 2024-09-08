export default function reactive<K extends Object, T>(obj: K, callbackFn: (prop: string, val: T) => boolean) {
  // eslint-disable-next-line no-undef
  return new Proxy(obj, {
    set<J extends Object>(target: J, prop: string, val: T, receiver: J) {
      if (callbackFn(prop, val)) {
        return Reflect.set(target, prop, val, receiver);
      } else {
        return false;
      }
    },
  });
}

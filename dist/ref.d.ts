type Ref<V> = [() => V | null, (value: V) => void];
declare const createRef: <V>() => Ref<V>;
export { createRef };
export type { Ref };

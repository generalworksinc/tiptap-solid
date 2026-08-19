import { JSX } from '@solidjs/web';
import { Component } from 'solid-js';
import { Ref } from './ref';
interface NodeViewWrapperProps {
    [key: string]: unknown;
    style?: JSX.CSSProperties;
    ref?: Ref<Element>;
    as?: string | Component<Record<string, unknown>>;
}
declare const NodeViewWrapper: Component<NodeViewWrapperProps>;
export { NodeViewWrapper };
export type { NodeViewWrapperProps };

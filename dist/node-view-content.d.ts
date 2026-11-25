import { JSX } from '@solidjs/web';
import { Component } from 'solid-js';
import { Ref } from './ref';
interface NodeViewContentProps {
    [key: string]: unknown;
    style?: JSX.CSSProperties;
    ref?: Ref<Element>;
    as?: string | Component<Record<string, unknown>>;
}
declare const NodeViewContent: Component<NodeViewContentProps>;
export { NodeViewContent };
export type { NodeViewContentProps };

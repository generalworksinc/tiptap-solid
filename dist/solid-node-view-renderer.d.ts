import { NodeViewRenderer, NodeViewRendererOptions } from '@tiptap/core';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Decoration } from '@tiptap/pm/view';
import { Component } from 'solid-js';
interface SolidNodeViewRendererOptions extends NodeViewRendererOptions {
    setSelection: ((anchor: number, head: number, root: Document | ShadowRoot) => void) | null;
    update: ((props: {
        oldNode: ProseMirrorNode;
        oldDecorations: Decoration[];
        newNode: ProseMirrorNode;
        newDecorations: Decoration[];
        updateProps: () => void;
    }) => boolean) | null;
}
declare const SolidNodeViewRenderer: (component: Component, options?: Partial<SolidNodeViewRendererOptions>) => NodeViewRenderer;
export { SolidNodeViewRenderer };
export type { SolidNodeViewRendererOptions };

import { NodeViewProps } from '@tiptap/core';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Accessor, Context } from 'solid-js';
import { SolidEditor } from './editor';
type Attrs = Record<string, unknown>;
interface SolidNodeViewProps<A extends Attrs = Attrs> extends NodeViewProps {
    node: ProseMirrorNode & {
        attrs: A;
    };
    editor: SolidEditor;
}
interface SolidNodeViewContextProps<A extends Attrs = Attrs> {
    state: Accessor<SolidNodeViewProps<A> & {
        onDragStart?(event: DragEvent): void;
    }>;
}
declare const SolidNodeViewContext: Context<unknown>;
declare const useSolidNodeView: <A extends Attrs = Attrs>() => SolidNodeViewContextProps<A>;
export { SolidNodeViewContext, useSolidNodeView };
export type { SolidNodeViewContextProps, SolidNodeViewProps, Attrs };

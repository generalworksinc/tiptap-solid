import { BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';
import { Component, JSX, Context, Accessor, Setter } from 'solid-js';
import { NodeViewProps, Editor, EditorOptions, NodeViewRendererOptions, NodeViewRenderer } from '@tiptap/core';
import { Node } from '@tiptap/pm/model';
import { FloatingMenuPluginProps } from '@tiptap/extension-floating-menu';
import { Decoration } from '@tiptap/pm/view';

type BubbleMenuWrapperProps = Omit<BubbleMenuPluginProps, "element" | "pluginKey" | "shouldShow"> & {
    class?: string;
    children?: JSX.Element;
    shouldShow?: BubbleMenuPluginProps["shouldShow"];
    tippyOptions?: {
        offset?: number | [number, number];
        placement?: string;
        [key: string]: any;
    };
};
declare const BubbleMenuWrapper: Component<BubbleMenuWrapperProps>;

type Attrs = Record<string, any>;
interface SolidNodeViewProps<A extends Attrs = Attrs> extends NodeViewProps {
    node: Node & {
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

interface SolidRendererOptions<S = SolidNodeViewProps> {
    editor: SolidEditor;
    state: S;
    as?: string;
}
declare class SolidRenderer<S = SolidNodeViewProps> {
    state: Accessor<S>;
    setState: Setter<S>;
    id: string;
    element: Element;
    component: Component<{
        state: S;
    }>;
    private editor;
    constructor(component: Component<{
        state: S;
    }>, { editor, state: initialState, as }: SolidRendererOptions<S>);
    destroy(): void;
}

declare class SolidEditor extends Editor {
    renderers: Accessor<SolidRenderer[]>;
    setRenderers: Setter<SolidRenderer[]>;
    constructor(options?: Partial<EditorOptions>);
}

interface SolidEditorContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
    editor: SolidEditor;
}
declare const SolidEditorContent: Component<SolidEditorContentProps>;

type FloatingMenuWrapperProps = Omit<FloatingMenuPluginProps, "element" | "pluginKey" | "shouldShow"> & {
    class?: string;
    shouldShow?: FloatingMenuPluginProps["shouldShow"];
    children?: JSX.Element;
    tippyOptions?: {
        offset?: number | [number, number];
        placement?: string;
        [key: string]: any;
    };
};
declare const FloatingMenuWrapper: Component<FloatingMenuWrapperProps>;

type Ref<V> = [() => V | null, (value: V) => void];

interface NodeViewContentProps {
    [key: string]: unknown;
    style?: JSX.CSSProperties;
    ref?: Ref<Element>;
    as?: string | Component<Record<string, unknown>>;
}
declare const NodeViewContent: Component<NodeViewContentProps>;

interface NodeViewWrapperProps {
    [key: string]: unknown;
    style?: JSX.CSSProperties;
    ref?: Ref<Element>;
    as?: string | Component<Record<string, unknown>>;
}
declare const NodeViewWrapper: Component<NodeViewWrapperProps>;

interface SolidNodeViewRendererOptions extends NodeViewRendererOptions {
    setSelection: ((anchor: number, head: number, root: Document | ShadowRoot) => void) | null;
    update: ((props: {
        oldNode: Node;
        oldDecorations: Decoration[];
        newNode: Node;
        newDecorations: Decoration[];
        updateProps: () => void;
    }) => boolean) | null;
}
declare const SolidNodeViewRenderer: (component: Component, options?: Partial<SolidNodeViewRendererOptions>) => NodeViewRenderer;

declare const useEditor: (options?: Partial<EditorOptions>) => (() => SolidEditor);

export { type Attrs, BubbleMenuWrapper, type BubbleMenuWrapperProps, FloatingMenuWrapper, type FloatingMenuWrapperProps, NodeViewContent, type NodeViewContentProps, NodeViewWrapper, type NodeViewWrapperProps, SolidEditor, SolidEditorContent, type SolidEditorContentProps, SolidNodeViewContext, type SolidNodeViewContextProps, type SolidNodeViewProps, SolidNodeViewRenderer, type SolidNodeViewRendererOptions, SolidRenderer, type SolidRendererOptions, useEditor, useSolidNodeView };

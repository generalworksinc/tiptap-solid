import { Dynamic } from "@solidjs/web";
import {
  type DecorationWithType,
  NodeView,
  type NodeViewRenderer,
  type NodeViewRendererOptions,
  type NodeViewRendererProps,
} from "@tiptap/core";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import type {
  Decoration,
  NodeView as ProseMirrorNodeView,
} from "@tiptap/pm/view";
import { type Component, createMemo } from "solid-js";
import type { SolidEditor } from "./editor";
import { SolidRenderer } from "./solid-renderer";
import {
  SolidNodeViewContext,
  type SolidNodeViewProps,
} from "./use-solid-node-view";

interface SolidNodeViewRendererOptions extends NodeViewRendererOptions {
  setSelection:
    | ((anchor: number, head: number, root: Document | ShadowRoot) => void)
    | null;
  update:
    | ((props: {
        oldNode: ProseMirrorNode;
        oldDecorations: Decoration[];
        newNode: ProseMirrorNode;
        newDecorations: Decoration[];
        updateProps: () => void;
      }) => boolean)
    | null;
}

type SetSelectionListener = (
  anchor: number,
  head: number,
  root: Document | ShadowRoot,
) => void;

class SolidNodeView extends NodeView<
  Component,
  SolidEditor,
  SolidNodeViewRendererOptions
> {
  public setSelectionListeners: SetSelectionListener[] = [];

  public declare contentDOMElement: HTMLElement | null;

  public declare renderer: SolidRenderer;

  public get dom(): HTMLElement {
    const portalContainer = this.renderer.element.firstElementChild;

    if (
      portalContainer &&
      !portalContainer.firstElementChild?.hasAttribute("data-node-view-wrapper")
    ) {
      throw new Error(
        "Please use the NodeViewWrapper component for your node view.",
      );
    }

    return this.renderer.element as HTMLElement;
  }

  public get contentDOM(): HTMLElement | null {
    if (this.node.isLeaf) {
      return null;
    }

    this.maybeMoveContentDOM();

    return this.contentDOMElement;
  }

  public mount(): void {
    const state: SolidNodeViewProps = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      selected: false,
      extension: this.extension,
      getPos: () => {
        const pos = this.getPos();
        if (pos === undefined) {
          throw new Error(
            "getPos returned undefined. Node view may be destroyed.",
          );
        }
        return pos;
      },
      updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
      deleteNode: () => this.deleteNode(),
    } as unknown as SolidNodeViewProps;
    const SolidNodeViewProvider: Component<{ state: SolidNodeViewProps }> = (
      props,
    ) => {
      const component = createMemo(() => this.component);
      const context = {
        state: createMemo(() => ({
          onDragStart: this.onDragStart.bind(this),
          ...props.state,
        })),
      };

      return (
        <SolidNodeViewContext value={context}>
          <Dynamic component={component()} />
        </SolidNodeViewContext>
      );
    };

    if (this.node.isLeaf) {
      this.contentDOMElement = null;
    } else {
      this.contentDOMElement = document.createElement(
        this.node.isInline ? "span" : "div",
      );
    }

    if (this.contentDOMElement) {
      this.contentDOMElement.style.whiteSpace = "inherit";
    }

    this.renderer = new SolidRenderer(SolidNodeViewProvider, {
      editor: this.editor,
      state,
      as: this.node.isInline ? "span" : "div",
    });
  }

  public maybeMoveContentDOM(): void {
    const contentElement = this.dom.querySelector("[data-node-view-content]");

    if (
      this.contentDOMElement &&
      contentElement &&
      !contentElement.contains(this.contentDOMElement)
    ) {
      contentElement.append(this.contentDOMElement);
    }
  }

  public update(
    node: ProseMirrorNode,
    decorations: DecorationWithType[],
  ): boolean {
    if (node.type !== this.node.type) {
      return false;
    }

    if (typeof this.options.update === "function") {
      const oldNode = this.node;
      const oldDecorations = this.decorations;

      this.node = node;
      this.decorations = decorations;

      return this.options.update({
        oldNode,
        oldDecorations: oldDecorations as Decoration[],
        newNode: node,
        newDecorations: decorations,
        updateProps: () => this.updateProps({ node, decorations }),
      });
    }

    if (node === this.node && this.decorations === decorations) {
      return true;
    }

    this.node = node;
    this.decorations = decorations;
    this.updateProps({ node, decorations });

    return true;
  }

  public setSelection(
    anchor: number,
    head: number,
    root: Document | ShadowRoot,
  ): void {
    this.options.setSelection?.(anchor, head, root);
  }

  public selectNode(): void {
    this.renderer.setState?.((state) => ({ ...state, selected: true }));
  }

  public deselectNode(): void {
    this.renderer.setState?.((state) => ({ ...state, selected: false }));
  }

  public destroy(): void {
    this.renderer.destroy();
    this.contentDOMElement = null;
  }

  private updateProps(props: Partial<SolidNodeViewProps>): void {
    this.renderer.setState?.((state) => ({ ...state, ...props }));
    this.maybeMoveContentDOM();
  }
}

const SolidNodeViewRenderer = (
  component: Component,
  options?: Partial<SolidNodeViewRendererOptions>,
): NodeViewRenderer => {
  return (props: NodeViewRendererProps) => {
    const { renderers, setRenderers } = props.editor as SolidEditor;

    if (!renderers || !setRenderers) {
      return {} as unknown as ProseMirrorNodeView;
    }

    return new SolidNodeView(
      component,
      props,
      options,
    ) as unknown as ProseMirrorNodeView;
  };
};

export { SolidNodeViewRenderer };
export type { SolidNodeViewRendererOptions };

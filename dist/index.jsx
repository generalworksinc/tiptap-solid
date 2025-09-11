// src/ref.ts
var createRef = () => {
  let ref = null;
  return [
    () => ref,
    (value) => {
      ref = value;
    }
  ];
};

// src/bubble-menu-wrapper.tsx
import {
  BubbleMenuPlugin
} from "@tiptap/extension-bubble-menu";
import { onMount } from "solid-js";
import { nanoid } from "nanoid";
import { offset } from "@floating-ui/dom";
var BubbleMenuWrapper = (props) => {
  const [getContainer, setContainer] = createRef();
  const pluginKey = nanoid();
  onMount(() => {
    const { editor, shouldShow, tippyOptions } = props;
    const container = getContainer();
    if (container) {
      const floatingUIOptions = tippyOptions ? {
        offset: tippyOptions.offset ? Array.isArray(tippyOptions.offset) ? tippyOptions.offset[1] || 6 : tippyOptions.offset : 6,
        placement: tippyOptions.placement || "top",
        middleware: tippyOptions.offset ? [offset(Array.isArray(tippyOptions.offset) ? tippyOptions.offset[1] || 6 : tippyOptions.offset)] : [offset(6)]
      } : {
        offset: 6,
        placement: "top"
      };
      editor.registerPlugin(
        BubbleMenuPlugin({
          editor,
          pluginKey,
          shouldShow: (props2) => {
            if (shouldShow) {
              return shouldShow(props2);
            }
            return false;
          },
          element: container,
          ...floatingUIOptions
        })
      );
    }
  });
  return <div
    ref={setContainer}
    class={props.class}
    style={{ visibility: "hidden" }}
  >
      {props.children}
    </div>;
};

// src/editor-content.tsx
import { For, createEffect, on, onCleanup, splitProps } from "solid-js";
import { Dynamic, Portal } from "solid-js/web";
var Portals = (props) => {
  return <For each={props.renderers}>
      {(renderer) => {
    return <Portal mount={renderer.element}>
            <Dynamic component={renderer.component} state={renderer.state()} />
          </Portal>;
  }}
    </For>;
};
var SolidEditorContent = (props) => {
  const [getEditorContentContainer, setEditorContentContainer] = createRef();
  const [, passedProps] = splitProps(props, ["editor"]);
  createEffect(
    on([() => props.editor], () => {
      const { editor } = props;
      if (editor && editor.options.element) {
        const editorContentContainer = getEditorContentContainer();
        if (editorContentContainer) {
          editorContentContainer.append(...editor.options.element.childNodes);
          editor.setOptions({
            element: editorContentContainer
          });
        }
        setTimeout(() => {
          if (!editor.isDestroyed) {
            editor.createNodeViews();
          }
        }, 0);
      }
    })
  );
  onCleanup(() => {
    const { editor } = props;
    if (!editor) {
      return;
    }
    if (!editor.isDestroyed) {
      editor.view.setProps({
        nodeViews: {}
      });
    }
    if (!editor.options.element.firstChild) {
      return;
    }
    const newElement = document.createElement("div");
    newElement.append(...editor.options.element.childNodes);
    editor.setOptions({
      element: newElement
    });
  });
  return <>
      <div {...passedProps} ref={setEditorContentContainer} />
      <Portals renderers={props.editor.renderers()} />
    </>;
};

// src/editor.ts
import { Editor } from "@tiptap/core";
import { createSignal } from "solid-js";
var SolidEditor = class extends Editor {
  constructor(options) {
    const [renderers, setRenderers] = createSignal([]);
    super(options);
    this.renderers = renderers;
    this.setRenderers = setRenderers;
  }
};

// src/floating-menu-wrapper.tsx
import { onMount as onMount2 } from "solid-js";
import { FloatingMenuPlugin } from "@tiptap/extension-floating-menu";
import { nanoid as nanoid2 } from "nanoid";
import { offset as offset2 } from "@floating-ui/dom";
var FloatingMenuWrapper = (props) => {
  const [getContainer, setContainer] = createRef();
  const pluginKey = nanoid2();
  onMount2(() => {
    const { editor, shouldShow, tippyOptions } = props;
    const container = getContainer();
    if (container) {
      const floatingUIOptions = tippyOptions ? {
        offset: tippyOptions.offset ? Array.isArray(tippyOptions.offset) ? tippyOptions.offset[1] || 6 : tippyOptions.offset : 6,
        placement: tippyOptions.placement || "top",
        middleware: tippyOptions.offset ? [offset2(Array.isArray(tippyOptions.offset) ? tippyOptions.offset[1] || 6 : tippyOptions.offset)] : [offset2(6)]
      } : {
        offset: 6,
        placement: "top"
      };
      editor.registerPlugin(
        FloatingMenuPlugin({
          editor,
          pluginKey,
          shouldShow: shouldShow || null,
          element: container,
          ...floatingUIOptions
        })
      );
    }
  });
  return <div ref={setContainer} class={props.class} style={{ visibility: "hidden" }}>
      {props.children}
    </div>;
};

// src/node-view-content.tsx
import { splitProps as splitProps2 } from "solid-js";
import { Dynamic as Dynamic2 } from "solid-js/web";
var NodeViewContent = (props) => {
  const [local, otherProps] = splitProps2(props, ["ref"]);
  return <Dynamic2
    {...otherProps}
    component={props.as || "div"}
    ref={local.ref ? local.ref[1] : null}
    data-node-view-content=""
    style={{
      ...props.style,
      whiteSpace: "pre-wrap"
    }}
  />;
};

// src/use-solid-node-view.tsx
import { createContext, useContext } from "solid-js";
var SolidNodeViewContext = createContext();
var useSolidNodeView = () => {
  return useContext(SolidNodeViewContext);
};

// src/node-view-wrapper.tsx
import { splitProps as splitProps3 } from "solid-js";
import { Dynamic as Dynamic3 } from "solid-js/web";
var NodeViewWrapper = (props) => {
  const { state } = useSolidNodeView();
  const [local, otherProps] = splitProps3(props, ["ref"]);
  return <Dynamic3
    {...otherProps}
    component={props.as || "div"}
    ref={local.ref ? local.ref[1] : null}
    data-node-view-wrapper="true"
    onDragStart={state().onDragStart}
    style={{
      ...props.style,
      whiteSpace: "normal"
    }}
  />;
};

// src/solid-renderer.tsx
import { createSignal as createSignal2 } from "solid-js";
import { nanoid as nanoid3 } from "nanoid";
var SolidRenderer = class {
  constructor(component, { editor, state: initialState, as = "div" }) {
    const [state, setState] = createSignal2(initialState);
    const element = document.createElement(as);
    this.setState = setState;
    this.state = state;
    this.element = element;
    this.component = component;
    this.id = nanoid3();
    this.editor = editor;
    this.editor.setRenderers([
      ...this.editor.renderers(),
      this
    ]);
  }
  destroy() {
    this.editor.setRenderers((renderers) => {
      return renderers.filter((renderer) => renderer.id !== this.id);
    });
  }
};

// src/solid-node-view-renderer.tsx
import {
  NodeView
} from "@tiptap/core";
import { createMemo } from "solid-js";
import { Dynamic as Dynamic4 } from "solid-js/web";
var SolidNodeView = class extends NodeView {
  setSelectionListeners = [];
  get dom() {
    const portalContainer = this.renderer.element.firstElementChild;
    if (portalContainer && !portalContainer.firstElementChild?.hasAttribute("data-node-view-wrapper")) {
      throw new Error(
        "Please use the NodeViewWrapper component for your node view."
      );
    }
    return this.renderer.element;
  }
  get contentDOM() {
    if (this.node.isLeaf) {
      return null;
    }
    this.maybeMoveContentDOM();
    return this.contentDOMElement;
  }
  mount() {
    const state = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      selected: false,
      extension: this.extension,
      getPos: () => {
        const pos = this.getPos();
        if (pos === void 0) {
          throw new Error("getPos returned undefined. Node view may be destroyed.");
        }
        return pos;
      },
      updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
      deleteNode: () => this.deleteNode()
    };
    const SolidNodeViewProvider = (props) => {
      const component = createMemo(() => this.component);
      const context = {
        state: createMemo(() => ({
          onDragStart: this.onDragStart.bind(this),
          ...props.state
        }))
      };
      return <SolidNodeViewContext.Provider value={context}>
          <Dynamic4 component={component()} />
        </SolidNodeViewContext.Provider>;
    };
    if (this.node.isLeaf) {
      this.contentDOMElement = null;
    } else {
      this.contentDOMElement = document.createElement(
        this.node.isInline ? "span" : "div"
      );
    }
    if (this.contentDOMElement) {
      this.contentDOMElement.style.whiteSpace = "inherit";
    }
    this.renderer = new SolidRenderer(SolidNodeViewProvider, {
      editor: this.editor,
      state,
      as: this.node.isInline ? "span" : "div"
    });
  }
  maybeMoveContentDOM() {
    const contentElement = this.dom.querySelector("[data-node-view-content]");
    if (this.contentDOMElement && contentElement && !contentElement.contains(this.contentDOMElement)) {
      contentElement.append(this.contentDOMElement);
    }
  }
  update(node, decorations) {
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
        oldDecorations,
        newNode: node,
        newDecorations: decorations,
        updateProps: () => this.updateProps({ node, decorations })
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
  setSelection(anchor, head, root) {
    this.options.setSelection?.(anchor, head, root);
  }
  selectNode() {
    this.renderer.setState?.((state) => ({ ...state, selected: true }));
  }
  deselectNode() {
    this.renderer.setState?.((state) => ({ ...state, selected: false }));
  }
  destroy() {
    this.renderer.destroy();
    this.contentDOMElement = null;
  }
  updateProps(props) {
    this.renderer.setState?.((state) => ({ ...state, ...props }));
    this.maybeMoveContentDOM();
  }
};
var SolidNodeViewRenderer = (component, options) => {
  return (props) => {
    const { renderers, setRenderers } = props.editor;
    if (!renderers || !setRenderers) {
      return {};
    }
    return new SolidNodeView(
      component,
      props,
      options
    );
  };
};

// src/use-editor.ts
import { createSignal as createSignal3, onCleanup as onCleanup2 } from "solid-js";
var useForceUpdate = () => {
  const [, setValue] = createSignal3(0);
  return () => setValue((value) => value + 1);
};
var useEditor = (options = {}) => {
  const [getEditor] = createSignal3(new SolidEditor(options));
  const forceUpdate = useForceUpdate();
  getEditor().on("transaction", forceUpdate);
  onCleanup2(() => {
    getEditor().destroy();
  });
  return getEditor;
};
export {
  BubbleMenuWrapper,
  FloatingMenuWrapper,
  NodeViewContent,
  NodeViewWrapper,
  SolidEditor,
  SolidEditorContent,
  SolidNodeViewContext,
  SolidNodeViewRenderer,
  SolidRenderer,
  useEditor,
  useSolidNodeView
};

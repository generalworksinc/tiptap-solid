import { template, use, insert, effect, className, createComponent, spread, Dynamic, mergeProps, Portal } from 'solid-js/web';
import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
import { createContext, onMount, splitProps, createEffect, on, onCleanup, createSignal, useContext, For, createMemo } from 'solid-js';
import { nanoid } from 'nanoid';
import { offset } from '@floating-ui/dom';
import { Editor, NodeView } from '@tiptap/core';
import { FloatingMenuPlugin } from '@tiptap/extension-floating-menu';

// src/bubble-menu-wrapper.tsx

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
var _tmpl$ = /* @__PURE__ */ template(`<div>`);
var BubbleMenuWrapper = (props) => {
  const [getContainer, setContainer] = createRef();
  const pluginKey = nanoid();
  onMount(() => {
    const {
      editor,
      shouldShow,
      tippyOptions
    } = props;
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
      editor.registerPlugin(BubbleMenuPlugin({
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
      }));
    }
  });
  return (() => {
    var _el$ = _tmpl$();
    use(setContainer, _el$);
    _el$.style.setProperty("visibility", "hidden");
    insert(_el$, () => props.children);
    effect(() => className(_el$, props.class));
    return _el$;
  })();
};
var _tmpl$2 = /* @__PURE__ */ template(`<div>`);
var Portals = (props) => {
  return createComponent(For, {
    get each() {
      return props.renderers;
    },
    children: (renderer) => {
      return createComponent(Portal, {
        get mount() {
          return renderer.element;
        },
        get children() {
          return createComponent(Dynamic, {
            get component() {
              return renderer.component;
            },
            get state() {
              return renderer.state();
            }
          });
        }
      });
    }
  });
};
var SolidEditorContent = (props) => {
  const [getEditorContentContainer, setEditorContentContainer] = createRef();
  const [, passedProps] = splitProps(props, ["editor"]);
  createEffect(on([() => props.editor], () => {
    const {
      editor
    } = props;
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
  }));
  onCleanup(() => {
    const {
      editor
    } = props;
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
  return [(() => {
    var _el$ = _tmpl$2();
    use(setEditorContentContainer, _el$);
    spread(_el$, passedProps, false, false);
    return _el$;
  })(), createComponent(Portals, {
    get renderers() {
      return props.editor.renderers();
    }
  })];
};
var SolidEditor = class extends Editor {
  constructor(options) {
    const [renderers, setRenderers] = createSignal([]);
    super(options);
    this.renderers = renderers;
    this.setRenderers = setRenderers;
  }
};
var _tmpl$3 = /* @__PURE__ */ template(`<div>`);
var FloatingMenuWrapper = (props) => {
  const [getContainer, setContainer] = createRef();
  const pluginKey = nanoid();
  onMount(() => {
    const {
      editor,
      shouldShow,
      tippyOptions
    } = props;
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
      editor.registerPlugin(FloatingMenuPlugin({
        editor,
        pluginKey,
        shouldShow: shouldShow || null,
        element: container,
        ...floatingUIOptions
      }));
    }
  });
  return (() => {
    var _el$ = _tmpl$3();
    use(setContainer, _el$);
    _el$.style.setProperty("visibility", "hidden");
    insert(_el$, () => props.children);
    effect(() => className(_el$, props.class));
    return _el$;
  })();
};
var NodeViewContent = (props) => {
  const [local, otherProps] = splitProps(props, ["ref"]);
  return createComponent(Dynamic, mergeProps(otherProps, {
    get component() {
      return props.as || "div";
    },
    "data-node-view-content": "",
    get style() {
      return {
        ...props.style,
        whiteSpace: "pre-wrap"
      };
    }
  }));
};
var SolidNodeViewContext = createContext();
var useSolidNodeView = () => {
  return useContext(SolidNodeViewContext);
};
var NodeViewWrapper = (props) => {
  const {
    state
  } = useSolidNodeView();
  const [local, otherProps] = splitProps(props, ["ref"]);
  return createComponent(Dynamic, mergeProps(otherProps, {
    get component() {
      return props.as || "div";
    },
    "data-node-view-wrapper": "true",
    get onDragStart() {
      return state().onDragStart;
    },
    get style() {
      return {
        ...props.style,
        whiteSpace: "normal"
      };
    }
  }));
};
var SolidRenderer = class {
  constructor(component, {
    editor,
    state: initialState,
    as = "div"
  }) {
    const [state, setState] = createSignal(initialState);
    const element = document.createElement(as);
    this.setState = setState;
    this.state = state;
    this.element = element;
    this.component = component;
    this.id = nanoid();
    this.editor = editor;
    this.editor.setRenderers([...this.editor.renderers(), this]);
  }
  destroy() {
    this.editor.setRenderers((renderers) => {
      return renderers.filter((renderer) => renderer.id !== this.id);
    });
  }
};
var SolidNodeView = class extends NodeView {
  setSelectionListeners = [];
  get dom() {
    const portalContainer = this.renderer.element.firstElementChild;
    if (portalContainer && !portalContainer.firstElementChild?.hasAttribute("data-node-view-wrapper")) {
      throw new Error("Please use the NodeViewWrapper component for your node view.");
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
      return createComponent(SolidNodeViewContext.Provider, {
        value: context,
        get children() {
          return createComponent(Dynamic, {
            get component() {
              return component();
            }
          });
        }
      });
    };
    if (this.node.isLeaf) {
      this.contentDOMElement = null;
    } else {
      this.contentDOMElement = document.createElement(this.node.isInline ? "span" : "div");
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
        updateProps: () => this.updateProps({
          node,
          decorations
        })
      });
    }
    if (node === this.node && this.decorations === decorations) {
      return true;
    }
    this.node = node;
    this.decorations = decorations;
    this.updateProps({
      node,
      decorations
    });
    return true;
  }
  setSelection(anchor, head, root) {
    this.options.setSelection?.(anchor, head, root);
  }
  selectNode() {
    this.renderer.setState?.((state) => ({
      ...state,
      selected: true
    }));
  }
  deselectNode() {
    this.renderer.setState?.((state) => ({
      ...state,
      selected: false
    }));
  }
  destroy() {
    this.renderer.destroy();
    this.contentDOMElement = null;
  }
  updateProps(props) {
    this.renderer.setState?.((state) => ({
      ...state,
      ...props
    }));
    this.maybeMoveContentDOM();
  }
};
var SolidNodeViewRenderer = (component, options) => {
  return (props) => {
    const {
      renderers,
      setRenderers
    } = props.editor;
    if (!renderers || !setRenderers) {
      return {};
    }
    return new SolidNodeView(component, props, options);
  };
};
var useForceUpdate = () => {
  const [, setValue] = createSignal(0);
  return () => setValue((value) => value + 1);
};
var useEditor = (options = {}) => {
  const [getEditor] = createSignal(new SolidEditor(options));
  const forceUpdate = useForceUpdate();
  getEditor().on("transaction", forceUpdate);
  onCleanup(() => {
    getEditor().destroy();
  });
  return getEditor;
};

export { BubbleMenuWrapper, FloatingMenuWrapper, NodeViewContent, NodeViewWrapper, SolidEditor, SolidEditorContent, SolidNodeViewContext, SolidNodeViewRenderer, SolidRenderer, useEditor, useSolidNodeView };

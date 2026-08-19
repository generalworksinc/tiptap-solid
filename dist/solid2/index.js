import { Dynamic as e, Portal as t, className as n, createComponent as r, effect as i, insert as a, mergeProps as o, ref as s, spread as c, template as l } from "@solidjs/web";
import { offset as u } from "@floating-ui/dom";
import { BubbleMenuPlugin as d } from "@tiptap/extension-bubble-menu";
import { nanoid as f } from "nanoid";
import { For as p, createContext as m, createEffect as h, createMemo as g, createSignal as _, omit as v, onSettled as y, useContext as b } from "solid-js";
import { Editor as x, NodeView as S } from "@tiptap/core";
import { FloatingMenuPlugin as C } from "@tiptap/extension-floating-menu";
//#region src2/ref.ts
var w = () => {
	let e = null;
	return [() => e, (t) => {
		e = t;
	}];
}, T = /* @__PURE__ */ l("<div style=visibility:hidden>"), E = (e) => {
	let [t, r] = w(), o = f();
	y(() => {
		let { editor: n, shouldShow: r, tippyOptions: i } = e, a = t();
		if (a) {
			let e = i ? {
				offset: i.offset ? Array.isArray(i.offset) ? i.offset[1] || 6 : i.offset : 6,
				placement: i.placement || "top",
				middleware: i.offset ? [u(Array.isArray(i.offset) ? i.offset[1] || 6 : i.offset)] : [u(6)]
			} : {
				offset: 6,
				placement: "top"
			};
			return n.registerPlugin(d({
				editor: n,
				pluginKey: o,
				shouldShow: (e) => r ? r(e) : !1,
				element: a,
				...e
			})), () => n.unregisterPlugin(o);
		}
	});
	var c = T();
	return s(() => r, c), a(c, () => e.children), i(() => e.class, (e, t) => {
		n(c, e, t);
	}), c;
}, D = class extends x {
	constructor(e) {
		let [t, n] = _([]);
		super(e), this.renderers = t, this.setRenderers = n;
	}
}, O = /* @__PURE__ */ l("<div>"), k = (n) => r(p, {
	get each() {
		return n.renderers;
	},
	children: (n) => r(t, {
		get mount() {
			return n.element;
		},
		get children() {
			return r(e, {
				get component() {
					return n.component;
				},
				get state() {
					return n.state();
				}
			});
		}
	})
}), A = (e) => {
	let [t, n] = w(), i = v(e, "editor");
	return h(() => e.editor, (e) => {
		if (e?.options.element instanceof Element) {
			let n = t();
			n && (n.append(...e.options.element.childNodes), e.setOptions({ element: n })), setTimeout(() => {
				e.isDestroyed || e.createNodeViews();
			}, 0);
		}
	}), y(() => {
		let t = e.editor;
		if (t) return () => {
			t.isDestroyed || t.view.setProps({ nodeViews: {} });
			let e = t.options.element;
			if (!(e instanceof Element) || !e.firstChild) return;
			let n = document.createElement("div");
			n.append(...e.childNodes), t.setOptions({ element: n });
		};
	}), [(() => {
		var e = O();
		return s(() => n, e), c(e, i, !1), e;
	})(), r(k, { get renderers() {
		return e.editor.renderers();
	} })];
}, j = /* @__PURE__ */ l("<div style=visibility:hidden>"), M = (e) => {
	let [t, r] = w(), o = f();
	y(() => {
		let { editor: n, shouldShow: r, tippyOptions: i } = e, a = t();
		if (a) {
			let e = i ? {
				offset: i.offset ? Array.isArray(i.offset) ? i.offset[1] || 6 : i.offset : 6,
				placement: i.placement || "top",
				middleware: i.offset ? [u(Array.isArray(i.offset) ? i.offset[1] || 6 : i.offset)] : [u(6)]
			} : {
				offset: 6,
				placement: "top"
			};
			return n.registerPlugin(C({
				editor: n,
				pluginKey: o,
				shouldShow: r || null,
				element: a,
				...e
			})), () => n.unregisterPlugin(o);
		}
	});
	var c = j();
	return s(() => r, c), a(c, () => e.children), i(() => e.class, (e, t) => {
		n(c, e, t);
	}), c;
}, N = (t) => {
	let n = v(t, "ref");
	return r(e, o(n, {
		get component() {
			return t.as || "div";
		},
		"data-node-view-content": "",
		get style() {
			return {
				...t.style,
				whiteSpace: "pre-wrap"
			};
		}
	}));
}, P = m(), F = () => b(P), I = (t) => {
	let { state: n } = F(), i = v(t, "ref");
	return r(e, o(i, {
		get component() {
			return t.as || "div";
		},
		"data-node-view-wrapper": "true",
		get onDragStart() {
			return n().onDragStart;
		},
		get style() {
			return {
				...t.style,
				whiteSpace: "normal"
			};
		}
	}));
}, L = class {
	constructor(e, { editor: t, state: n, as: r = "div" }) {
		let [i, a] = _(() => n), o = document.createElement(r);
		this.setState = a, this.state = i, this.element = o, this.component = e, this.id = f(), this.editor = t, this.editor.setRenderers((e) => [...e, this]);
	}
	destroy() {
		this.editor.setRenderers((e) => e.filter((e) => e.id !== this.id));
	}
}, R = class extends S {
	setSelectionListeners = [];
	get dom() {
		let e = this.renderer.element.firstElementChild;
		if (e && !e.firstElementChild?.hasAttribute("data-node-view-wrapper")) throw Error("Please use the NodeViewWrapper component for your node view.");
		return this.renderer.element;
	}
	get contentDOM() {
		return this.node.isLeaf ? null : (this.maybeMoveContentDOM(), this.contentDOMElement);
	}
	mount() {
		let t = {
			editor: this.editor,
			node: this.node,
			decorations: this.decorations,
			selected: !1,
			extension: this.extension,
			getPos: () => {
				let e = this.getPos();
				if (e === void 0) throw Error("getPos returned undefined. Node view may be destroyed.");
				return e;
			},
			updateAttributes: (e = {}) => this.updateAttributes(e),
			deleteNode: () => this.deleteNode()
		}, n = (t) => {
			let n = g(() => this.component), i = { state: g(() => ({
				onDragStart: this.onDragStart.bind(this),
				...t.state
			})) };
			return r(P, {
				value: i,
				get children() {
					return r(e, { get component() {
						return n();
					} });
				}
			});
		};
		this.contentDOMElement = this.node.isLeaf ? null : document.createElement(this.node.isInline ? "span" : "div"), this.contentDOMElement && (this.contentDOMElement.style.whiteSpace = "inherit"), this.renderer = new L(n, {
			editor: this.editor,
			state: t,
			as: this.node.isInline ? "span" : "div"
		});
	}
	maybeMoveContentDOM() {
		let e = this.dom.querySelector("[data-node-view-content]");
		this.contentDOMElement && e && !e.contains(this.contentDOMElement) && e.append(this.contentDOMElement);
	}
	update(e, t) {
		if (e.type !== this.node.type) return !1;
		if (typeof this.options.update == "function") {
			let n = this.node, r = this.decorations;
			return this.node = e, this.decorations = t, this.options.update({
				oldNode: n,
				oldDecorations: r,
				newNode: e,
				newDecorations: t,
				updateProps: () => this.updateProps({
					node: e,
					decorations: t
				})
			});
		}
		return e === this.node && this.decorations === t || (this.node = e, this.decorations = t, this.updateProps({
			node: e,
			decorations: t
		}), !0);
	}
	setSelection(e, t, n) {
		this.options.setSelection?.(e, t, n);
	}
	selectNode() {
		this.renderer.setState?.((e) => ({
			...e,
			selected: !0
		}));
	}
	deselectNode() {
		this.renderer.setState?.((e) => ({
			...e,
			selected: !1
		}));
	}
	destroy() {
		this.renderer.destroy(), this.contentDOMElement = null;
	}
	updateProps(e) {
		this.renderer.setState?.((t) => ({
			...t,
			...e
		})), this.maybeMoveContentDOM();
	}
}, z = (e, t) => (n) => {
	let { renderers: r, setRenderers: i } = n.editor;
	return !r || !i ? {} : new R(e, n, t);
}, B = (e = {}) => {
	let t = new D(e), [n, r] = _(0), i = () => (n(), t), a = () => r((e) => e + 1);
	return t.on("transaction", a), y(() => () => {
		t.off("transaction", a), t.destroy();
	}), i;
};
//#endregion
export { E as BubbleMenuWrapper, M as FloatingMenuWrapper, N as NodeViewContent, I as NodeViewWrapper, D as SolidEditor, A as SolidEditorContent, P as SolidNodeViewContext, z as SolidNodeViewRenderer, L as SolidRenderer, B as useEditor, F as useSolidNodeView };

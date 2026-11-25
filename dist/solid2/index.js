import { Dynamic as e, Portal as t, className as n, createComponent as r, effect as i, insert as a, mergeProps as o, readShallow as s, ref as c, spread as l, template as u } from "@solidjs/web";
import { offset as d } from "@floating-ui/dom";
import { BubbleMenuPlugin as f } from "@tiptap/extension-bubble-menu";
import { nanoid as p } from "nanoid";
import { For as m, createContext as h, createEffect as g, createMemo as _, createSignal as v, omit as y, onSettled as b, useContext as x } from "solid-js";
import { Editor as S, NodeView as C } from "@tiptap/core";
import { FloatingMenuPlugin as w } from "@tiptap/extension-floating-menu";
// src2/ref.ts
var T = () => {
	let e = null;
	return [() => e, (t) => {
		e = t;
	}];
}, E = /* @__PURE__ */ u("<div style=visibility:hidden>"), D = (e) => {
	let [t, r] = T(), o = p();
	b(() => {
		let { editor: n, shouldShow: r, tippyOptions: i } = e, a = t();
		if (a) {
			let e = i ? {
				offset: i.offset ? Array.isArray(i.offset) ? i.offset[1] || 6 : i.offset : 6,
				placement: i.placement || "top",
				middleware: i.offset ? [d(Array.isArray(i.offset) ? i.offset[1] || 6 : i.offset)] : [d(6)]
			} : {
				offset: 6,
				placement: "top"
			};
			return n.registerPlugin(f({
				editor: n,
				pluginKey: o,
				shouldShow: (e) => r ? r(e) : !1,
				element: a,
				...e
			})), () => n.unregisterPlugin(o);
		}
	});
	var l = E();
	return c(() => r, l), a(l, () => e.children), i(() => s(e.class), (e, t) => {
		n(l, e, t);
	}), l;
}, O = class extends S {
	constructor(e) {
		let [t, n] = v([]);
		super(e), this.renderers = t, this.setRenderers = n;
	}
}, k = /* @__PURE__ */ u("<div>"), A = (n) => r(m, {
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
}), j = (e) => {
	let [t, n] = T(), i = y(e, "editor");
	return g(() => e.editor, (e) => {
		if (e?.options.element instanceof Element) {
			let n = t();
			n && (n.append(...e.options.element.childNodes), e.setOptions({ element: n })), setTimeout(() => {
				e.isDestroyed || e.createNodeViews();
			}, 0);
		}
	}), b(() => {
		let t = e.editor;
		if (t) return () => {
			t.isDestroyed || t.view.setProps({ nodeViews: {} });
			let e = t.options.element;
			if (!(e instanceof Element) || !e.firstChild) return;
			let n = document.createElement("div");
			n.append(...e.childNodes), t.setOptions({ element: n });
		};
	}), [(() => {
		var e = k();
		return l(e, i, !1), c(() => n, e), e;
	})(), r(A, { get renderers() {
		return e.editor.renderers();
	} })];
}, M = /* @__PURE__ */ u("<div style=visibility:hidden>"), N = (e) => {
	let [t, r] = T(), o = p();
	b(() => {
		let { editor: n, shouldShow: r, tippyOptions: i } = e, a = t();
		if (a) {
			let e = i ? {
				offset: i.offset ? Array.isArray(i.offset) ? i.offset[1] || 6 : i.offset : 6,
				placement: i.placement || "top",
				middleware: i.offset ? [d(Array.isArray(i.offset) ? i.offset[1] || 6 : i.offset)] : [d(6)]
			} : {
				offset: 6,
				placement: "top"
			};
			return n.registerPlugin(w({
				editor: n,
				pluginKey: o,
				shouldShow: r || null,
				element: a,
				...e
			})), () => n.unregisterPlugin(o);
		}
	});
	var l = M();
	return c(() => r, l), a(l, () => e.children), i(() => s(e.class), (e, t) => {
		n(l, e, t);
	}), l;
}, P = (t) => {
	let n = y(t, "ref");
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
}, F = h(), I = () => x(F), L = (t) => {
	let { state: n } = I(), i = y(t, "ref");
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
}, R = class {
	constructor(e, { editor: t, state: n, as: r = "div" }) {
		let [i, a] = v(() => n), o = document.createElement(r);
		this.setState = a, this.state = i, this.element = o, this.component = e, this.id = p(), this.editor = t, this.editor.setRenderers((e) => [...e, this]);
	}
	destroy() {
		this.editor.setRenderers((e) => e.filter((e) => e.id !== this.id));
	}
}, z = class extends C {
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
			let n = _(() => this.component), i = { state: _(() => ({
				onDragStart: this.onDragStart.bind(this),
				...t.state
			})) };
			return r(F, {
				value: i,
				get children() {
					return r(e, { get component() {
						return n();
					} });
				}
			});
		};
		this.contentDOMElement = this.node.isLeaf ? null : document.createElement(this.node.isInline ? "span" : "div"), this.contentDOMElement && (this.contentDOMElement.style.whiteSpace = "inherit"), this.renderer = new R(n, {
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
		})), !0;
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
}, B = (e, t) => (n) => {
	let { renderers: r, setRenderers: i } = n.editor;
	return !r || !i ? {} : new z(e, n, t);
}, V = (e = {}) => {
	let t = new O(e), [n, r] = v(0), i = () => (n(), t), a = () => r((e) => e + 1);
	return t.on("transaction", a), b(() => () => {
		t.off("transaction", a), t.destroy();
	}), i;
};
export { D as BubbleMenuWrapper, N as FloatingMenuWrapper, P as NodeViewContent, L as NodeViewWrapper, O as SolidEditor, j as SolidEditorContent, F as SolidNodeViewContext, B as SolidNodeViewRenderer, R as SolidRenderer, V as useEditor, I as useSolidNodeView };

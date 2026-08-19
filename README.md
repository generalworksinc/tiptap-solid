# TipTap-Solid

TipTap integration with Solid.js.

Solid 1 applications use the existing package root. Solid 2 applications use
the dedicated entry, which exposes the same public API without changing the
Solid 1 build:

```ts
import { SolidEditorContent, useEditor } from "@generalworks/tiptap-solid/solid2";
```

## Repository Information

**Original Repository**: [vriteio/tiptap-solid](https://github.com/vriteio/tiptap-solid)  
**This Fork**: [project-opus/tiptap-solid](https://github.com/project-opus/tiptap-solid)

This project is a fork of the original [vriteio/tiptap-solid](https://github.com/vriteio/tiptap-solid) repository, with additional enhancements and maintenance. The original project provides TipTap integration for Solid.js, and this fork extends it with the following adjustments:

- Updated to latest TipTap v3 version
- Migrated from Tippy.js to Floating UI for menu positioning
- Switched rollup to tsup which uses esbuild backend
- Switched to npm as the main package manager

## Installation

Make sure to have peer-dependencies (`solid-js`, `@tiptap/core` and `@tiptap/pm`) already installed.

```
npm i https://github.com/project-opus/tiptap-solid
```

## Getting started

The integration is based on the official `@tiptap/react` package, that's [documented in the TipTap docs](https://tiptap.dev/installation/react), with several changes necessary to adapt it to Solid.js.

Here are some examples of common use-cases:

### Creating the editor

```javascript
import { SolidEditorContent, useEditor } from "@generalworks/tiptap-solid";

// ...
const editor = useEditor({
  extensions: [
    // ...
  ],
  // ...
});

// Rendering
<SolidEditorContent editor={editor()} />;
```

### Creating Solid-based Node Views

```javascript
import { SolidNodeViewRenderer } from "@generalworks/tiptap-solid";

const CustomNode = Node.create({
  // ...
  addNodeView() {
    return SolidNodeViewRenderer(CustomNodeView);
  },
  // ...
});
```

In the `CustomNodeView` component, you can access the Node's state, including attributes, options, etc.

```javascript
import { NodeViewWrapper, useSolidNodeView } from "@generalworks/tiptap-solid";

const CustomNodeView = () => {
  const { state } = useSolidNodeView();
  const updateAttribute = (key, value) => {
    state().updateAttributes({ [key]: value });
  };
  const options = () => state().extension.options;
  const selected = () => {
    return state().selected;
  };
  const attrs = () => {
    return state().node.attrs;
  };

  return <NodeViewWrapper>{/* Your Node View*/}</NodeViewWrapper>;
};
```

### Creating Bubble Menu

```javascript
// Rendering
<BubbleMenuWrapper
  editor={editor()}
  offset={6}
  placement="top"
  shouldShow={({ editor, state, view, from, to }) => {
    // ...
  }}
>
  {/* Your menu */}
</BubbleMenuWrapper>
```

### Creating Floating Menu

```javascript
// Rendering
<FloatingMenuWrapper
  editor={editor()}
  offset={6}
  placement="top"
  shouldShow={({ editor, state, view }) => {
    // ...
  }}
>
  {/* Your menu */}
</FloatingMenuWrapper>
```

Note: In TipTap v3, we've migrated from Tippy.js to Floating UI. The `tippyOptions` prop is automatically converted to Floating UI options for backward compatibility.

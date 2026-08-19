import { Dynamic, type JSX, Portal } from "@solidjs/web";
import { type Component, createEffect, For, omit, onSettled } from "solid-js";
import type { SolidEditor } from "./editor";
import { createRef } from "./ref";
import type { SolidRenderer } from "./solid-renderer";

interface PortalsProps {
  renderers: SolidRenderer[];
}

const Portals: Component<PortalsProps> = (props) => {
  return (
    <For each={props.renderers}>
      {(renderer) => {
        return (
          <Portal mount={renderer.element}>
            <Dynamic component={renderer.component} state={renderer.state()} />
          </Portal>
        );
      }}
    </For>
  );
};

interface SolidEditorContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  editor: SolidEditor;
}

const SolidEditorContent: Component<SolidEditorContentProps> = (props) => {
  const [getEditorContentContainer, setEditorContentContainer] =
    createRef<HTMLElement>();
  const passedProps = omit(props, "editor");

  createEffect(
    () => props.editor,
    (editor) => {
      if (editor?.options.element instanceof Element) {
        const editorContentContainer = getEditorContentContainer();

        if (editorContentContainer) {
          editorContentContainer.append(...editor.options.element.childNodes);
          editor.setOptions({
            element: editorContentContainer,
          });
        }

        setTimeout(() => {
          if (!editor.isDestroyed) {
            editor.createNodeViews();
          }
        }, 0);
      }
    },
  );
  onSettled(() => {
    const editor = props.editor;

    if (!editor) {
      return undefined;
    }

    return () => {
      if (!editor.isDestroyed) {
        editor.view.setProps({
          nodeViews: {},
        });
      }

      const editorElement = editor.options.element;

      if (!(editorElement instanceof Element) || !editorElement.firstChild) {
        return;
      }

      const newElement = document.createElement("div");

      newElement.append(...editorElement.childNodes);
      editor.setOptions({
        element: newElement,
      });
    };
  });

  return (
    <>
      <div {...passedProps} ref={setEditorContentContainer} />
      <Portals renderers={props.editor.renderers()} />
    </>
  );
};

export { SolidEditorContent };
export type { SolidEditorContentProps };

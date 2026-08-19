import {
  type Component,
  createEffect,
  For,
  type JSX,
  on,
  onCleanup,
  splitProps,
} from "solid-js";
import { Dynamic, Portal } from "solid-js/web";
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
  const [, passedProps] = splitProps(props, ["editor"]);

  createEffect(
    on([() => props.editor], () => {
      const { editor } = props;

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
    }),
  );
  onCleanup(() => {
    const { editor } = props;

    if (!editor) {
      return;
    }

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

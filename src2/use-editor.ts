import type { EditorOptions } from "@tiptap/core";
import { createSignal, onSettled } from "solid-js";
import { SolidEditor } from "./editor";

const useEditor = (
  options: Partial<EditorOptions> = {},
): (() => SolidEditor) => {
  const editor = new SolidEditor(options);
  const [revision, setRevision] = createSignal(0);
  const getEditor = () => {
    revision();
    return editor;
  };
  const forceUpdate = () => setRevision((value) => value + 1);

  editor.on("transaction", forceUpdate);
  onSettled(() => () => {
    editor.off("transaction", forceUpdate);
    editor.destroy();
  });

  return getEditor;
};

export { useEditor };

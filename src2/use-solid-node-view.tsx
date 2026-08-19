import type { NodeViewProps } from "@tiptap/core";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import {
  type Accessor,
  type Context,
  createContext,
  useContext,
} from "solid-js";
import type { SolidEditor } from "./editor";

type Attrs = Record<string, unknown>;

interface SolidNodeViewProps<A extends Attrs = Attrs> extends NodeViewProps {
  node: ProseMirrorNode & { attrs: A };
  editor: SolidEditor;
}
interface SolidNodeViewContextProps<A extends Attrs = Attrs> {
  state: Accessor<
    SolidNodeViewProps<A> & {
      onDragStart?(event: DragEvent): void;
    }
  >;
}

const SolidNodeViewContext = createContext();
const useSolidNodeView = <
  A extends Attrs = Attrs,
>(): SolidNodeViewContextProps<A> => {
  return useContext(
    SolidNodeViewContext as Context<SolidNodeViewContextProps<A>>,
  );
};

export { SolidNodeViewContext, useSolidNodeView };
export type { SolidNodeViewContextProps, SolidNodeViewProps, Attrs };

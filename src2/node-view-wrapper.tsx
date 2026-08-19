import { Dynamic, type JSX } from "@solidjs/web";
import { type Component, omit } from "solid-js";
import type { Ref } from "./ref";
import {
  type Attrs,
  type SolidNodeViewContextProps,
  useSolidNodeView,
} from "./use-solid-node-view";

interface NodeViewWrapperProps {
  [key: string]: unknown;
  style?: JSX.CSSProperties;
  ref?: Ref<Element>;
  as?: string | Component<Record<string, unknown>>;
}

const NodeViewWrapper: Component<NodeViewWrapperProps> = (props) => {
  const { state } = useSolidNodeView() as SolidNodeViewContextProps<Attrs>;
  const otherProps = omit(props, "ref");

  return (
    <Dynamic
      {...otherProps}
      component={props.as || "div"}
      ref={props.ref ? props.ref[1] : null}
      data-node-view-wrapper="true"
      onDragStart={state().onDragStart}
      style={{
        ...props.style,
        whiteSpace: "normal",
      }}
    />
  );
};

export { NodeViewWrapper };
export type { NodeViewWrapperProps };

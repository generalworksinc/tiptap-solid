import { Dynamic, type JSX } from "@solidjs/web";
import { type Component, omit } from "solid-js";
import type { Ref } from "./ref";

interface NodeViewContentProps {
  [key: string]: unknown;
  style?: JSX.CSSProperties;
  ref?: Ref<Element>;
  as?: string | Component<Record<string, unknown>>;
}

const NodeViewContent: Component<NodeViewContentProps> = (props) => {
  const otherProps = omit(props, "ref");

  return (
    <Dynamic
      {...otherProps}
      component={props.as || "div"}
      ref={props.ref ? props.ref[1] : null}
      data-node-view-content=""
      style={{
        ...props.style,
        whiteSpace: "pre-wrap",
      }}
    />
  );
};

export { NodeViewContent };
export type { NodeViewContentProps };

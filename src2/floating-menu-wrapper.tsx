import { offset } from "@floating-ui/dom";
import type { JSX } from "@solidjs/web";
import {
  FloatingMenuPlugin,
  type FloatingMenuPluginProps,
} from "@tiptap/extension-floating-menu";
import { nanoid } from "nanoid";
import { type Component, onSettled } from "solid-js";
import { createRef } from "./ref";

type FloatingMenuWrapperProps = Omit<
  FloatingMenuPluginProps,
  "element" | "pluginKey" | "shouldShow"
> & {
  class?: string;
  shouldShow?: FloatingMenuPluginProps["shouldShow"];
  children?: JSX.Element;
  // Backward compatibility for tippyOptions
  tippyOptions?: {
    offset?: number | [number, number];
    placement?: string;
    [key: string]: unknown;
  };
};

const FloatingMenuWrapper: Component<FloatingMenuWrapperProps> = (props) => {
  const [getContainer, setContainer] = createRef<HTMLDivElement>();
  const pluginKey = nanoid();

  onSettled(() => {
    const { editor, shouldShow, tippyOptions } = props;
    const container = getContainer();

    if (container) {
      // Convert tippyOptions to Floating UI options for v3 compatibility
      const floatingUIOptions = tippyOptions
        ? {
            offset: tippyOptions.offset
              ? Array.isArray(tippyOptions.offset)
                ? tippyOptions.offset[1] || 6
                : tippyOptions.offset
              : 6,
            placement: tippyOptions.placement || "top",
            middleware: tippyOptions.offset
              ? [
                  offset(
                    Array.isArray(tippyOptions.offset)
                      ? tippyOptions.offset[1] || 6
                      : tippyOptions.offset,
                  ),
                ]
              : [offset(6)],
          }
        : {
            offset: 6,
            placement: "top",
          };

      editor.registerPlugin(
        FloatingMenuPlugin({
          editor,
          pluginKey,
          shouldShow: shouldShow || null,
          element: container,
          ...floatingUIOptions,
        }),
      );

      return () => editor.unregisterPlugin(pluginKey);
    }

    return undefined;
  });

  return (
    <div
      ref={setContainer}
      class={props.class}
      style={{ visibility: "hidden" }}
    >
      {props.children}
    </div>
  );
};

export { FloatingMenuWrapper };
export type { FloatingMenuWrapperProps };

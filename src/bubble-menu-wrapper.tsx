import { createRef } from "./ref";
import {
  BubbleMenuPlugin,
  BubbleMenuPluginProps,
} from "@tiptap/extension-bubble-menu";
import { Component, JSX, onMount } from "solid-js";
import { nanoid } from "nanoid";
import { offset } from "@floating-ui/dom";

type BubbleMenuWrapperProps = Omit<
  BubbleMenuPluginProps,
  "element" | "pluginKey" | "shouldShow"
> & {
  class?: string;
  children?: JSX.Element;
  shouldShow?: BubbleMenuPluginProps["shouldShow"];
  // Backward compatibility for tippyOptions
  tippyOptions?: {
    offset?: number | [number, number];
    placement?: string;
    [key: string]: any;
  };
};

const BubbleMenuWrapper: Component<BubbleMenuWrapperProps> = (props) => {
  const [getContainer, setContainer] = createRef<HTMLDivElement>();
  const pluginKey = nanoid();

  onMount(() => {
    const { editor, shouldShow, tippyOptions } = props;
    const container = getContainer();

    if (container) {
      // Convert tippyOptions to Floating UI options for v3 compatibility
      const floatingUIOptions = tippyOptions ? {
        offset: tippyOptions.offset ? (Array.isArray(tippyOptions.offset) ? tippyOptions.offset[1] || 6 : tippyOptions.offset) : 6,
        placement: tippyOptions.placement || 'top',
        middleware: tippyOptions.offset ? [offset(Array.isArray(tippyOptions.offset) ? tippyOptions.offset[1] || 6 : tippyOptions.offset)] : [offset(6)],
      } : {
        offset: 6,
        placement: 'top',
      };

      editor.registerPlugin(
        BubbleMenuPlugin({
          editor,
          pluginKey,
          shouldShow: (props) => {
            if (shouldShow) {
              return shouldShow(props);
            }

            return false;
          },
          element: container,
          ...floatingUIOptions,
        })
      );
    }
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

export { BubbleMenuWrapper };
export type { BubbleMenuWrapperProps };

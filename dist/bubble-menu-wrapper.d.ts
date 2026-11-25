import { JSX } from '@solidjs/web';
import { BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';
import { Component } from 'solid-js';
type BubbleMenuWrapperProps = Omit<BubbleMenuPluginProps, "element" | "pluginKey" | "shouldShow"> & {
    class?: string;
    children?: JSX.Element;
    shouldShow?: BubbleMenuPluginProps["shouldShow"];
    tippyOptions?: {
        offset?: number | [number, number];
        placement?: string;
        [key: string]: unknown;
    };
};
declare const BubbleMenuWrapper: Component<BubbleMenuWrapperProps>;
export { BubbleMenuWrapper };
export type { BubbleMenuWrapperProps };

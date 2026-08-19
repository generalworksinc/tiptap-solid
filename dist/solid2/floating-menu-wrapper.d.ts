import { JSX } from '@solidjs/web';
import { FloatingMenuPluginProps } from '@tiptap/extension-floating-menu';
import { Component } from 'solid-js';
type FloatingMenuWrapperProps = Omit<FloatingMenuPluginProps, "element" | "pluginKey" | "shouldShow"> & {
    class?: string;
    shouldShow?: FloatingMenuPluginProps["shouldShow"];
    children?: JSX.Element;
    tippyOptions?: {
        offset?: number | [number, number];
        placement?: string;
        [key: string]: unknown;
    };
};
declare const FloatingMenuWrapper: Component<FloatingMenuWrapperProps>;
export { FloatingMenuWrapper };
export type { FloatingMenuWrapperProps };

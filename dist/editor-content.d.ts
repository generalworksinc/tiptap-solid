import { JSX } from '@solidjs/web';
import { Component } from 'solid-js';
import { SolidEditor } from './editor';
interface SolidEditorContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
    editor: SolidEditor;
}
declare const SolidEditorContent: Component<SolidEditorContentProps>;
export { SolidEditorContent };
export type { SolidEditorContentProps };

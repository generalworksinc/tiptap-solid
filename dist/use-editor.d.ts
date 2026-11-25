import { EditorOptions } from '@tiptap/core';
import { SolidEditor } from './editor';
declare const useEditor: (options?: Partial<EditorOptions>) => (() => SolidEditor);
export { useEditor };

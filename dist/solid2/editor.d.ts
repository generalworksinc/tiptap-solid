import { Editor, EditorOptions } from '@tiptap/core';
import { Accessor, Setter } from 'solid-js';
import { SolidRenderer } from './solid-renderer';
declare class SolidEditor extends Editor {
    renderers: Accessor<SolidRenderer[]>;
    setRenderers: Setter<SolidRenderer[]>;
    constructor(options?: Partial<EditorOptions>);
}
export { SolidEditor };

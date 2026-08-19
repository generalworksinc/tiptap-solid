import { Accessor, Component, Setter } from 'solid-js';
import { SolidEditor } from './editor';
import { SolidNodeViewProps } from './use-solid-node-view';
interface SolidRendererOptions<S = SolidNodeViewProps> {
    editor: SolidEditor;
    state: S;
    as?: string;
}
declare class SolidRenderer<S = SolidNodeViewProps> {
    state: Accessor<S>;
    setState: Setter<S>;
    id: string;
    element: Element;
    component: Component<{
        state: S;
    }>;
    private editor;
    constructor(component: Component<{
        state: S;
    }>, { editor, state: initialState, as }: SolidRendererOptions<S>);
    destroy(): void;
}
export { SolidRenderer };
export type { SolidRendererOptions };

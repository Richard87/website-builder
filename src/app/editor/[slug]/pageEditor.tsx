'use client'
import {Page, savePage} from "@/store";
import {useCreateEditor} from "@/components/editor/use-create-editor";
import {Plate, useEditorRef} from "@udecode/plate-common/react";
import {Editor, EditorContainer} from "@/components/plate-ui/editor";
import {Value} from "@udecode/plate";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {FixedToolbar} from "@/components/plate-ui/fixed-toolbar";
import {FixedToolbarButtons} from "@/components/plate-ui/fixed-toolbar-buttons";
import {FloatingToolbar} from "@/components/plate-ui/floating-toolbar";
import {FloatingToolbarButtons} from "@/components/plate-ui/floating-toolbar-buttons";
import { ToolbarButton } from "@/components/plate-ui/toolbar";

type Props = {
    page: Page
    content: Value|null
}

export function PageEditor({page, content}: Props) {
    const editor = useCreateEditor(content || `<h1>${page.title}</h1><p>Content</p>`);
    return(
        <div className="h-screen w-full" data-registry="plate">
            <DndProvider backend={HTML5Backend}>
            <Plate editor={editor}>

                <FixedToolbar>
                    <SaveButton pageId={page.id}  />
                    <FixedToolbarButtons/>
                </FixedToolbar>

                <EditorContainer id="scroll_container" variant="demo">
                    <Editor variant="demo" placeholder="Type..." />
                </EditorContainer>


                <FloatingToolbar>
                    <FloatingToolbarButtons />
                </FloatingToolbar>
            </Plate>
            </DndProvider>
        </div>)
}

const SaveButton= ({pageId}: {pageId: string}) => {
    const editor = useEditorRef();
    return <ToolbarButton onClick={() => savePage(pageId, JSON.stringify(editor.children)).then(console.log)}>Save</ToolbarButton>
}

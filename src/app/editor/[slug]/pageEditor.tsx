'use client'
import {Page, savePage} from "@/store";
import {StarterKit} from "@tiptap/starter-kit";
import {JSONContent} from "@tiptap/react";
import {
    MenuButtonBold,
    MenuButtonItalic,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
    RichTextEditor,
    type RichTextEditorRef,
} from "mui-tiptap";
import {useRef} from "react";
import Button from "@mui/material/Button";;
import Box from "@mui/material/Box";

type Props = {
    nav: Page[]
    page: Page
    content: JSONContent|null
}

export function PageEditor({page, content, nav}: Props) {
    const rteRef = useRef<RichTextEditorRef>(null);
    const onSave = async () => {
        await savePage(page.id, JSON.stringify(rteRef.current?.editor?.getJSON()))
    }

    return(
            <RichTextEditor
                className="mui-editor"
                immediatelyRender={false}
                ref={rteRef}
                extensions={[StarterKit]} // Or any Tiptap extensions you wish!
                content={content ??  `<p>${page.text}</p>`} // Initial content for the editor
                // Optionally include `renderControls` for a menu-bar atop the editor:
                renderControls={() => (
                    <MenuControlsContainer>
                        <MenuSelectHeading />
                        <MenuDivider />
                        <MenuButtonBold />
                        <MenuButtonItalic />
                        <MenuDivider />
                        <Button onClick={onSave}>Save</Button>

                        {/* Add more controls of your choosing here */}
                    </MenuControlsContainer>
                )}
            />
    )
}

'use client'
import {Page, savePage} from "@/store";
import {StarterKit} from "@tiptap/starter-kit";
import {JSONContent, useEditor} from "@tiptap/react";
import { RichTextEditorProvider } from "mui-tiptap";
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
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {MenuButton} from "@mui/base";
import Box from "@mui/material/Box";
import {Menu} from "@/menu";

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
        <Menu nav={nav} currentPageId={page.id} currentPageTitle={page.text}>
        <Box>
            <RichTextEditor
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
        </Box>
        </Menu>
    )
}

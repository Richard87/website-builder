'use client'
import type {Page} from "@/store";
import type {JSONContent} from "@tiptap/react";
import {Editor} from "@/app/editor/editor";

type Props = {
    nav: Page[]
    page: Page
    content: JSONContent|null
}

export function PageEditor({page, content}: Props) {
    return(<Editor pageId={page.id} content={content ??  `<p>${page.text}</p>`}/>)
}

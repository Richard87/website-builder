'use client'
import {Page, savePage} from "@/store";

type Props = {
    page: Page
    content?: unknown
}

export function PageEditor({page, content}: Props) {

    console.log(content)

    return <>
        <h1>{page.title}</h1>
        <p>{page.url}</p>

        <button onClick={() => savePage(page.id, page.title, content).then(console.log)}>Save</button>

    </>
}

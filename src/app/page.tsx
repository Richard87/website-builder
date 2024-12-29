import {ReadOnlyEditor} from "@/app/editor/editor";
import {Menu} from "@/app/menu";
import {NotFound} from "@/app/notFound";
import {loadNavigation, loadPage} from "@/store";
import React from "react";

export default async function Home() {
    const nav = await loadNavigation()
    if (!nav) throw new Error("could not find navigation")

    const page = nav[0];

    if (!page) {
        return <Menu nav={nav}><NotFound /></Menu>
    }

    const blob = await loadPage(page?.id)

    if (!blob) {
        return <Menu nav={nav} currentPageId={page.id} currentPageTitle={page.text}><NotFound/></Menu>
    }

    return (
        <Menu nav={nav} currentPageId={page.id} currentPageTitle={page.text}>
            <ReadOnlyEditor pageId={page.id} content={blob} />
        </Menu>
    );
}

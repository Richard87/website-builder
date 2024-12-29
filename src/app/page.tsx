import {ReadOnlyEditor} from "@/app/editor/editor";
import {NotFound} from "@/app/notFound";
import {Menu} from "@/menu";
import {loadConfig, loadPage} from "@/store";
import React from "react";

export default async function Home() {
    const config = await loadConfig()
    if (!config) throw new Error("could not find navigation")

    const page = config.nav[0];

    if (!page) {
        return <Menu nav={config.nav}><NotFound /></Menu>
    }

    const blob = await loadPage(page?.id)

    if (!blob) {
        return <Menu nav={config.nav} currentPageId={page.id} currentPageTitle={page.text}><NotFound/></Menu>
    }

    return (
        <Menu nav={config.nav} currentPageId={page.id} currentPageTitle={page.text}>
            <ReadOnlyEditor pageId={page.id} content={blob} />
        </Menu>
    );
}

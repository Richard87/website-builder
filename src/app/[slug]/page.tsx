import {NotFound} from "@/app/notFound";
import {Menu} from "@/menu";
import {ReadOnlyEditor} from "@/readonly-editor";
import {loadConfig, loadPage} from "@/store";
import React from "react";

type Props = {params: Promise<{ slug: string }>}


export default async function ViewPage({params,}: Props){
    const slug = (await params).slug
    const pageId = slug.substring(0, slug.indexOf("-"))
    const config = await loadConfig()
    if (!config) throw new Error("could not find nav")

    const page = config.nav.find(x => x.id === pageId)
    if (!page) {
        return <Menu nav={config.nav}><NotFound/></Menu>
    }

    const blob = await loadPage(pageId)
    if (!blob) {
        return <Menu nav={config.nav} currentPageId={page.id} currentPageTitle={page.text}><NotFound/></Menu>
    }

    return <Menu nav={config.nav} currentPageId={pageId} currentPageTitle={page.text}>
        <ReadOnlyEditor content={blob} />
    </Menu>
}

import {loadNavigation, loadPage} from "@/store";
import {notFound} from "next/navigation";
import {PageEditor} from "@/app/editor/[slug]/pageEditor";

type Props = {params: Promise<{ slug: string }>}

export default async function EditorPage({params}: Props){
    const slug = (await params).slug
    const pageId = slug.substring(0, slug.indexOf("-"))
    const navigation = await loadNavigation()
    const page = navigation[pageId]
    if (!page) {
        return notFound()
    }

    const content = page.url ? (await loadPage(page.url)) : undefined

    return <>
        <PageEditor content={content} page={page} />
    </>
}

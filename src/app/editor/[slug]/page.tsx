import {loadNavigation, loadPage} from "@/store";
import {notFound} from "next/navigation";
import {PageEditor} from "@/app/editor/[slug]/pageEditor";

type Props = {params: Promise<{ slug: string }>}

export default async function EditorPage({params}: Props){
    const slug = (await params).slug
    const pageId = slug.substring(0, slug.indexOf("-"))
    const navigation = await loadNavigation()
    console.log(navigation)
    const page = navigation?.find(x => x.id === pageId)

    const content = await loadPage(pageId)
    if (!content || !page) {
        return notFound()
    }

    console.log({page, content})

    return <>
        <PageEditor content={content} page={page} />
    </>
}

import {loadNavigation, loadPage} from "@/store";
import {notFound} from "next/navigation";
import {PageEditor} from "@/app/editor/[slug]/pageEditor";
import {Menu} from "@/menu";
import {NotFound} from "@/notFound";

type Props = {params: Promise<{ slug: string }>}

export default async function EditorPage({params}: Props){
    const slug = (await params).slug
    const pageId = slug.substring(0, slug.indexOf("-"))
    const navigation = await loadNavigation()
    if (!navigation) throw new Error("could not find navigation")

    const page = navigation?.find(x => x.id === pageId)

    const content = await loadPage(pageId)
    if (!page) {
        return <Menu nav={[]}><NotFound /></Menu>
    }

    return <>
        <Menu nav={navigation} currentPageId={page.id} currentPageTitle={page.text}>
            <PageEditor content={content} page={page} nav={navigation} />
        </Menu>
    </>
}

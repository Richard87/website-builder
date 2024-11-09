import {Content} from "@/app/Content";
import {loadNavigation, loadPage} from "@/store";
import {Menu} from "@/menu";
import {notFound} from "next/navigation";

type Props = {params: Promise<{ slug: string }>}


export default async function ViewPage({params,}: Props){
    const slug = (await params).slug
    const pageId = slug.substring(0, slug.indexOf("-"))
    const navigation = await loadNavigation()
    const page = navigation?.find(x => x.id === pageId)
    const blob = await loadPage(pageId)

    if (!blob || !page || !navigation) {
        return notFound()
    }

    return <Menu nav={navigation} currentPageId={pageId} currentPageTitle={page.title}><Content blob={blob}/></Menu>
}

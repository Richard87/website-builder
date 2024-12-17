import {Content} from "@/app/Content";
import {loadNavigation, loadPage} from "@/store";
import {Menu} from "@/app/menu";
import {NotFound} from "@/app/notFound";
import {Container} from "@mui/material";

type Props = {params: Promise<{ slug: string }>}


export default async function ViewPage({params,}: Props){
    const slug = (await params).slug
    const pageId = slug.substring(0, slug.indexOf("-"))
    const navigation = await loadNavigation()
    if (!navigation) throw new Error("could not find navigation")

    const page = navigation.find(x => x.id === pageId)
    if (!page) {
        return <Menu nav={navigation}><NotFound/></Menu>
    }

    const blob = await loadPage(pageId)
    if (!blob) {
        return <Menu nav={navigation} currentPageId={page.id} currentPageTitle={page.text}><NotFound/></Menu>
    }

    return <Menu nav={navigation} currentPageId={pageId} currentPageTitle={page.text}>
        <Content content={blob}/>
    </Menu>
}

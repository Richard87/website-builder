import {loadNavigation, loadPage} from "@/store";
import {Content} from "@/app/Content";
import {Menu} from "@/menu";
import {NotFound} from "@/notFound";

export default async function Home() {
    const nav = await loadNavigation()
    if (!nav) throw new Error("could not find navigation")

    let page = nav[0];

    if (!page) {
        return <Menu nav={nav}><NotFound /></Menu>
    }

    const blob = await loadPage(page?.id)

    if (!blob) {
        return <Menu nav={nav} currentPageId={page.id} currentPageTitle={page.text}><NotFound/></Menu>
    }

    return (
        <Menu nav={nav} currentPageId={"0"} currentPageTitle={page.text}>
            <Content content={blob}/>
        </Menu>
    );
}

import {loadNavigation, loadPage} from "@/store";
import {Content} from "@/app/Content";
import {Menu} from "@/menu";
import {notFound} from "next/navigation";

export default async function Home() {
    const nav = await loadNavigation()
    let page = nav?.[0];

    if (!page || !nav) return notFound()

    const blob = await loadPage(page?.id)

    if (!blob) return notFound()

    return (
        <Menu nav={nav} currentPageId={"0"} currentPageTitle={page.text}>
            <Content content={blob}/>
        </Menu>
    );
}

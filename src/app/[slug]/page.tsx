import {Content} from "@/app/Content";
import {loadPage} from "@/store";

type Props = {params: Promise<{ slug: string }>}


export default async function ViewPage({params,}: Props){
    const slug = (await params).slug
    const pageId = slug.substring(0, slug.indexOf("-"))
    const blob = await loadPage(pageId)
    return <Content blob={blob} />
}

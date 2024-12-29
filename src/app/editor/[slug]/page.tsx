import {Editor} from "@/app/editor/editor";
import {Menu} from "@/app/menu";
import {NotFound} from "@/app/notFound";
import {loadConfig, loadPage} from "@/store";

type Props = {params: Promise<{ slug: string }>}

export default async function EditorPage({params}: Props){
    const slug = (await params).slug
    const pageId = slug.substring(0, slug.indexOf("-"))
    const config = await loadConfig()
    if (!config) throw new Error("could not find navigation")

    const page = config.nav.find(x => x.id === pageId)

    const content = await loadPage(pageId)
    if (!page) {
        return <Menu nav={[]}><NotFound /></Menu>
    }

    return <Menu nav={config.nav} currentPageId={page.id} currentPageTitle={page.text}>
        <div className="flex flex-col flex-grow">
            <div className="max-w-screen-lg mx-auto flex flex-col flex-grow prose mb-5">
                <Editor pageId={page.id} content={content}/>
            </div>
        </div>
    </Menu>
}

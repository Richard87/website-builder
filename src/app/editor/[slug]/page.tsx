import {Editor} from "@/app/editor/editor";
import {Menu} from "@/app/menu";
import {NotFound} from "@/app/notFound";
import {loadNavigation, loadPage} from "@/store";

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

    return <Menu nav={navigation} currentPageId={page.id} currentPageTitle={page.text}>
        <div className="h-full">
            <div className="max-w-screen-lg mx-auto h-full flex flex-col prose">
                <Editor readonly={false} pageId={page.id} content={content}/>
            </div>
        </div>
    </Menu>
}

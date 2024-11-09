import {NavigationEditor} from "@/app/editor/navigationEditor";
import {loadNavigation} from "@/store";
import {Menu} from "@/menu";

export default async function NavigationEditorPage() {
    const navigation = await loadNavigation();

    return <Menu nav={navigation ?? []} currentPageId={"editor"} currentPageTitle={"editor"}>
        <h1>Nav editor</h1>
        <hr/>
       <NavigationEditor nav={navigation || []} />
    </Menu>
}

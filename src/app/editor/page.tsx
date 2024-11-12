import {NavigationEditor} from "@/app/editor/navigationEditor";
import {loadNavigation} from "@/store";
import {Menu} from "@/menu";

export default async function NavigationEditorPage() {
    const navigation = await loadNavigation();
    if (!navigation) throw new Error("could not find navigation")

    return <Menu nav={navigation}>
        <h1>Nav editor</h1>
        <hr/>
       <NavigationEditor nav={navigation} />
    </Menu>
}

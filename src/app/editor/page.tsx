import {NavigationEditor} from "@/app/editor/navigationEditor";
import {loadNavigation} from "@/store";


export default async function NavigationEditorPage() {
    const navigation = await loadNavigation();

    return <><h1>Nav editor</h1>
       <NavigationEditor nav={navigation} />
    </>
}

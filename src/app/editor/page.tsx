import {ConfigEditor} from "@/app/editor/configEditor";
import {NavigationEditor} from "@/app/editor/navigationEditor";
import {Menu} from "@/menu";
import {loadConfig} from "@/store";

export default async function NavigationEditorPage() {
    const config = await loadConfig();
    if (!config) throw new Error("could not find navigation")

    return <Menu nav={config.nav}>
        <div className={" container mx-auto px-4 prose"}>
            <h1>Site Configuration</h1>
            <ConfigEditor config={config} />
            <hr/>
            <NavigationEditor config={config}/>
        </div>
    </Menu>
}

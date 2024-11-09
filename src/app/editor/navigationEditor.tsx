"use client"

import {Navigation, storeNaviagtion} from "@/store";

type Props = {
    nav: Navigation|null
}

export function NavigationEditor ({nav}: Props) {
    let onClick = async () => {
        await storeNaviagtion({"0": {id: "0", title: "Home"}})
    };
    return <>
        <button onClick={onClick}>Save navigation</button>
        <ul>
            {Object.values(nav || {}).map(page => {
                return <li key={page.id}>
                    <a href={`/editor/${page.id}-${page.title}`}>{page.title}</a>
                </li>
            })}
         </ul>
    </>
}

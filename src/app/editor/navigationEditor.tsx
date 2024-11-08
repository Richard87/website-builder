"use client"

import {Navigation, storeNaviagtion} from "@/store";

type Props = {
    nav: Navigation
}

export function NavigationEditor ({nav}: Props) {
    let onClick = async () => {
        const url = await storeNaviagtion({"0": {id: "0", title: "Home"}})
        console.log(url)
    };
    return <>
        <button onClick={onClick}>Save navigation</button>
        <ul>
            {Object.values(nav).map(page => {
                return <li key={page.id}>
                    <a href={`/editor/${page.id}-${page.title}`}>{page.title}</a>
                </li>
            })}
         </ul>
    </>
}

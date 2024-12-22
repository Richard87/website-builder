"use client"

import {type Page, storeNaviagtion} from "@/store";
import {ulid} from "ulid";
import { useState} from "react";
import {
    Tree,
    getBackendOptions,
    MultiBackend,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

type Props = {
    nav: Page[]
}

export function NavigationEditor ({nav}: Props) {
    const [pages, setPages] = useState<Page[]>(nav);

    const onSaveNav = async () => {
        console.log(pages)
        await storeNaviagtion(pages)
    };

    const onAdd = () => {
        const text = prompt("What is the page title?")
        if (!text) {return}

        const id = ulid()

        setPages(old => [...old, {id, text, parent: "0"}])
    }

    const onReset = async () => {
        const locatinoId = ulid();
        await storeNaviagtion([
            {id: ulid(), text: "Home", parent: "0"},
            {id: ulid(), text: "About Us", parent: "0"},
            {id: locatinoId, text: "Location", parent: "0"},
            {id: ulid(), text: "Contact Us", parent: "0"},
            {id: ulid(), text: "Stavanger", parent: locatinoId},
            {id: ulid(), text: "Bergen", parent: locatinoId},
            {id: ulid(), text: "Oslo", parent: locatinoId},
            {id: ulid(), text: "Tormsø", parent: locatinoId},
        ])
    }

    console.log(nav)

    const handleDrop = (newTreeData: unknown[]) => {
        setPages(newTreeData as Page[])
    };

    return(
        <DndProvider backend={HTML5Backend}>
            <div className={"h-min[352] w-min[300]"}>

                <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                    <Tree
                        tree={pages.map(x => ({...x, droppable: true}))}
                        rootId={"0"}
                        onDrop={handleDrop}
                        render={(node, {depth, isOpen, onToggle}) => (
                            <div style={{marginLeft: depth * 10}}>
                                {node.droppable && (
                                    <span onKeyPress={onToggle} onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
                                )}
                                {node.text}
                            </div>
                        )}
                    />
                </DndProvider>
                <hr />
                <button type="button" onClick={onReset}>Reset pages</button>
                <br/>
                <button type="button" onClick={onAdd}>Add Page</button><br/>
                <button type="button" onClick={onSaveNav}>Save navigation</button>

            </div>
        </DndProvider>
    )
}

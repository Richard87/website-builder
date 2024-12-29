"use client"

import {type Config, type Page, storeConfig} from "@/store";
import {
    MultiBackend,
    Tree,
    getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { useState} from "react";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ulid} from "ulid";

type Props = {
    config: Config
}

export function NavigationEditor ({config}: Props) {
    const [pages, setPages] = useState<Page[]>(config.nav);

    const onSaveNav = async () => {
        await storeConfig({...config, nav: pages})
    };

    const onAdd = () => {
        const text = prompt("What is the page title?")
        if (!text) {return}

        const id = ulid()

        setPages(old => [...old, {id, text, parent: "0"}])
    }

    const onReset = async () => {
        const locatinoId = ulid();
        await storeConfig({...config, nav: [
            {id: ulid(), text: "Home", parent: "0"},
            {id: ulid(), text: "About Us", parent: "0"},
            {id: locatinoId, text: "Location", parent: "0"},
            {id: ulid(), text: "Contact Us", parent: "0"},
            {id: ulid(), text: "Stavanger", parent: locatinoId},
            {id: ulid(), text: "Bergen", parent: locatinoId},
            {id: ulid(), text: "Oslo", parent: locatinoId},
            {id: ulid(), text: "Tormsø", parent: locatinoId},
        ]})
    }

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
                        enableAnimateExpand
                        onDrop={handleDrop}
                        render={(node, {depth, isOpen, onToggle}) => (
                            <div style={{marginLeft: depth * 10}}>
                                {node.droppable && (
                                    <span onKeyPress={onToggle} onClick={onToggle}>
                                        {isOpen ? "[-]" : "[+]"}
                                    </span>
                                )}
                                {node.text}
                            </div>
                        )}
                    />
                </DndProvider>
                <hr />
                <div className={"join"}>
                    <button type="button" className={"btn"} onClick={onReset}>Reset pages</button>
                    <button type="button" className={"btn"} onClick={onAdd}>Add Page</button>
                    <button type="button" className={"btn btn-primary"} onClick={onSaveNav}>Save navigation</button>
                </div>
            </div>
        </DndProvider>
    )
}

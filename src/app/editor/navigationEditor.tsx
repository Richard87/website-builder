"use client"

import {Page, storeNaviagtion} from "@/store";
import {ulid} from "ulid";
import { useState} from "react";
import Box from '@mui/material/Box';
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

    let onClick = async () => {
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
        await storeNaviagtion([{id: ulid(), text: "Home", parent: "0"}])
    }

    console.log(nav)

    const handleDrop = (newTreeData: unknown[]) => {
        setPages(newTreeData as Page[])
    };

    return(
        <DndProvider backend={HTML5Backend}>
            <Box sx={{minHeight: 352, minWidth: 300}}>

                <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                    <Tree
                        tree={pages.map(x => ({...x, droppable: true}))}
                        rootId={"0"}
                        onDrop={handleDrop}
                        render={(node, {depth, isOpen, onToggle}) => (
                            <div style={{marginLeft: depth * 10}}>
                                {node.droppable && (
                                    <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
                                )}
                                {node.text}
                            </div>
                        )}
                    />
                </DndProvider>
                <hr />
                <button onClick={onReset}>Reset pages</button>
                <br/>
                <button onClick={onAdd}>Add Page</button><br/>
                <button onClick={onClick}>Save navigation</button>

            </Box>
        </DndProvider>
    )
}

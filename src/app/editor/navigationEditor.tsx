"use client"

import {Page, storeNaviagtion} from "@/store";
import {
    CreateHandler,
    DeleteHandler,
    MoveHandler,
    NodeRendererProps,
    RenameHandler,
    Tree,
} from "react-arborist";
import {ulid} from "ulid";
import {ElementType, useState} from "react";

type Props = {
    nav: Page[]
}

export function NavigationEditor ({nav}: Props) {
    const [pages, setPages] = useState<Page[]>(Object.values(nav || {}));

    let onClick = async () => {
        await storeNaviagtion(pages)
    };

    const onAdd = () => {
        const title = prompt("What is the page title?")
        if (!title) {return}

        const id = ulid()

        setPages(old => [...old, {id, title}])
    }


    const onCreate: CreateHandler<Page> = ({ parentId, index, type }) => {
        const id = ulid()
        setPages(old => [...old, {id, title: "new page", parentId}])

        return {id}
    };
    const onRename: RenameHandler<Page> = ({ id, name }) => {
        setPages(old => old.map(x => x.id === id ? ({...x, title: name}) : x))
    };
    const onMove: MoveHandler<Page> = ({ dragIds, parentId, index,dragNodes,parentNode }) => {
        console.log({ dragIds, parentId, index,dragNodes,parentNode })
        setPages(old => {
            dragIds.forEach(id => {
                const oldIndex = old.findIndex(x => x.id === id)
                arraymove(old, oldIndex,index)
            })
            return [...old]
        })
    };
    const onDelete: DeleteHandler<Page> = ({ ids }) => {
        setPages(old => old.filter(x => !ids.includes(x.id)))
    };

    return <>
        <button onClick={onAdd}>Add Page</button>
        <Tree
            childrenAccessor={p => pages.filter(x => x.parentId == p.id)}
            data={pages}
            onCreate={onCreate}
            onMove={onMove}
            onDelete={onDelete}
            onRename={onRename}

        >
            {Node}
        </Tree>
        <button onClick={onClick}>Save navigation</button>
    </>
}

const Node: ElementType<NodeRendererProps<Page>> = ({ node, style, dragHandle }) => {
    /* This node instance can do many things. See the API reference. */
    return (
        <div style={style} ref={dragHandle}>
            {node.isLeaf ? "🍁" : "🗀"}
            {node.data.title}
        </div>
    );
}

function arraymove<T>(arr: T[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

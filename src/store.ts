"use server"
import { put } from "@vercel/blob";
import {Value} from "@udecode/plate";

export type Page = {
    id: string;
    title: string;
    url?: string;
    parentId?: string;
}

export type Navigation = Record<string, Page>

export async function storeNaviagtion(pages: Navigation) {
    const { url } = await put('index.json', JSON.stringify(pages), {
        access: "public",token: process.env.BLOB_READ_WRITE_TOKEN
    });
    return url
}

export async function loadNavigation(): Promise<Navigation> {
    const response = await fetch(process.env.INDEX_URL as string)
    const data: Navigation = await response.json() as unknown as Navigation

    return data as Navigation
}

export async function loadPage(pageUrl: string): Promise<Value> {
    const response = await fetch(pageUrl)
    const data = await response.json()

    return data
}

export async function savePage(pageId: string, title: string, contentJson?: string): Promise<Page> {
    const nav = await loadNavigation()
    console.log("pageId: ", pageId)

    if (contentJson) {
        const { url } = await put(`page-${pageId}.json`, contentJson, {
            access: "public",token: process.env.BLOB_READ_WRITE_TOKEN
        });

        nav[pageId].url = url
    }
    nav[pageId].title = title

    await storeNaviagtion(nav)

    return nav[pageId]
}

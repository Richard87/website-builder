"use server"

import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3"
import type {Content, JSONContent} from "@tiptap/react";

const S3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT as string,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_KEY as string,
    },
    region: "auto",
})
export type Page = {
    id: string;
    text: string;
    parent: string;
}

export async function storeNaviagtion(pages: Page[]) {
    await S3.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: "index.json",
        Body: JSON.stringify(pages)
    }))
}

async function loadJson<T>(key: string): Promise<T|null> {
    try {
        const response = await S3.send(new GetObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: key,
        }))

        const data = await response.Body?.transformToString()
        if (!data) return null

        const blob = JSON.parse(data)
        return blob as T
    } catch (e) {
        console.warn(`failed to load: ${key}`, e)
        return null
    }
}

export async function loadNavigation() {
    return await loadJson<Page[]>("index.json")
}

export async function loadPage(pageId: string): Promise<JSONContent|null> {
    return await loadJson<JSONContent>(`page-${pageId}.json`)
}

export async function savePage(pageId: string, content?: Content) {
    const body = JSON.stringify(content,null, 2);
    await S3.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: `page-${pageId}.json`,
        Body: body
    }))
}

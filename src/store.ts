"use server"

import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3"
import type {Content, HTMLContent, JSONContent} from "@tiptap/react";

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
export type Config = {
    nav: Page[],
    theme?: string
}

export async function storeConfig(config: Config) {
    await S3.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: "default.json",
        Body: JSON.stringify(config, null, 2)
    }))
}

async function loadBlob(key: string): Promise<string|undefined> {
    try {
        const response = await S3.send(new GetObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: key,
        }))
        return await response.Body?.transformToString()
    } catch (e) {
        console.warn(`failed to load: ${key}`, e)
        return undefined
    }
}

async function loadJson<T>(key: string): Promise<T|null> {
    try {
        const data = await loadBlob(key)
        if (!data) return null

        const blob = JSON.parse(data)
        return blob as T
    } catch (e) {
        console.warn(`failed to load: ${key}`, e)
        return null
    }
}

export async function loadConfig() {
    return await loadJson<Config>("default.json")
}

export async function loadPage(pageId: string): Promise<JSONContent|null> {
    return await loadJson<JSONContent>(`page-${pageId}.json`)
}

export async function savePage(pageId: string, content: string) {
    await S3.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: `page-${pageId}.json`,
        Body: content,
        ContentType: 'application/json'
    }))
}

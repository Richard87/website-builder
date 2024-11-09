"use server"
import {Value} from "@udecode/plate";

import {
    PutObjectCommand,
    GetObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3"

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
    title: string;
    url?: string;
    parentId?: string;
}

export type Navigation = Record<string, Page>

export async function storeNaviagtion(pages: Navigation) {
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
        console.error("failed to load: " + key, e)
        return null
    }
}

export async function loadNavigation(): Promise<Navigation|null> {
    return await loadJson<Navigation>("index.json")
}

export async function loadPage(pageId: string): Promise<Value|null> {
    return await loadJson<Value>(`page-${pageId}.json`)
}

export async function savePage(pageId: string, contentJson?: string) {
    await S3.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: `page-${pageId}.json`,
        Body: contentJson
    }))
}

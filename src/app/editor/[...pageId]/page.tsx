type Props = {params: Promise<{ pageId: string }>}

export default async function EditorPage({params,}: Props){
    const pageId = (await params).pageId
    return <>
        <h1>Hello world!</h1>
        <p>{pageId}</p>
    </>
}

type Props = {params: Promise<{ pageId: string }>}


export default async function ViewPage({params,}: Props){
    const pageId = (await params).pageId
    return <>
        <h1>Hello world!</h1>
        <p>{pageId}</p>
    </>
}

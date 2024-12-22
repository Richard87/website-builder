import {Page} from "@/store";
import Link from "next/link";
import {PropsWithChildren} from "react";

type Props = PropsWithChildren<{
    nav: Page[]
    currentPageId?: string
    currentPageTitle?: string
}>

function MenuItem({page, nav}: {page: Page, nav: Page[]}) {
    const childPages = nav.filter(x => x.parent == page.id)
    if (childPages.length == 0) return (
        <li><Link href={getPageHref(page, nav)}>{page.text}</Link></li>
    )

    return (
        <li>
            <Link href={getPageHref(page, nav)}>{page.text}</Link>
            <ul tabIndex={0} className="p-2">
                {childPages.map((page: Page) => <MenuItem key={page.id} page={page} nav={nav}/>)}
            </ul>
        </li>
    )
}

export function Menu({nav, children, currentPageTitle, currentPageId}: Props) {
    const topPages = nav.filter(x => x.parent === "0")

    return <>
        <div className="navbar bg-base-100">
            <div className="container mx-auto px-4">
                <ul className="menu menu-horizontal flex-1 justify-end bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><Link href={"/"} className="btn btn-ghost text-xl">Website Builder</Link></li>

                    {topPages.map((page: Page) => {
                        const childPages = nav.filter(x => x.parent == page.id)
                        if (childPages.length == 0) return (
                            <li key={page.id}><Link className="btn btn-ghost hidden md:flex" href={getPageHref(page, nav)}>{page.text}</Link></li>
                        )

                        return <li key={page.id} className="dropdown dropdown-end hidden md:flex">
                            <div tabIndex={0} role="button" className="btn btn-ghost">
                                {page.text}
                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            >
                                {childPages.map((page: Page) => <MenuItem key={page.id} page={page} nav={nav}/>)}
                            </ul>
                        </li>
                    })}


                    <li><Link className="btn btn-ghost" href={"/editor"}>Edit Nav</Link></li>
                    {currentPageId && currentPageTitle && (
                        <li>
                            <Link className="btn btn-ghost" href={`/editor/${currentPageId}-${encodeURI(currentPageTitle)}`}>Edit page</Link>
                        </li>
                    )}

                    <li className={"dropdown dropdown-bottom dropdown-end md:hidden"}>
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"/>
                            </svg>
                        </div>
                        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {topPages.map((page: Page) => <MenuItem key={page.id} page={page} nav={nav}/>)}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto px-4">
            {children}
        </div>
    </>
}


function getPageHref(page: Page, nav: Page[]) {
    if (page.id === nav[0]?.id) return "/"

    return `/${page.id}-${encodeURI(page.text)}`;
}

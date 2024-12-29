import type {Page} from "@/store";
import Link from "next/link";
import type {PropsWithChildren} from "react";
import {FaHamburger} from "react-icons/fa";

type Props = PropsWithChildren<{
    nav: Page[]
    currentPageId?: string
    currentPageTitle?: string
}>

function MenuItem({page, nav}: {page: Page, nav: Page[]}) {
    const childPages = nav.filter(x => x.parent === page.id)
    if (childPages.length === 0) return (
        <li><Link href={getPageHref(page, nav)}>{page.text}</Link></li>
    )

    return (
        <li>
            <Link href={getPageHref(page, nav)}>{page.text}</Link>
            <ul className="p-2">
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
                    <li className={"grow opacity-0"} />

                    {topPages.map((page: Page) => {
                        const childPages = nav.filter(x => x.parent === page.id)
                        if (childPages.length === 0) return (
                            <li key={page.id}><Link className="btn btn-ghost hidden md:flex" href={getPageHref(page, nav)}>{page.text}</Link></li>
                        )

                        return <li key={page.id} className="dropdown dropdown-end hidden md:flex">
                            <div tabIndex={0} role="button" className="btn btn-ghost">
                                {page.text}
                            </div>

                            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
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
                            <FaHamburger /> Menu
                        </div>
                        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {topPages.map((page: Page) => <MenuItem key={page.id} page={page} nav={nav}/>)}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto px-4 prose flex-grow flex flex-col">
            {children}
        </div>
    </>
}


function getPageHref(page: Page, nav: Page[]) {
    if (page.id === nav[0]?.id) return "/"

    return `/${page.id}-${encodeURI(page.text)}`;
}

"use client"

import {Page} from "@/store";
import Link from "next/link";
import {PropsWithChildren, useEffect, useState} from "react";
import classNames from "classnames";

type Props = PropsWithChildren<{
    nav: Page[]
    currentPageId?: string
    currentPageTitle?: string
}>

export function Menu({nav, children, currentPageTitle, currentPageId}: Props) {
    const [isOpen, toggleOpen] = useToogleOpen()
    const activePages = findActivePages(nav, currentPageId);
    const childPages = nav.filter(x => x.parent == currentPageId)

    return (
        <div className={"h-full flex flex-col"}>
            <nav className="bg-teal-500 p-6 m-0">
                <div className={"flex justify-between flex-wrap max-w-screen-lg m-auto"}>
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <span className="font-semibold text-xl tracking-tight">Website Builder</span>
                    </div>
                    <div className="block md:hidden">
                        <button
                            onClick={toggleOpen}
                            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                            </svg>
                        </button>
                    </div>
                    <div className={classNames("w-full block flex-grow flex-row md:flex md:items-center md:w-auto",
                        "transition-[height] duration-1000 ease-in-out ",
                        {"hidden": !isOpen}
                    )}>
                        <div className="flex grow flex-col">
                            {activePages.map((pageId) => {
                                const page = nav.find(p => p.id === pageId);
                                const row = nav.filter(p => p.parent === page?.parent);

                                return (<div key={pageId} className="flex w-full">
                                    {row.map((n) => (
                                        <Link
                                            key={n.id}
                                            href={getPageHref(n, nav)}
                                            className={classNames("block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4", {
                                                "font-bold": activePages.includes(n.id),
                                                "text-white": activePages.includes(n.id)
                                            })}
                                        >
                                            {n.text}
                                        </Link>
                                    ))}
                                </div>)
                            })}
                            {childPages.length > 0 && (
                                <div className="flex w-full">
                                    {childPages.map((n, i) => (
                                        <Link
                                            key={n.id}
                                            href={getPageHref(n, nav)}
                                            className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4"
                                        >
                                            {n.text}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <Link passHref href={"/editor"}
                                  className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
                                Edit Nav
                            </Link>
                            {currentPageId && currentPageTitle && (
                                <Link passHref
                                      href={`/editor/${currentPageId}-${encodeURI(currentPageTitle)}`}
                                      className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 md:mt-0">
                                    Edit page
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="grow flex flex-col">{children}</div>
        </div>
    );
}


function getPageHref(page: Page, nav: Page[]) {
    if (page.id === nav[0]?.id) return "/"

    return `/${page.id}-${encodeURI(page.text)}`;
}

const useToogleOpen = (): [boolean, () => void] => {
    const [isOpen, setIsOpen] = useState((window?.innerWidth ?? 100) >= 960);
    useEffect(() => {
        let callback = () => window.innerWidth >= 960 && setIsOpen(false);
        window.addEventListener("resize", callback);
        return () => window.removeEventListener("resize", callback);
    }, []);

    const toggle = () => setIsOpen(p => !p);

    return [isOpen, toggle];
}

function findActivePages(nav: Page[], currentPageId?: string): string[] {
    if (!currentPageId) return []
    const currentPage = nav.find(p => p.id === currentPageId)
    if (!currentPage || currentPage.parent == "0") return [currentPageId];

    const pages = findActivePages(nav, currentPage.parent)
    return [...pages, currentPage.id]
}

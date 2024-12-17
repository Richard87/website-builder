import {ulid} from "ulid";

export type Page = {
    id: string;
    text: string;
    parent: string;
}

const testNav = [
    {id: "1", text: "Home", parent: "0"},
    {id: "2", text: "About Us", parent: "0"},
    {id: "3", text: "Location", parent: "0"},
    {id: "4", text: "Contact Us", parent: "0"},
    {id: "5", text: "Stavanger", parent: "3"},
    {id: "6", text: "Bergen", parent: "3"},
    {id: "7", text: "Oslo", parent: "3"},
    {id: "8", text: "Tormsø", parent: "3"},
]

function findActivePages(nav: Page[], currentPageId?: string): string[] {
    if (!currentPageId) return []
    const currentPage = nav.find(p => p.id === currentPageId)
    if (!currentPage || currentPage.parent == "0") return [currentPageId];

    const pages = findActivePages(nav, currentPage.parent)
    return [...pages, currentPage.id]
}

console.log(testNav)

const activePages = findActivePages(testNav,"8" )
console.log(activePages)

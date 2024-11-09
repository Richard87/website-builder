import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {Page} from "@/store";
import Link from "next/link";
import {PropsWithChildren} from "react";

type Props = PropsWithChildren<{
    nav: Page[]
    currentPageId: string
    currentPageTitle: string
}>
export const Menu = ({nav, currentPageTitle, currentPageId, children}: Props) => {
    return <><NavigationMenu>
        <NavigationMenuList>
            {nav?.map(page => {
                const children = nav.filter(x => x.parentId == page.id)
                return (
                    <NavigationMenuItem key={page.id}>
                        {children.length == 0 ? (
                            <MenuLink href={getPageHref(page)} title={page.title}/>
                        ) : (<>
                            <NavigationMenuTrigger>{page.title}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                {children.map(p => <MenuLink href={getPageHref(p)} key={p.id} title={p.title}/>)}
                            </NavigationMenuContent>
                        </>)}
                    </NavigationMenuItem>
                )
            })}
        </NavigationMenuList>
        {currentPageTitle !== "editor" && (
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Edit</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <MenuLink href={"/editor"} title={"Edit Navigation"}/>
                        <MenuLink href={`/editor/${currentPageId}-${encodeURI(currentPageTitle)}`}
                                  title={"Edit this page"}/>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        )}

    </NavigationMenu>
        {children}
    </>
}

function getPageHref(page: Page) {
    return page.id === "0" ? "/" : `${page.id}-${encodeURI(page.title)}`;
}

const MenuLink = ({href, title}: { href: string, title: string }) => {
    return (
        <Link href={href} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {title}
            </NavigationMenuLink>
        </Link>
    )
}

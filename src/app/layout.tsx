import type {Metadata} from "next";
import Link from "next/link"
import localFont from "next/font/local";
import "./globals.css";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {loadNavigation, Page} from "@/store";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Webpage build demo",
    description: "Webpage build demo",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

    const nav = await loadNavigation()

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <NavigationMenu>
            <NavigationMenuList>
                {nav?.map(page => {
                    const children = nav.filter(x => x.parentId == page.id)
                    return (
                        <NavigationMenuItem key={page.id}>
                            {children.length == 0 ? (
                                <MenuLink href={page.id === "0" ? "/" : `${page.id}-${encodeURI(page.title)}`} title={page.title} />
                                ) : (<>
                                <NavigationMenuTrigger>{page.title}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    {children.map(p => <MenuLink href={p.id === "0" ? "/" : `${p.id}-${encodeURI(p.title)}` } key={p.id} title={p.title} />)}
                                </NavigationMenuContent>
                            </>)}
                        </NavigationMenuItem>
                    )
                })}
            </NavigationMenuList>
            <NavigationMenuList>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Edit</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <MenuLink href={"/editor"} title={"Edit Navigation"} />
                        <MenuLink href={"/editor/0-home"} title={"Edit this page"} />
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        {children}
        </body>
        </html>
    );
}

const MenuLink = ({href, title}: {href: string, title: string}) => {
    return(
    <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {title}
        </NavigationMenuLink>
    </Link>
)}

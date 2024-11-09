import {loadNavigation, loadPage} from "@/store";
import {Content} from "@/app/Content";
import {Menu} from "@/menu";
import {notFound} from "next/navigation";

export default async function Home() {
  const nav = await loadNavigation()
  const blob = await loadPage("0")
  const page = nav?.find(x => x.id === "0")
  if (!blob || !page || !nav) return notFound()

  return (
      <Menu nav={nav} currentPageId={"0"} currentPageTitle={page.title}>
        <Content blob={blob} />
      </Menu>
  );
}

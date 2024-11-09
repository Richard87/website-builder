import {loadPage} from "@/store";
import {Content} from "@/app/Content";

export default async function Home() {
  const blob = await loadPage(0)

  return (
      <Content blob={blob} />
  );
}

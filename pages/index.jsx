
import { builder, BuilderComponent } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function getStaticProps() {
  const content = await builder.get("page", { url: "/" }).toPromise();

  return {
    props: { content: content || null },
    revalidate: 10,
  };
}

export default function Home({ content }) {
  if (!content) return <div>404 - Página não encontrada no Builder</div>;
  return <BuilderComponent model="page" content={content} />;
}

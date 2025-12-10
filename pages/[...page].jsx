
import { builder, BuilderComponent } from "@builder.io/react";
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const urlPath = "/" + (params?.page?.join("/") || "");
  const content = await builder.get("page", { url: urlPath }).toPromise();
  if (!content) return { notFound: true };
  return { props: { content }, revalidate: 10 };
}

export default function Page({ content }) {
  return <BuilderComponent model="page" content={content} />;
}

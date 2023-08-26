import FruitData from "@/types/FruitData";
import { GetServerSideProps } from "next";
import path from "path";
import { promises as fs } from "fs";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserContext } from "@/context/UserContext";

export default function Index({ fruits }: { fruits: FruitData[] }) {
  const { username } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.replace("/login");
    }
  }, [router, username]);

  return (
    <>
      <Head>
        <title>Home - Fresh Fruits</title>
      </Head>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            <Link href={`/fruit/${fruit.id}`}>{fruit.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  fruits: FruitData[];
}> = async () => {
  const dataDirectory = path.join(process.cwd(), "data");
  const data = JSON.parse(
    await fs.readFile(dataDirectory + "/fruitdata.json", "utf8")
  ) as FruitData[];

  return { props: { fruits: data } };
};

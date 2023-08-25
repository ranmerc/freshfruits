import FruitData from "@/types/FruitData";
import { GetServerSideProps } from "next";
import path from "path";
import { promises as fs } from "fs";
import Link from "next/link";

export default function Index({ fruits }: { fruits: FruitData[] }) {
  return (
    <>
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

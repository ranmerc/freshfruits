import FruitData from "@/types/FruitData";
import { GetServerSideProps } from "next";
import path from "path";
import { promises as fs } from "fs";
import Head from "next/head";
import CartDrawer from "@/components/CartDrawer";
import Authorized from "@/components/Authorized";
import FruitItem from "@/components/FruitItem";
import { Container, Divider, Grid, SelectChangeEvent } from "@mui/material";
import FruitItemSort from "@/components/FruitItemSort";
import { useMemo, useState } from "react";
import PriceData from "@/types/PriceData";

export default function Index({
  fruits,
  prices,
}: {
  fruits: FruitData[];
  prices: PriceData[];
}) {
  const [selectedValue, setSelectedValue] = useState("name");

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    setSelectedValue(e.target.value as string);
  };

  const sortedFruits = useMemo(() => {
    const fruitPrice = fruits.map((fruit) => {
      const price = prices.find((item) => item.id === fruit.id);
      return { ...fruit, price: price?.packs[0].discountPrice };
    });

    switch (selectedValue) {
      case "price-low-high":
        return fruitPrice.sort((a, b) => {
          if (!a.price || !b.price) {
            return 0;
          }
          return a.price - b.price;
        });
      case "price-high-low":
        return fruitPrice.sort((a, b) => {
          if (!a.price || !b.price) {
            return 0;
          }
          return b.price - a.price;
        });
      case "name":
        return fruitPrice.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return fruitPrice;
    }
  }, [selectedValue, fruits, prices]);

  return (
    <>
      <Head>
        <title>Home - Fresh Fruits</title>
      </Head>
      <Authorized>
        <Container
          maxWidth="lg"
          sx={{
            my: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FruitItemSort value={selectedValue} onChange={handleSortChange} />
          <Divider sx={{ my: 5 }} variant="fullWidth" />
          <Grid container spacing={3}>
            {sortedFruits.map((item) => (
              <Grid item xs={12} sm={4} md={3} key={item.id}>
                <FruitItem item={item} />
              </Grid>
            ))}
          </Grid>
          <CartDrawer />
        </Container>
      </Authorized>
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

  const priceData = JSON.parse(
    await fs.readFile(
      path.join(process.cwd(), "data") + "/pricedata.json",
      "utf8"
    )
  ) as PriceData[];

  return { props: { fruits: data, prices: priceData } };
};

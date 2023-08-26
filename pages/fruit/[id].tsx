import FruitData from "@/types/FruitData";
import { Grid, Typography } from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import path from "path";
import { promises as fs } from "fs";
import ImageCarousel from "@/components/ImageCarousel";
import PriceContainer from "@/components/PackContainer";
import AboutProduct from "@/components/AboutProduct";
import Head from "next/head";

export default function Page({
  fruitData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>
          {fruitData.name.charAt(0).toUpperCase() + fruitData.name.slice(1)} -
          Fresh Fruits
        </title>
      </Head>
      <Grid container sx={{ paddingX: 1, paddingY: 5 }} columnSpacing={6}>
        <Grid item xs={12} md={6} mb={{ xs: 4 }}>
          <ImageCarousel urls={fruitData.images} name={fruitData.name} />
        </Grid>
        <Grid item container xs={12} md={6}>
          <Grid item xs={12} mb={{ xs: 3 }}>
            <Typography
              variant="h3"
              component={"h1"}
              sx={{ textTransform: "capitalize", fontWeight: "bold" }}
            >
              {fruitData.name}
            </Typography>
          </Grid>
          <Grid item xs={12} mb={{ xs: 6 }}>
            <PriceContainer id={fruitData.id} />
          </Grid>
          <Grid item xs={12}>
            <AboutProduct fruitData={fruitData} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  fruitData: FruitData;
}> = async ({ params }) => {
  const id = params?.id;

  if (!id) {
    return { notFound: true };
  }

  const dataDirectory = path.join(process.cwd(), "data");
  const data = JSON.parse(
    await fs.readFile(dataDirectory + "/fruitdata.json", "utf8")
  );

  const fruitData = data.find((fruit: FruitData) => fruit.id === Number(id));

  return { props: { fruitData } };
};

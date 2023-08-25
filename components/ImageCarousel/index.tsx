import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import { Box } from "@mui/material";

const CarouselIcons = (urls: string[]) => {
  return urls.map((url, i) => (
    <Image
      key={i}
      alt={`Picture ${i + 1}`}
      src={url}
      height={50}
      width={50}
      style={{ objectFit: "cover", marginInline: "0.2rem" }}
      priority={true}
    />
  ));
};

export default function ImageCarousel({
  urls,
  name,
}: {
  urls: string[];
  name: string;
}) {
  return (
    <>
      <Carousel
        autoPlay={false}
        animation="slide"
        height={400}
        IndicatorIcon={CarouselIcons(urls)}
      >
        {urls.map((url, i) => (
          <Box key={`${name}${url}`} display={"flex"} justifyContent={"center"}>
            <Image
              alt={`Picture of a ${name}`}
              src={url}
              height={400}
              width={400}
              priority={true}
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}
      </Carousel>
    </>
  );
}

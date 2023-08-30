import useFetchPrice from "@/hooks/useFetchPrice";
import FruitData from "@/types/FruitData";
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import FruitItemCartAction from "../FruitItemCartAction";

export default function FruitItem({ item }: { item: FruitData }) {
  const {
    data: priceData,
    isLoading,
    isError,
    isSuccess,
  } = useFetchPrice(item.id);

  if (isLoading) {
    return <Alert severity="info">Loading prices...</Alert>;
  }

  if (isError) {
    return (
      <Alert severity="error">Error fetching price data for {item.name}</Alert>
    );
  }

  return (
    <>
      <Card sx={{ p: 2, height: "100%" }}>
        <Link
          href={`/fruit/${item.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <CardMedia
            image={item.images[0]}
            title={`${item.name} image`}
            sx={{ height: 150, width: "100%" }}
          />
          <CardContent sx={{ px: 0, py: 2 }}>
            <Typography
              variant="h4"
              fontWeight={"bold"}
              textTransform={"capitalize"}
              sx={{ textAlign: "center", overflowX: "scroll" }}
            >
              {item.name}
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          {isSuccess && priceData && priceData.packs.length !== 0 && (
            <FruitItemCartAction prices={priceData} id={item.id} />
          )}
        </CardActions>
      </Card>
    </>
  );
}

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import CartItem from "@/types/CartItemType";
import CartItemType from "@/types/CartItemType";
import { useCartContext } from "@/context/CartContext";
import useFetchFruit from "@/hooks/useFetchFruit";
import Link from "next/link";
import calculateDiscountPercentage from "@/utils/calculateDiscountPercentage";
import Counter from "../Counter";

export default function CartItem({ item }: { item: CartItemType }) {
  const { data, isError, isSuccess, isLoading } = useFetchFruit(item.fruitId);

  const { addItemToCart, removeItemFromCart } = useCartContext();

  const discount = calculateDiscountPercentage(
    item.pack.discountPrice,
    item.pack.price
  );

  const handleIncreaseQuantity = () => {
    addItemToCart({
      fruitId: item.fruitId,
      pack: item.pack,
      quantity: 1,
      selectedPackId: item.selectedPackId,
    });
  };

  const handleDecreaseQuantity = () => {
    removeItemFromCart({
      fruitId: item.fruitId,
      selectedPackId: item.selectedPackId,
    });
  };

  if (isLoading) {
    return <Alert severity="info">Loading item...</Alert>;
  }

  if (isError) {
    return <Alert severity="error">Error loading item!</Alert>;
  }

  if (isSuccess && data && data.data) {
    const { name, images } = data.data;
    return (
      <Card
        sx={{
          display: "flex",
          p: 3,
          columnGap: 2,
          flexWrap: "wrap",
          flexBasis: 1,
        }}
      >
        <CardMedia
          sx={{
            width: { xs: "100%", md: 150 },
            height: 150,
          }}
          image={images[0]}
          title={name}
        />
        <CardContent
          sx={{
            display: "flex",
            p: 0,
            flexGrow: 1,
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Stack rowGap={0.5}>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              textTransform={"capitalize"}
            >
              <Link
                href={`/fruit/${item.fruitId}`}
                style={{ textDecoration: "none" }}
                color="inherit"
              >
                {`${name} (${item.pack.quantity}
              ${item.pack.type === "count" ? "Nos" : "g"})`}
              </Link>
            </Typography>
            {!!discount && (
              <Typography
                variant="caption"
                sx={{
                  bgcolor: "secondary.main",
                  color: "secondary.contrastText",
                  width: "fit-content",
                  px: 0.5,
                }}
              >{`${discount}% off`}</Typography>
            )}
            <Stack direction={"row"} alignItems={"baseline"} columnGap={0.5}>
              <Typography
                variant="body1"
                component={"span"}
                fontSize={"1.2rem"}
              >
                ₹{item.pack.discountPrice}
              </Typography>
              {item.pack.discountPrice !== item.pack.price && (
                <Typography
                  variant="body2"
                  component={"span"}
                  sx={{ textDecoration: "line-through" }}
                >
                  ₹{item.pack.price}
                </Typography>
              )}
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{
                bgcolor: "secondary.main",
                width: "fit-content",
                borderRadius: 2,
              }}
            >
              <Counter
                count={item.quantity}
                decrementLabel="Remove one item"
                incrementLabel="Add one item"
                onDecrement={handleDecreaseQuantity}
                onIncrement={handleIncreaseQuantity}
                incrementDisabled={!item.pack.inStock}
              />
            </Stack>
          </Stack>

          <Typography
            variant="body1"
            component="span"
            fontSize={"1.2rem"}
            fontWeight={"bold"}
          >
            ₹{item.pack.discountPrice * item.quantity}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

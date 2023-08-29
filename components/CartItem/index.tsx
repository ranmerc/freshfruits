import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import CartItem from "@/types/CartItemType";
import { RemoveCircle, AddCircle } from "@mui/icons-material";
import CartItemType from "@/types/CartItemType";
import { useCartContext } from "@/context/CartContext";
import useFetchFruit from "@/hooks/useFetchFruit";
import Link from "next/link";

export default function CartItem({ item }: { item: CartItemType }) {
  const { data, isError, isSuccess, isLoading } = useFetchFruit(item.fruitId);

  const { addItemToCart, removeItemFromCart } = useCartContext();

  const discount = Math.abs(
    Math.round(
      ((item.pack.price - item.pack.discountPrice) / item.pack.price) * 100
    )
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
    <div>Loading...</div>;
  }

  if (isError) {
    <div>Error fetching fruit data!</div>;
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
              <IconButton
                aria-label="remove one item
                "
                onClick={handleDecreaseQuantity}
              >
                <RemoveCircle />
              </IconButton>
              <Typography fontSize={"1.3rem"}>{item.quantity}</Typography>
              <IconButton
                aria-label="add one more item"
                onClick={handleIncreaseQuantity}
                disabled={!item.pack.inStock}
              >
                <AddCircle />
              </IconButton>
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

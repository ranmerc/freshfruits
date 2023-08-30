import { useCartContext } from "@/context/CartContext";
import PriceData from "@/types/PriceData";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import calculateDiscount from "@/utils/calculateDiscount";

export default function FruitItemCartAction({
  prices,
  id,
}: {
  prices: PriceData;
  id: number;
}) {
  const [selectedPack, setSelectedPack] = React.useState(0);
  const { cartItems, addItemToCart, removeItemFromCart } = useCartContext();

  const quantityInCart = useMemo(() => {
    const item = cartItems.find(
      (item) => item.fruitId === id && item.selectedPackId === selectedPack
    );
    return item?.quantity || 0;
  }, [cartItems, id, selectedPack]);

  const itemToBeAdded = useMemo(() => {
    return {
      fruitId: id,
      pack: prices.packs[selectedPack],
      quantity: 1,
      selectedPackId: selectedPack,
    };
  }, [id, selectedPack, prices]);

  return (
    <>
      <Stack rowGap={2} width={"100%"}>
        {prices.packs[selectedPack].price !==
          prices.packs[selectedPack].discountPrice && (
          <Typography
            variant="caption"
            sx={{
              bgcolor: "secondary.main",
              padding: 0.5,
              fontSize: "0.8rem",
              textAlign: "center",
            }}
          >
            {calculateDiscount(
              prices.packs[selectedPack].discountPrice,
              prices.packs[selectedPack].price
            )}{" "}
            % off
          </Typography>
        )}
        <FormControl fullWidth>
          <InputLabel id={`packs-for-${id}`}>Pack</InputLabel>
          <Select
            labelId={`packs-for-${id}`}
            id={`select-packs-for-${id}`}
            value={selectedPack}
            label="Pack"
            onChange={(e) => {
              setSelectedPack(e.target.value as number);
            }}
          >
            {prices.packs.map((pack, i) => {
              if (pack.inStock) {
                return (
                  <MenuItem value={i} key={i}>
                    {pack.quantity} {pack.type === "count" ? "Nos" : "gm"} for ₹
                    {pack.discountPrice}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>

        {quantityInCart !== 0 ? (
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{
              bgcolor: "secondary.main",
              borderRadius: 2,
              justifyContent: "space-around",
            }}
          >
            <IconButton
              onClick={() =>
                removeItemFromCart({
                  fruitId: id,
                  selectedPackId: selectedPack,
                })
              }
              aria-label="Remove from Cart"
            >
              <RemoveCircle />
            </IconButton>
            <Typography fontSize={"1.2rem"}>{quantityInCart}</Typography>
            <IconButton
              onClick={() => addItemToCart(itemToBeAdded)}
              aria-label="Add to Cart"
            >
              <AddCircle />
            </IconButton>
          </Stack>
        ) : (
          <Button
            size="large"
            variant="outlined"
            onClick={() => addItemToCart(itemToBeAdded)}
          >
            Add
          </Button>
        )}
      </Stack>
    </>
  );
}

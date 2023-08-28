import useFetchPrice from "@/hooks/useFetchPrice";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import PricePack from "../PricePack";
import { ChangeEvent, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCartContext } from "@/context/CartContext";
import AlertSnackbar from "../AlertSnackbar/AlertSnackbar";

export default function PackContainer({ id }: { id: number }) {
  const { data, isLoading, isError, isSuccess } = useFetchPrice(id);
  const [selectedPack, setSelectedPack] = useState<number | null>(null);
  const { addItemToCart } = useCartContext();
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);

  const handleChange: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void = (e) => {
    setSelectedPack(Number(e.target.value));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItemToCart({
      fruitId: id,
      selectedPackId: selectedPack!,
      quantity: 1,
      pack: data?.packs[selectedPack!]!,
    });
    setShowSubmitMessage(true);
  };

  if (isLoading) {
    return (
      <Stack alignItems={"center"}>
        <CircularProgress color="secondary" aria-label="Loading prices" />
      </Stack>
    );
  }

  if (isError) {
    return (
      <>
        <Alert variant="filled" severity="error">
          Unable to load prices!
        </Alert>
      </>
    );
  }

  if (isSuccess && data) {
    return (
      <Stack
        component={"form"}
        onSubmit={handleFormSubmit}
        rowGap={{ xs: 1, md: 2 }}
      >
        <Typography variant="body1" component={"h3"} fontWeight={"bold"}>
          Select Pack
        </Typography>
        <Stack flexDirection={"row"}>
          {data.packs.map((pack, i) => {
            return (
              <PricePack
                info={pack}
                selected={selectedPack}
                onChange={handleChange}
                packId={i}
                key={i}
              />
            );
          })}
        </Stack>
        <Button
          variant="contained"
          type="submit"
          sx={{
            py: 1.5,
            fontSize: "1rem",
            width: { sx: "100%", md: "fit-content" },
          }}
          startIcon={<AddShoppingCartIcon />}
          disabled={selectedPack === null}
        >
          Add to Cart
        </Button>
        <AlertSnackbar
          isOpen={showSubmitMessage}
          severity="success"
          message={"Added to cart!"}
          setOpen={setShowSubmitMessage}
          duration={2000}
        />
      </Stack>
    );
  }
}

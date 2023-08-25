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

export default function PackContainer({ id }: { id: number }) {
  const { data, isLoading, isError, isSuccess } = useFetchPrice(id);
  const [selectedPack, setSelectedPack] = useState<number | null>(null);

  const handleChange: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void = (e) => {
    setSelectedPack(Number(e.target.value));
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
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedPack !== null) {
            console.log(data.packs[selectedPack]);
          }
        }}
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
      </Stack>
    );
  }
}

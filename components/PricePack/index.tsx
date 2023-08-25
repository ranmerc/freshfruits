import { Box, Radio, Stack, Typography } from "@mui/material";
import { Pack } from "@/types/PriceData";
import { ChangeEvent } from "react";

function PackDetails({ info, selected }: { info: Pack; selected: boolean }) {
  const discount = Math.abs(
    Math.round(((info.price - info.discountPrice) / info.price) * 100)
  );

  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundColor: info.inStock ? "primary.main" : "gray",
            borderRadius: "8px 8px 0 0",
            textAlign: "center",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "primary.contrastText",
              fontWeight: "bold",
              px: 1,
            }}
          >
            {info.inStock
              ? discount
                ? `${discount}% off`
                : "Fixed Price"
              : `Out of Stock`}
          </Typography>
        </Box>

        <Stack
          sx={{
            py: 1,
            px: 2,
            border: "1px solid",
            borderColor: selected ? "secondary.main" : "inherit",
            borderRadius: "0 0 8px 8px",
            backgroundColor: selected ? "secondary.main" : "inherit",
            color: selected ? "secondary.contrastText" : "inherit",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"} columnGap={0.5} alignItems={"baseline"}>
            <Typography variant="body1" fontWeight={"bold"}>
              ₹{info.discountPrice}
            </Typography>
            {!!discount && (
              <Typography
                variant="body2"
                sx={{ textDecoration: "line-through" }}
              >
                ₹{info.price}
              </Typography>
            )}
          </Stack>

          <Typography variant="caption" textAlign={"center"}>
            {info.quantity} {info.type === "count" ? "Nos" : "g"}
          </Typography>
        </Stack>
      </Box>
    </>
  );
}

export default function PricePack({
  info,
  onChange,
  selected,
  packId,
}: {
  info: Pack;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  selected: number | null;
  packId: number;
}) {
  const currentSelected = selected === packId;

  return (
    <>
      <Radio
        checked={currentSelected}
        onChange={onChange}
        value={packId}
        name="price-packs"
        inputProps={{
          "aria-label": `${info.quantity} for ${info.discountPrice}`,
        }}
        icon={<PackDetails info={info} selected={currentSelected} />}
        checkedIcon={<PackDetails info={info} selected={currentSelected} />}
        disabled={!info.inStock}
      />
    </>
  );
}

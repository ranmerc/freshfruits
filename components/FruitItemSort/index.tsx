import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";

export default function FruitItemSort({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
}) {
  return (
    <>
      <FormControl
        sx={{
          alignSelf: { xs: "center", md: "end" },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          columnGap: 1,
          flexWrap: "wrap",
        }}
      >
        <InputLabel id="sort-label">Sort by</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={value}
          label="Sort by"
          onChange={onChange}
          sx={{ width: "25ch" }}
        >
          <MenuItem value={"price-low-high"}>Price: Low to High</MenuItem>
          <MenuItem value={"price-high-low"}>Price: High to Low</MenuItem>
          <MenuItem value={"name"}>Name: A to Z</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

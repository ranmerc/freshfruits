import FruitData from "@/types/FruitData";
import { Box, Stack, Typography } from "@mui/material";

export default function AboutProduct({ fruitData }: { fruitData: FruitData }) {
  return (
    <Box>
      <Typography variant="h5" component="h2" fontWeight={"bold"} mb={1.5}>
        Fruit Details
      </Typography>
      <Stack spacing={1}>
        <Box>
          <Typography variant="body1" component="h3" fontWeight={"bold"}>
            Description
          </Typography>
          <Typography variant="body2">{fruitData.description}</Typography>
        </Box>
        <Box>
          <Typography variant="body1" component="h3" fontWeight={"bold"}>
            Shelf Life
          </Typography>
          <Typography variant="body2">{fruitData.shelfLife} days</Typography>
        </Box>
        <Box>
          <Typography variant="body1" component="h3" fontWeight={"bold"}>
            Storage Instructions
          </Typography>
          <Typography variant="body2">
            {fruitData.storageInstructions}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" component="h3" fontWeight={"bold"}>
            Country of Origin
          </Typography>
          <Typography variant="body2">{fruitData.countryOfOrigin}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

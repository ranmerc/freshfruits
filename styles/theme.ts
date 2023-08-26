import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#4f9a30",
      },
      secondary: {
        main: "#F3B61F",
      },
      error: {
        main: "#F44336",
      },
      warning: {
        main: "#FF5722",
      },
      info: {
        main: "#2196F3",
      },
      success: {
        main: "#4CAF50",
      },
    },
  })
);

export default theme;

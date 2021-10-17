import { useTheme } from "@mui/material";
import { createUseStyles } from "react-jss";

const useThemeStyles = (getStyles) => {
  const theme = useTheme();
  return createUseStyles(getStyles(theme))();
};

export default useThemeStyles;

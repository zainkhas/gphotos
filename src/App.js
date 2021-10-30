import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeNavigator from "./navigation/HomeNavigator";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import useSnackBar from "./hooks/useSnackBar";

function App() {
  const { SnackBarAlert } = useSnackBar();
  return (
    <Router>
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Route exact path="/">
          <HomeNavigator />
        </Route>
        <SnackBarAlert />
      </ThemeProvider>
    </Router>
  );
}

export default App;

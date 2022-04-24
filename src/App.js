import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";
import useSnackBar from "./hooks/useSnackBar";
import Home from "./screens/home/Home";
import Upload from "./screens/upload/Upload";

function App() {
  const { SnackBarAlert } = useSnackBar();
  return (
    <Router>
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <SnackBarAlert />
      </ThemeProvider>
    </Router>
  );
}

export default App;

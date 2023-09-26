import { Box, CircularProgress } from "@material-ui/core";
import { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { UserContext } from "./context/User";
import { ROUTES } from "./utils/constant";

function App() {
  const { isLoggedIn, loadingProfile } = useContext(UserContext);

  const ProtectedRoute = ({ component: Comp, loggedIn, accessRequired, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          if (loggedIn && accessRequired) {
            return <Redirect to="/Home" />;
          }
          return <Comp {...props} />;
        }}
      />
    );
  };

  if (isLoggedIn === undefined || loadingProfile) {
    return (
      <Box component="div" display="flex" alignItems="center" justifyContent="center" height="100vh" width="100vw">
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <Router>
      <Switch>
        {ROUTES.map((prop, key) => {
          if (!prop.authRequired || (prop.authRequired && isLoggedIn)) {
            return (
              <ProtectedRoute
                loggedIn={isLoggedIn}
                accessRequired={prop.accessRequired}
                path={prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return <Redirect key={key} from={prop.path} to={`/Login?redirect=${prop.path}`} />;
          }
        })}
        <Redirect exact from="/" to="Home" />
      </Switch>
    </Router>
  );
}

export default App;

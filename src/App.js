import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import AppRoute from "./components/AppRoute";
import "react-datepicker/dist/react-datepicker.css";
import AppContext from "./context";
import { initialState, AppReducer } from "./context/reducer";
import {
  errorResponseActions,
  formActions,
  authActions,
  commonActions,
  cartActions,
} from "./context/actions";
import Master from "./layout/Master";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "@djthoms/pretty-checkbox";
import { NotificationContainer } from "react-notifications";
import { UserDataProvider } from "./context/auth/user";
import { DeliveryPriceContextProvider } from "./context/DeliveryPrice";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchAllOnWindowFocus: false,
      refetchOnWindowFocus: false,
    },
  },
});

const images = [
  //"http://res.cloudinary.com/dq1zd0mue/image/upload/v1624361226/di2azpa6jyvky3x3xgzl.jpg"
];

const cacheImages = async (srcArray) => {
  const promises = await srcArray.map((src) => {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.src = src;
      img.onload = resolve();
      img.onerror = reject();
    });
  });
  await Promise.all(promises);
};

function App() {
  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  const bootstrapAsync = async () => {
    let userData, userToken, cartSessionId, prescriptionRequested;
    userData =
      JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_DATA)) || null;
    userToken = localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || null;
    cartSessionId =
      localStorage.getItem(process.env.REACT_APP_CART_SESSION_ID) || null;
    prescriptionRequested =
      JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_PRESC)) ||
      false;

    //await cacheImages(images);
    dispatch({
      type: "APP_READY",
      userToken,
      userData,
      cartSessionId,
      prescriptionRequested,
    });
  };

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (state.appIsReady) {
        //await cartActions.getCartItems(dispatch);
      }
    })();
  }, [state.appIsReady]);

  return (
    <UserDataProvider>
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider
          value={{
            dispatch,
            ...state,
            ...authActions,
            ...errorResponseActions,
            ...formActions,
            ...commonActions,
            ...cartActions,
          }}
        >

          <DeliveryPriceContextProvider>
          {state.appIsReady ? (
            <Master>
              <NotificationContainer />
              <Switch>
                {routes
                  .filter((dt) => dt?.route)
                  .map(({ exact, path, component, auth, pageTitle }) => (
                    <AppRoute
                      key={path}
                      path={path}
                      exact={exact}
                      component={component}
                      auth={auth}
                      pageTitle={pageTitle}
                    />
                  ))}
              </Switch>
            </Master>
          ) : (
            <></>
          )}
          </DeliveryPriceContextProvider>
        </AppContext.Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserDataProvider>
  );
}

export default App;

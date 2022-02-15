// import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useMemo } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

import SuiBox from "components/SuiBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import {
  useSoftUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import brand from "assets/images/logo-ct.png";

export default function App() {
    
    const [controller, dispatch] = useSoftUIController();
    const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const [rtlCache, setRtlCache] = useState(null);
    const { pathname } = useLocation();

    // Cache for the rtl
    useMemo(() => {
        const cacheRtl = createCache({
            key: "rtl",
            stylisPlugins: [rtlPlugin],
        });

        setRtlCache(cacheRtl);
    }, []);

    // Open sidenav when mouse enter on mini sidenav
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
        setMiniSidenav(dispatch, false);
        setOnMouseEnter(true);
        }
    };

    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
        setMiniSidenav(dispatch, true);
        setOnMouseEnter(false);
        }
    };

    // Change the openConfigurator state
    const handleConfiguratorOpen = () => {
        setOpenConfigurator(dispatch, !openConfigurator);
    }

    useEffect(() => {
        // Setting the dir attribute for the body element
        document.body.setAttribute("dir", direction);

        // Setting page scroll to 0 when changing the route
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [direction, pathname]);

    const getRoutes = (allRoutes) =>
    allRoutes.map((route, index) => {
        if (route.collapse) {
            return getRoutes(route.collapse);
        }

        if (route.route) {
            return (
            <Route
                exact
                path={route.route}
                component={route.component}
                key={index}
            />
            );
        }

        return null;
    });

    const configsButton = (
        <SuiBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="3.5rem"
        height="3.5rem"
        bgColor="white"
        shadow="sm"
        borderRadius="50%"
        position="fixed"
        right="2rem"
        bottom="2rem"
        zIndex={99}
        color="dark"
        sx={{ cursor: "pointer" }}
        onClick={handleConfiguratorOpen}
        >
        <Icon fontSize="default" color="inherit">
            settings
        </Icon>
        </SuiBox>
    );

    return direction === "rtl" ? (
        <CacheProvider value={rtlCache}>
        <ThemeProvider theme={themeRTL}>
            <CssBaseline />
            {layout === "dashboard" && (
            <>
                <Sidenav
                color={sidenavColor}
                brand={brand}
                brandName="Soft UI Dashboard"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
            </>
            )}
            {layout === "vr" && <Configurator />}
            <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/dashboard" />
            </Switch>
        </ThemeProvider>
        </CacheProvider>
    ) : (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === "dashboard" && (
            <>
            <Sidenav
                color={sidenavColor}
                brand={brand}
                brandName="Dashboard"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
            </>
        )}
        {layout === "vr" && <Configurator />}
        <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/authentication/sign-in" />
        </Switch>
        </ThemeProvider>
    );
}

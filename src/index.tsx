import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import '@epam/assets/theme/theme_loveship.scss';
import './index.module.scss';
import logo from './icons/logo.svg';
//
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserHistory } from 'history';
import { Route, Router } from 'react-router-dom';
import {
    DragGhost,
    HistoryAdaptedRouter,
    useUuiServices,
    UuiContext,
} from '@epam/uui-core';
import { MainMenu, MainMenuButton } from '@epam/uui';
import { ErrorHandler } from '@epam/uui';
import { Modals, Snackbar } from '@epam/uui-components';
import { svc } from './services';

import { MainPage } from './pages/MainPage';
import HomePage from './pages/HomePage';
import OtherPage from './pages/OtherPage';

const history = createBrowserHistory();
const router = new HistoryAdaptedRouter(history);

function UuiEnhancedApp() {
    const { services } = useUuiServices({ router });
    Object.assign(svc, services);
    return (
        <UuiContext.Provider value={services}>
            <ErrorHandler>
                <Router history={history}>
                    <Route>
                        <MainMenu appLogoUrl={logo}>
                            <MainMenuButton
                                caption="Start"
                                link={{ pathname: '/vite-expo/' }}
                                priority={1}
                                estimatedWidth={72}
                            />
                            <MainMenuButton
                                caption="Home"
                                link={{ pathname: '/vite-expo/home' }}
                                priority={1}
                                estimatedWidth={72}
                            />
                            <MainMenuButton
                                caption="Other"
                                link={{ pathname: '/vite-expo/other' }}
                                priority={1}
                                estimatedWidth={72}
                            />
                        </MainMenu>
                    </Route>
                    <Route path="/" component={MainPage} />
                    <Route path="/home" component={HomePage} />
                    <Route path="/other" component={OtherPage} />
                </Router>
                <Snackbar />
                <Modals />
                <DragGhost />
            </ErrorHandler>
        </UuiContext.Provider>
    );
}

function initApp() {
    const root = createRoot(window.document.getElementById('root') as Element);
    root.render(
        <StrictMode>
            <UuiEnhancedApp />
        </StrictMode>,
    );
}

initApp();

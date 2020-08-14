import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import styles from './App.module.css'

import { AlertHandler } from './notifications'
import { Navigation } from './navigation'
import {
    GATEWAY_CONFIG_FORM_EDIT_PATH,
    GATEWAY_CONFIG_FORM_NEW_PATH,
    GATEWAY_CONFIG_LIST_PATH,
    GatewayConfigFormEdit,
    GatewayConfigFormNew,
    GatewayConfigList,
    HOME_PATH,
    Home,
    NoMatch,
} from './views'
import { dataTest } from './dataTest'

const App = () => (
    <AlertHandler>
        <BrowserRouter>
            <div className={styles.container} data-test={dataTest('app')}>
                <div className={styles.sidebar}>
                    <Navigation />
                </div>

                <main className={styles.content}>
                    <Switch>
                        <Route exact path={HOME_PATH} component={Home} />

                        <Route path="/sms-gateway">
                            <Route
                                exact
                                path={GATEWAY_CONFIG_FORM_EDIT_PATH}
                                component={GatewayConfigFormEdit}
                            />

                            <Route
                                exact
                                path={GATEWAY_CONFIG_FORM_NEW_PATH}
                                component={GatewayConfigFormNew}
                            />

                            <Route
                                exact
                                path={GATEWAY_CONFIG_LIST_PATH}
                                component={GatewayConfigList}
                            />

                            <Redirect
                                from="/sms-gateway"
                                to={GATEWAY_CONFIG_LIST_PATH}
                            />
                        </Route>

                        <Route component={NoMatch} />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    </AlertHandler>
)

export default App

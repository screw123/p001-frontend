//Private route (need login) component for use with React Router v4

import React from "react";
import { Route, Redirect } from "react-router-dom"

import { GqlApiSubscriber } from '../stateContainer/GqlApi.js'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <GqlApiSubscriber>
    {(c) => (
        <Route
            {...rest}
            render={props =>
                c.state.isLogined ? ( <Component {...props} /> ) : ( <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                /> )
            }
        />
    )}
    </GqlApiSubscriber>
)

export default PrivateRoute
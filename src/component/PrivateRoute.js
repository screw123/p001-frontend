//Private route (need login) component for use with React Router v4

import React from "react";
import { Route, Redirect } from "react-router-dom"

import { GqlApiSubscriber } from '../stateContainer/GqlApi.js'

const PrivateRoute = ({ component: Component, stateContainer: stateContainer, ...rest }) => {
    console.log('PrivateRoute', Component, rest)
    return (
    <GqlApiSubscriber>
    {(c) => (
        <Route
            {...rest}
            render={(location, ...props) =>
                c.state.isLogined ? ( <Component location={location} {...props} {...stateContainer} /> ) : ( <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                /> )
            }
        />
    )}
    </GqlApiSubscriber>
)}

export default PrivateRoute
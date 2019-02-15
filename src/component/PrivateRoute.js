//Private route (need login) component for use with React Router v4

import React from "react";
import { Route, Redirect } from "react-router-dom"

import { GqlApiSubscriber } from '../stateContainer/GqlApi.js'

const PrivateRoute = ({ component: Component, stateContainer: stateContainer, ...rest }) => {
    
    return (
    <GqlApiSubscriber>
    {(c) => {
        return (
        <Route
            {...rest}
            render={({location: {pathname, state}, ...props}) => {
                return c.state.isLogined ? ( <Component location={{state: state}} {...props} {...stateContainer} /> ) : ( <Redirect
                    to={{
                        pathname: "/login",
                        state: { nextPath: pathname, passOnState: state}
                    }}
                /> )
            }}
        />
    )}}
    </GqlApiSubscriber>
)}

export default PrivateRoute
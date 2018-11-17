import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faPlusCircle, faWindowClose, faBell, faUser, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

import { BrowserRouter, Route } from 'react-router-dom'
import routes from './routes.js'

import Navbar from './component/Navbar.js'
import PrivateRoute from './component/PrivateRoute.js'

import {BigLoadingScreen } from './component/Loading.js'

import GqlApi, { GqlApiProvider, DummyPassHistory, GqlApiSubscriber } from './stateContainer/GqlApi.js'

const MainContainer = styled.div`
    display: grid;
    grid-template-rows: [navbar] auto [body] auto [end];
    grid-template-columns: auto;
`

class App extends React.Component {
    componentDidMount() {
        GqlApi.checkLogined()
        library.add(faEye, faEyeSlash, faPlusCircle, faWindowClose, faBell, faUser, faEdit, faTrashAlt)
    }
    
    genItems = ({routes, container}) => {
        let c = []
        for (var i = 0; i < routes.length; i++) {
            if (routes[i].path) {
                let Com = routes[i].component
                if (routes[i].requireLogin) {
                    c.push(<PrivateRoute
                        render={(props) => <Com {...props} container={container} />}
                        exact={routes[i].exact}
                        path={routes[i].path}
                        key={i}
                        container={container}
                    />)
                }
                else {
                    c.push(<Route
                        render={(props) => <Com {...props} container={container} />}
                        exact={routes[i].exact}
                        path={routes[i].path}
                        key={i}
                        container={container}
                    />)
                }
            }
        }
        return c
    }
    render() {
        return (
            <BrowserRouter><GqlApiProvider><GqlApiSubscriber>
            {(g)=>(
                <div>
                    {((g.state.isLogined===true)||(g.state.isLogined===false)) && <MainContainer>
                        <DummyPassHistory />  {/*Load this to add the history obj into GqpApi state */}
                        {this.genItems({routes: routes, container: {gqlapi: g}})}  {/* Put routes.js all into react-router */}
                        <Navbar routes={routes} />  {/* Generate NavBar Component */}
                    </MainContainer>}
                    {(!((g.state.isLogined===true)||(g.state.isLogined===false))) && <div>
                        <BigLoadingScreen />
                    </div>}
                </div>
            )}
            </GqlApiSubscriber></GqlApiProvider></BrowserRouter>
        )
    }
}

export default App
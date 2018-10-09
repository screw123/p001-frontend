import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faPlusCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'

import { BrowserRouter, Route } from 'react-router-dom'
import routes from './routes.js'

import Navbar from './component/Navbar.js'
import PrivateRoute from './component/PrivateRoute.js'

import {BigLoadingScreen } from './component/Loading.js'

import GqlApi, { GqlApiProvider, DummyPassHistory, GqlApiSubscriber } from './stateContainer/GqlApi.js'

class App extends React.Component {
    componentDidMount() {
        GqlApi.checkLogined()
        library.add(faEye, faEyeSlash, faPlusCircle, faWindowClose)
    }
    
    genItems = (routes) => {
        let c = []
        for (var i = 0; i < routes.length; i++) {
            if (routes[i].requireLogin) {
                c.push(<PrivateRoute
                    component={routes[i].component}
                    exact={routes[i].exact}
                    path={routes[i].path}
                    key={i}
                />)
            }
            else {
                c.push(<Route
                    component={routes[i].component}
                    exact={routes[i].exact}
                    path={routes[i].path}
                    key={i}
                />)
            }
        }
        return c
    }
    render() {
        return (
            <BrowserRouter>
                <GqlApiProvider>
                    <GqlApiSubscriber>
                    {(g)=>(
                        <div>
                            {((g.state.isLogined===true)||(g.state.isLogined===false)) && <div>
                                <DummyPassHistory />
                                <Navbar routes={routes} />
                                {this.genItems(routes)}
                            </div>}
                            {(!((g.state.isLogined===true)||(g.state.isLogined===false))) && <div>
                                <BigLoadingScreen />
                            </div>}
                        </div>
                    )}
                    </GqlApiSubscriber>
                </GqlApiProvider>
            </BrowserRouter>
        )
    }
}

export default App
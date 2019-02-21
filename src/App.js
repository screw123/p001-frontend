import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faPlusCircle, faWindowClose, faBell, faUser, faEdit, faTrashAlt, faCreditCard, faSearch, faSignInAlt, faFileInvoice, faBoxes, faTruckLoading } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components'

import get from 'lodash/get'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes, {NotFound} from './routes.js'

import Navbar from './component/Navbar.js'
import PrivateRoute from './component/PrivateRoute.js'
import {Background} from './component/BasicComponents.js'

import {BigLoadingScreen } from './component/Loading.js'

import GqlApi, { GqlApiProvider, DummyPassHistory, GqlApiSubscriber } from './stateContainer/GqlApi.js'
import LocaleApi, {LocaleApiProvider, LocaleApiSubscriber} from './stateContainer/LocaleApi.js'

const MainContainer = styled.div`
    display: grid;
    grid-template-rows: [navbar] auto [body] auto [end];
    grid-template-columns: auto;
`

class App extends React.Component {
    constructor(props) {
        super(props)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        GqlApi.checkLogined()
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        library.add(faEye, faEyeSlash, faPlusCircle, faWindowClose, faBell, faUser, faEdit, faTrashAlt,  faCcVisa, faCcMastercard, faCcAmex, faCreditCard, faAddressCard, faSearch, faSignInAlt, faFileInvoice, faBoxes, faTruckLoading)
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions = () => LocaleApi.updateWindowDimensions({ width: window.innerWidth, height: window.innerHeight })

    genItems = ({routes, stateContainer}) => {
        let c = []
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].path) {
                const Com = routes[i].component
                if (routes[i].router.requireLogin) {
                    c.push(<PrivateRoute
                        component={Com}
                        exact={routes[i].exact}
                        path={routes[i].path}
                        key={i}
                        stateContainer={stateContainer}
                    />)
                }
                else {
                    c.push(<Route
                        render={(props) => <Com {...props} {...stateContainer} />}
                        exact={routes[i].exact}
                        path={routes[i].path}
                        key={i}
                    />)
                }
                
            }
        }
        c.push(<Route render={(props) => <NotFound {...props} {...stateContainer} />} key={'NotFound'} /> )
        return <Switch>{c}</Switch>
    }

    render() {
        return (
            <BrowserRouter><GqlApiProvider><GqlApiSubscriber>
            {(g)=>{
                return(
                <LocaleApiProvider><LocaleApiSubscriber>
                {(c) =>(
                    <React.Fragment>
                        {((g.state.isLogined===true)||(g.state.isLogined===false)) && <MainContainer>
                            <DummyPassHistory />  {/*Load this to add the history obj into GqpApi state */}
                            {this.genItems({routes: routes, stateContainer: {login: g, i18n: c}})}  {/* Put routes.js all into react-router */}
                            {(get(g, 'state.history.location.pathname', undefined) !=='/') && <Navbar routes={routes} />}
                            {/*<Navbar routes={routes} />   THE ORIGINAL.  USE THIS WHEN GO LIVE Generate NavBar Component */}
                        </MainContainer>}
                        {(!((g.state.isLogined===true)||(g.state.isLogined===false))) && <div>
                            <BigLoadingScreen />
                        </div>}
                    </React.Fragment>
                )}
                </LocaleApiSubscriber></LocaleApiProvider>
            )}}
            </GqlApiSubscriber></GqlApiProvider></BrowserRouter>
        )
    }
}

export default App
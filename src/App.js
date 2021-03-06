import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faPlusCircle, faWindowClose, faBell, faUser, faEdit, faTrashAlt, faCreditCard, faSearch, faSignInAlt, faFileInvoice, faBoxes, faTruckLoading, faTimes } from '@fortawesome/free-solid-svg-icons'
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

import {Helmet} from "react-helmet";

const MainContainer = styled.div`
    display: grid;
    grid-template-rows: [start] auto [navbar] auto [body] auto [end];
`

class App extends React.Component {
    constructor(props) {
        super(props)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.updateWindowPosition = this.updateWindowPosition.bind(this)
    }

    componentDidMount() {
        GqlApi.checkLogined()
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        window.addEventListener('scroll', this.updateWindowPosition)
        library.add(faEye, faEyeSlash, faPlusCircle, faWindowClose, faBell, faUser, faEdit, faTrashAlt,  faCcVisa, faCcMastercard, faCcAmex, faCreditCard, faAddressCard, faSearch, faSignInAlt, faFileInvoice, faBoxes, faTruckLoading, faTimes)
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions = () => LocaleApi.updateWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
    updateWindowPosition = () => LocaleApi.updateWindowPosition({ scrollTop: window.scrollTop })

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
                        <Helmet>
                            <script src={'https://embed.tawk.to/5ca7579853f1e453fb8c4b1a/' + (c.state.i18n.language==='en'? '1d85f36us': 'default')} async={true} charset='UTF-8' crossorigin='*'></script>
                        </Helmet>
                        {((g.state.isLogined===true)||(g.state.isLogined===false)) && <MainContainer>
                            <DummyPassHistory />  {/*Load this to add the history obj into GqpApi state */}
                            {this.genItems({routes: routes, stateContainer: {login: g, i18n: c}})}  {/* Put routes.js all into react-router */}
                            <Navbar routes={routes} g={g} c={c} />
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

//Use anchor https://stackoverflow.com/questions/40280369/use-anchors-with-react-router
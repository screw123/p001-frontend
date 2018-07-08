import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import routes from './routes.js'

import Navbar from './component/Navbar.js'
import PrivateRoute from './component/PrivateRoute.js'

import GqlApi, { GqlApiProvider } from './container/GqlApi.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {
    constructor() {
        super()
        if (!GqlApi.state.isLogined) {
            GqlApi.checkLogined()
        }
        library.add(faEyeSlash)
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
                    <div>
                        <Navbar routes={routes} />
                        {this.genItems(routes)}
                    </div>
                </GqlApiProvider>
            </BrowserRouter>
        )
    }
}

export default App;


/*
class LoginButton extends Component {
    
    render() {
    return (
        <Subscribe to={[containerLogin]}>
        {(login) => {
            return (
            <div>
                <h1>XXX company</h1>
                <p>This is first page!</p>
                <button onClick={login.login}>{(login.state.logined ? 'Logined!':'Login?')}</button>
                <p>{JSON.stringify(login.state.data)}</p>
                <p>{JSON.stringify(login.state.moredata)}</p>
            </div>
        )}}
        </Subscribe>
    );
  }
}
*/


/*class containerLogin extends Container {
    state={
        email: '',
        pw: '',
        logined: false,
        data: {},
        moredata: {}
    }
    
    login= async () => {
        try {
            const f = await request.post('https://cd.nicecar.hk/l').set({'Access-Control-Allow-Origin': 'https://cd.nicecar.hk'}).withCredentials().type('form').query('email=ross@nicecar.hk').query('password=aaaaaaaa1')
            
    	        headers: { 
    	            'Access-Control-Allow-Origin': 'http://cd.nicecar.hk'
    	            //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    	        },
    	        withCredentials: true
            })
            console.log('fetch ok', f)
            this.setState({logined: true})
            //const d = await client.query({query: getUser})
            //this.setState({data: d})
        } catch(e) { console.log('err', e.response) }
        
    }
}
*/


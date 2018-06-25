import React, { Component } from 'react'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import gql from "graphql-tag"
import request from 'superagent'
import { Provider, Subscribe, Container } from 'unstated'
import LoginPage from './page/LoginPage.js'

const client = new ApolloClient({
    link: new HttpLink({ uri: "https://cd.nicecar.hk/graphql", credentials: 'include' }),
    cache: new InMemoryCache(),
    onError: (e) => { console.log("Apollo Client Error:", e) }
})

const getUser = gql`
    query {
        getUser{
            _id
            firstName
            lastName
            email
            mobilePhone
        }
    }`

const whs = gql`
    query {
        getWHS{
            _id
            name
            description
        }
    }`


class containerLogin extends Container {
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
                /*
    	        headers: { 
    	            'Access-Control-Allow-Origin': 'http://cd.nicecar.hk'
    	            //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    	        },
    	        withCredentials: true
            })*/
            console.log('fetch ok', f)
            this.setState({logined: true})
            const d = await client.query({query: getUser})
            this.setState({data: d})
        } catch(e) { console.log('err', e.response) }
        
    }
    
    moreQuery= async (gql) => {
        try {
            const d = await client.query({query: gql})
            this.setState({moredata: d})
        } catch(e) { console.log('err', e.response) }
    }
    
}

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <LoginPage />
            </ApolloProvider>
        )
    }
}

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
                <button onClick={() => login.moreQuery(whs)}>More Data!</button>
                <p>{JSON.stringify(login.state.data)}</p>
                <p>{JSON.stringify(login.state.moredata)}</p>
            </div>
        )}}
        </Subscribe>
    );
  }
}

export default App;

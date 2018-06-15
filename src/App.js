import React, { Component } from 'react'
import ApolloClient from "apollo-boost"
import fetch from 'node-fetch'
import { Provider, Subscribe, Container } from 'unstated'

const client = new ApolloClient({
    uri: "https://cd.nicecar.hk/graphql"
})

class containerLogin extends Container {
    state={
        logined: false,
        info: {}
    }
    
    login= () => {
        fetch('https://cd.nicecar.hk/l?email=ross@nicecar.hk&password=aaaaaaaa1')
        .then(this.setState({logined: true}))
        .then(fetch('https://cd.nicecar.hk/graphql', { 
	        method: 'POST',
	        body:    {"query": "{ getUser { _id } }"},
	        headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
        .then(json => this.setState({info: json}))
        )
        .catch(err => console.log(err))
    }
    
}

class App extends Component {

    
    
  render() {
    return (
        <Provider>
            <LoginButton />
        </Provider>
    );
  }
}

class LoginButton extends Component {
    
    render() {
    return (
        <Subscribe to={[containerLogin]}>
        {login => (
        <div>
            <button onClick={login.login}>{(login.state.logined ? 'Logined!':'Login?')}</button>
            <label>{login.state.info}</label>
        </div>
        )}
        </Subscribe>
    );
  }
}

export default App;

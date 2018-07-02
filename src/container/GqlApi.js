import React from "react";

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

import { Provider, Subscribe, Container } from "unstated";

import isEmpty from 'lodash/isEmpty'

class ApolloContainer extends Container {
    constructor() {
        super();
        
        // The state will be available to any component we inject
        // the Container instance into
        this.state = {
            gqlClient: {},
            gqlClientPublic: {},
            isLogined: false,
            uid: ''
        }
    }
    
    // These methods will also be avaiable anywhere we inject our
    // container context
    
    getGqlClient() {
        if (isEmpty(this.state.gqlClient)) {
            const gqlClient = new ApolloClient({
                link: new HttpLink({ uri: "https://cd.nicecar.hk/gql", credentials: 'include' }),
                cache: new InMemoryCache(),
                onError: (e) => { console.log("Apollo Client Error:", e) }
            })
            this.setState({gqlClient: gqlClient})
            return gqlClient
        }
        else { return this.state.gqlClient }
    }
    
    getGqlClientPublic() {
        if (isEmpty(this.state.gqlClientPublic)) {
            const gqlClientPublic = new ApolloClient({
                link: new HttpLink({ uri: "https://cd.nicecar.hk/gqlPublic"}),
                cache: new InMemoryCache(),
                onError: (e) => { console.log("Apollo Public Client Error:", e) }
            })
            this.setState({gqlClientPublic: gqlClientPublic})
            return gqlClientPublic
        }
        else { return this.state.gqlClientPublic }
    }
    
    setLogined(b) {
        this.setState({isLogined: b})
    }
    
    setUid(id) {
        this.setState({uid: id})
    }
    
}

const GqlApi = new ApolloContainer();

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies reuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
export const GqlApiProvider = props => {
  // We leave the injector flexible, so you can inject a new dependency
  // at any time, eg: snapshot testing
  return <Provider inject={props.inject || [GqlApi]}>{props.children}</Provider>;
};

export const GqlApiSubscriber = props => {
  // We also leave the subscribe "to" flexible, so you can have full
  // control over your subscripton from outside of the module
  return <Subscribe to={props.to || [GqlApi]}>{props.children}</Subscribe>;
};

export default GqlApi;

// IMPORT NOTE:
// With the above export structure, we have the ability to
// import like this:

// import Api, {ApiProvider, ApiSubscribe, ApiContainer}

// Api: Singleton Api instance, exported as default.
//      Contains your instantiated .state and methods.

// ApiProvider: Context Provider...
//      Publishes your React Context into the top of the
//      React App into the component tree.

// ApiSubscribe: Context Subsriber...
//      Subscribes to the higher Context from any place
//      lower than the point at which the Context was provided.

// ApiContainer:Context Container Class...
//      Used to instantiate new copy of your service if so desired.
//      Can be used for testing, or subsrcibing your class to a new
//      data source that uses the same data model/methods.

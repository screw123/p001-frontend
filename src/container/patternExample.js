import React from "react";
import { Provider, Subscribe, Container } from "unstated";

class UserAcctContainer extends Container {
  constructor() {
    super();

    // The state will be available to any component we inject
    // the Container instance into
    this.state = {
        loggedIn: false
    }
  }

  // These methods will also be avaiable anywhere we inject our
  // container context
  async login() {
    console.log("Logging in");
    this.setState({ loggedIn: true });
  }

  async logout() {
    console.log("Logging out");
    this.setState({ loggedIn: false });
  }
}

const Api = new UserAcctContainer();

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
export const ApiProvider = props => {
  // We leave the injector flexible, so you can inject a new dependency
  // at any time, eg: snapshot testing
  return <Provider inject={props.inject || [Api]}>{props.children}</Provider>;
};

export const ApiSubscribe = props => {
  // We also leave the subscribe "to" flexible, so you can have full
  // control over your subscripton from outside of the module
  return <Subscribe to={props.to || [Api]}>{props.children}</Subscribe>;
};

export default Api;

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

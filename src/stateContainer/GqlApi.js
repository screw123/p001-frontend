//This module check and manage user login, and keep GraphQL client objects in state
//Also keep user info in state if user has logined

import React from "react";

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
//import { HttpLink } from 'apollo-link-http'
import { BatchHttpLink } from "apollo-link-batch-http";
import { withRouter } from 'react-router'
import { Provider, Subscribe, Container } from "unstated";

import isEmpty from 'lodash/isEmpty'

import request from 'superagent'

import { getMyself } from '../gql/query.js'

import union from 'lodash/union'


class ApolloContainer extends Container {
    constructor() {
        super()

        // The state will be available to any component we inject
        // the Container instance into
        this.state = {
            gqlClient: {},
            gqlClientPublic: {},
            isLogined: undefined,
            history: { push: () => { } }, //this should go to its own container, fixme later
            myself: {
                _id: '',
                firstName: '',
                lastName: '',
                email: '',
                mobilePhone: '',
                accountOwn_id: [{
                    _id: '',
                    name: '',
                    accountType: '',
                    balance: 0,
                    isActive: false
                }],
                accountManage_id: [],
                accountView_id: []
            }
        }
        this.getGqlClient = this.getGqlClient.bind(this)
    }
    // These methods will also be avaiable anywhere we inject our
    // container context

    getGqlClient() {
        if (isEmpty(this.state.gqlClient)) {
            const gqlClient = new ApolloClient({
                link: new BatchHttpLink({ uri: "https://wisekeep.hk/api/gql", credentials: 'include' }),
                cache: new InMemoryCache(),
                onError: (e) => { console.log("Apollo Client Error:", e) }
            })
            this.setState({ gqlClient: gqlClient })
            return gqlClient
        }
        else { return this.state.gqlClient }
    }

    getGqlClientPublic() {
        if (isEmpty(this.state.gqlClientPublic)) {
            const gqlClientPublic = new ApolloClient({
                link: new BatchHttpLink({ uri: "https://wisekeep.hk/api/gqlPublic" }),
                cache: new InMemoryCache(),
                onError: (e) => { console.log("Apollo Public Client Error:", e) }
            })
            this.setState({ gqlClientPublic: gqlClientPublic })
            return gqlClientPublic
        }
        else { return this.state.gqlClientPublic }
    }

    getAllAccounts() {
        return union([],
            this.state.myself.accountOwn_id,
            this.state.myself.accountManage_id,
            this.state.myself.accountView_id
        )
    }

    getManagedAccounts() {
        return union([],
            this.state.myself.accountOwn_id,
            this.state.myself.accountManage_id
        )
    }

    async checkLogined() {
        if (this.state.isLogined === undefined) {
            this.setState({
                isLogined: new Promise(async (resolve) => {
                    try {
                        const res = await request.get('https://wisekeep.hk/api/checkl').withCredentials()
                        if (res.statusCode === 200) {
                            const a = await this.updateMyself({})
                            this.setState({ isLogined: true })
                            return resolve(true)
                        }
                        else {
                            this.setState({ isLogined: false })
                            return resolve(false)
                        }
                    }
                    catch (e) {
                        console.log('error, login=false', e)
                        this.setState({ isLogined: false })
                        return resolve(false)
                    }

                })
            })
        }
        return this.state.isLogined
    }

    async login(userPWObj) {
        //userPWObj = {user: aaa, password: bbb}
        try {
            const res = await request.post('https://wisekeep.hk/api/l').withCredentials().type('form').query(userPWObj).ok(() => true)
            if (res.statusCode === 200) {
                const a = await this.updateMyself({})
                this.setState({ isLogined: true })
                return new Promise((resolve, reject) => resolve(true))
            }
            else if (res.statusCode === 401) {
                console.log('statusCode=401')
                return new Promise((resolve, reject) => resolve(401))
            }
            else {
                console.log('statusCode unknown')
                return new Promise((resolve, reject) => resolve(500))
            }
        } catch (e) {
            console.log('caught error, ', e)
            return new Promise((resolve, reject) => resolve(500))
        }
    }

    async logout() {
        const res = await request.get('https://wisekeep.hk/api/logout').withCredentials()
        if (res.statusCode === 200) {
            this.setState({ isLogined: false })
            this.setState({ gqlClient: {} })
            this.setState({ gqlClientPublic: {} })
            this.state.history.push('/')
        }
    }

    async updateMyself(myself) {
        const q = await this.getGqlClient().query({ query: getMyself })
        this.setState({ myself: q.data.getMyself })
    }

    setHistoryObj(obj) {
        this.setState({ history: obj })
    }

    redirect(path) {
        this.state.history.push(path)
    }

}

const GqlApi = new ApolloContainer()

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
}

export default GqlApi;

class DummyPassHistoryObj extends React.PureComponent {
    constructor(props) {
        super(props)
        GqlApi.setHistoryObj(this.props.history)
    }
    render() { return (' ') }
}

export const DummyPassHistory = new withRouter(DummyPassHistoryObj)


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

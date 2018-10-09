//The whole NavBar component is controlled here.
//Current design is app.js directly supply props to this component and all logics stores here.
//Later on depends on complexity we may split it out into more structures.

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { I18n } from 'react-i18next'
import { GqlApiSubscriber } from '../stateContainer/GqlApi.js'
import LocaleApi from '../stateContainer/LocaleApi.js'

const StickyDiv = styled.div`
    position: sticky;
    top: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #f47;
    width: 100%;
    z-index: 10;
`
const NormalMenuItem = styled(Link)`
    display: inline;
    float: left;
    margin: 0.3em;
    padding: 0.3em;
`

const RightSideMenuItem = styled.button`
    display: inline;
    float: right;
`



class Navbar extends React.PureComponent {
    
    genItems = (g, t) => {
        let c = []
        for (var i = 0; i < this.props.routes.length; i++) {
            if (g.state.isLogined===true) {
                if (this.props.routes[i].navbar.showAfterLogin===true) {
                    c.push(<NormalMenuItem to={this.props.routes[i].path} key={i}>
                        {t(this.props.routes[i].menuName)}
                    </NormalMenuItem>)
                }
            }
            else {
                if (this.props.routes[i].navbar.showBeforeLogin===true) {
                    c.push(<NormalMenuItem to={this.props.routes[i].path} key={i}>
                        {t(this.props.routes[i].menuName)}
                    </NormalMenuItem>)
                }    
            }
        }
        return c
    }
    
    render() { return (
        <GqlApiSubscriber>
        {(g) => (
            <I18n>
            {(t) => (
                <StickyDiv>
                    {this.genItems(g, t)}
                    <RightSideMenuItem onClick={() => {
                        LocaleApi.changeLanguage('en')
                        console.log('en clicked')
                    }}>
                        EN
                    </RightSideMenuItem>
                    <RightSideMenuItem onClick={() => {
                        LocaleApi.changeLanguage('zh-HK')
                        console.log('zh-HK clicked')
                    }}>
                        中
                    </RightSideMenuItem>
                    <RightSideMenuItem onClick={() => {
                        
                    }}>
                        {(g.state.isLogined) ? (g.state.myself.firstName + ' ' + g.state.myself.lastName) : t('Not Logined') }
                    </RightSideMenuItem>
                    
                </StickyDiv>
            )}
            </I18n>
        )}
        </GqlApiSubscriber>
    )}
}

export default Navbar
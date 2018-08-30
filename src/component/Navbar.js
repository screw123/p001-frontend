import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { I18n } from 'react-i18next'
import GqlApi, {GqlApiSubscriber} from '../container/GqlApi.js'
import LocaleApi from '../container/LocaleApi.js'
import getMyself from '../gql/query.js'

const StickyDiv = styled.div`
    position: sticky;
    top: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #ff9;
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
                    }}>
                        EN
                    </RightSideMenuItem>
                    <RightSideMenuItem onClick={() => {
                        LocaleApi.changeLanguage('zh-HK')
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
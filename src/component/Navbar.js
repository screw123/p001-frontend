import React from 'react'
import styled from 'styled-components'
import { I18n } from 'react-i18next'
import { Link } from 'react-router-dom'

import GqlApi from '../container/GqlApi.js'

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



class Navbar extends React.Component {
    genItems = (t) => {
        let c = []
        for (var i = 0; i < this.props.routes.length; i++) {
            if (!(this.props.routes[i].showInNavBar===false)) {
                c.push(<NormalMenuItem to={this.props.routes[i].path} key={i}>
                    {t(this.props.routes[i].menuName)}
                </NormalMenuItem>)
            }
        }
        return c
    }
    
    render = () => {
        return (
            <I18n>
            {(t, { i18n }) => (
                <StickyDiv>
                    {this.genItems(t)}
                    <RightSideMenuItem onClick={() => { i18n.changeLanguage('en'); }}>
                        EN
                    </RightSideMenuItem>
                    <RightSideMenuItem onClick={() => { i18n.changeLanguage('zh'); }}>
                        中
                    </RightSideMenuItem>
                    <RightSideMenuItem onClick={() => { }}>
                        {(GqlApi.state.isLogined)? "Hello": "Not logined"}
                    </RightSideMenuItem>
                    
                </StickyDiv>
            )}
            </I18n>
        )
    }
}

export default Navbar
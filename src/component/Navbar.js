import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import GqlApi from '../container/GqlApi.js'
import LocaleApi from '../container/LocaleApi.js'

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
    genItems = () => {
        let c = []
        for (var i = 0; i < this.props.routes.length; i++) {
            if (!(this.props.routes[i].showInNavBar===false)) {
                c.push(<NormalMenuItem to={this.props.routes[i].path} key={i}>
                    {LocaleApi.t(this.props.routes[i].menuName)}
                </NormalMenuItem>)
            }
        }
        return c
    }
    
    render = () => {
        return (
            <StickyDiv>
                {this.genItems()}
                <RightSideMenuItem onClick={() => {
                    LocaleApi.changeLanguage('en')
                }}>
                    EN
                </RightSideMenuItem>
                <RightSideMenuItem onClick={() => {
                    LocaleApi.changeLanguage('zh-hk')
                }}>
                    中
                </RightSideMenuItem>
                <RightSideMenuItem onClick={() => { }}>
                    {(GqlApi.state.isLogined)? "Hello": "Not logined"}
                </RightSideMenuItem>
                
            </StickyDiv>
        )
    }
}

export default Navbar
//The whole NavBar component is controlled here.
//Current design is app.js directly supply props to this component and all logics stores here.
//Later on depends on complexity we may split it out into more structures.

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { I18n } from 'react-i18next'
import { GqlApiSubscriber } from '../stateContainer/GqlApi.js'
import LocaleApi from '../stateContainer/LocaleApi.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StickyDiv = styled.div`
    position: sticky;
    top: 0;
    margin: 0;
    padding: 0;
    background-color: #f47;
    width: 100%;
    grid-row: navbar / body;
    display: grid;
    grid-template-rows: auto;
    grid-column-gap: 10px;
    z-index: 10;
    @media (max-width: 768px) {
        grid-template-columns: 100px auto 100px;
    }
    @media (min-width: 769px) {
        grid-template-columns: 100px auto 100px;
    }
`

const LogoContainer = styled.div`
    justify-self: center;
    align-self: center;
`

const NormalMenuItem = styled(Link)`
    display: inline-block;
    padding: 0.3em;
`

const RightSideIcon = styled((props) => {
    console.log('RightSideIcon.children=', props.children)
    return (<div>
        <FontAwesomeIcon {...props} />
        {props.children}
    </div>)
})`
    display: inline-block;
    cursor: pointer;
    font-size: 1.5em;
    justify-self: center;
    align-self: center;
    &:hover {
        color: Yellow;
    }
`

const RightSideDiv = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: ${props=>props.isLogined? '1fr 1fr 1fr': 'auto'};
    grid-column-gap: 0.6em;
    justify-self: center;
    align-self: center;
`

const LangSelector = styled.span`
    font-size: ${props=>(props.fontsize)? props.fontsize: 1}em;
    display: inline-block;
    justify-self: center;
    align-self: center;
    cursor: pointer;
`

const RightSideMenu = styled.div`
    display: inline-block;
`

const Menu = styled.div`
    display: none;
    position: absolute;
    right: 0;
    background-color: #f9f9f9;
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    ${RightSideMenu}:hover & {
        display: block;
    }

`

const MenuItem = styled.div`
    cursor: pointer;
    background-color: #f47;
`

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.toggleMenuDisplay = this.toggleMenuDisplay.bind(this)
        this.state = {showMenu: null}
    }
    genMenu = (g, t) => {
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
    
    toggleMenuDisplay = (n)=> {
        console.log('toggleMenuDisplay')
        this.setState(prevState=> ({showMenu: ((prevState.showMenu===n)? null: n)}))
    }

    render() { return (
        <GqlApiSubscriber>
        {(g) => (
            <I18n>
            {(t) => (
                <StickyDiv>
                    <LogoContainer>Logo</LogoContainer>
                    <div>{this.genMenu(g, t)}</div>
                    <RightSideDiv isLogined={g.state.isLogined}>
                        {!(LocaleApi.state.i18n.language==='en') && <LangSelector fontsize={1.3} onClick={() => {
                            LocaleApi.changeLanguage('en')
                            console.log('en clicked')
                        }}>
                            EN
                        </LangSelector>}
                        {(LocaleApi.state.i18n.language==='en') && <LangSelector fontsize={1.5} onClick={() => {
                            LocaleApi.changeLanguage('zh-HK')
                            console.log('zh-HK clicked')
                        }}>
                            中
                        </LangSelector>}
                        {g.state.isLogined && <RightSideIcon icon='bell' onClick={() => {
                            
                        }}>
                        </RightSideIcon>}
                        {g.state.isLogined && <RightSideMenu>
                            <RightSideIcon icon='user' onClick={() => { this.toggleMenuDisplay('user') }} >
                                <Menu name='user' show={this.state.showMenu}>
                                    <MenuItem>{g.state.myself.firstName + ' ' + g.state.myself.lastName}</MenuItem>
                                    <MenuItem>{g.state.myself.firstName + ' ' + g.state.myself.lastName}</MenuItem>
                                </Menu>
                            </RightSideIcon>
                        </RightSideMenu>}
                    </RightSideDiv>
                </StickyDiv>
            )}
            </I18n>
        )}
        </GqlApiSubscriber>
    )}
}

export default Navbar
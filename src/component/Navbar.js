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
    @media (max-width: 768px) {
        grid-template-columns: 100px auto 150px;
    }
    @media (min-width: 769px) {
        grid-template-columns: 100px auto 150px;
    }
`

const LeftSideContainer = styled.div`
    justify-self: center;
    align-self: center;
`

const NormalMenuItem = styled(Link)`
    display: inline-block;
    padding: 0.3em;
`

const FontAwesomeMenuIcon = styled(FontAwesomeIcon)`
    ${props => props.haveMenu ? 'content: "▾"': ''}
`

const RightSideIcon = styled(({haveMenu, ...props}) => {
    return (<div>
        <FontAwesomeMenuIcon {...props} />
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

const RightSideContainer = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: ${props=>props.isLogined? '1fr 1fr 1fr': '1fr 2fr'};
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
    background-color: #f47;
    min-width: 150px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    ${RightSideMenu}:hover & {
        display: block;
    }

`

const MenuText = styled.div`
    background-color: #f47;
    padding: 0.3em;
    cursor: default;
    user-select: none;
`

const Separator = styled.hr`
    border-top: 1px solid #8c8b8b;
    background-color: #f47;
`

const MenuLink = styled.div`
    cursor: pointer;
    background-color: #f47;
    padding: 0.3em;
`

class Navbar extends React.PureComponent {
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

    getRightSideMenu = () => (
        <GqlApiSubscriber>
        {(g) => (
            <I18n>
            {(t) => (
                <RightSideContainer isLogined={g.state.isLogined}>
                    {!(LocaleApi.state.i18n.language==='en') && <LangSelector fontsize={1.3} onClick={() => LocaleApi.changeLanguage('en')}>EN</LangSelector>}
                    {(LocaleApi.state.i18n.language==='en') && <LangSelector fontsize={1.5} onClick={() => LocaleApi.changeLanguage('zh-HK') }>中</LangSelector>}

                    {g.state.isLogined && <RightSideMenu>
                        <RightSideIcon icon='bell' >
                            <Menu>
                                <MenuText>You have no new messages</MenuText>
                            </Menu>
                        </RightSideIcon>
                    </RightSideMenu>}
                    {g.state.isLogined && <RightSideMenu>
                        <RightSideIcon icon='user' haveMenu>
                            <Menu>
                                <MenuText>{g.state.myself.firstName + ' ' + g.state.myself.lastName} </MenuText>
                                <Separator/>
                                <MenuLink onClick={()=> g.logout()}> {t('Logout')} </MenuLink>
                            </Menu>
                        </RightSideIcon>
                    </RightSideMenu>}
                    {!g.state.isLogined && <RightSideMenu>Sign Up</RightSideMenu>}
                </RightSideContainer>
            )}</I18n>
        )}</GqlApiSubscriber>
    )

    render() { return (
        <GqlApiSubscriber>
        {(g) => (
            <I18n>
            {(t) => (
                <StickyDiv>
                    <LeftSideContainer>Logo</LeftSideContainer>

                    <div>{this.genMenu(g, t)}</div>

                    {this.getRightSideMenu()}
                    
                </StickyDiv>
            )}
            </I18n>
        )}
        </GqlApiSubscriber>
    )}
}

export default Navbar
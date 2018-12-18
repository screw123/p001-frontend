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
    box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.1);
    @media (max-width: 768px) {
        grid-template-columns: 100px auto auto;
    }
    @media (min-width: 769px) {
        grid-template-columns: 100px auto auto;
    }
`

const LeftSideContainer = styled.div`
    justify-self: center;
    align-self: center;
    padding: 0.3rem;
`

const MainMenu = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-self: center;
    align-self: center;
    padding: 0.3rem;
`
const FirstLevelContainer = styled.div`
    display: inline-block;
    padding: 0.3rem 0.5rem;
`

const FirstLevelText = styled(({displayText, key, ...props}) => (
    <div >
        <span key1={key} {...props}>{displayText}</span>
        {props.children}
    </div>


))`
    white-space: nowrap;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        color: Yellow;
    }
    ${props=> (props.children)? '&:after { content: "▾";': '' }
`

const FirstLevelLink = styled(Link)`
    display: inline-block;
    white-space: nowrap; 
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        color: Yellow;
    }
`

const RightSideIcon = styled(({icon, haveMenu, ...props}) => (
    <div {...props}>
        <FontAwesomeIcon icon={icon} />
        {props.children}
    </div>
))`
    display: inline-block;
    cursor: pointer;
    font-size: 1.3rem;
    justify-self: center;
    align-self: center;
    &:hover {
        color: Yellow;
    }
    ${haveMenu => haveMenu? '&:after { content: "▾"; }': ''}
`

const RightContainer = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: ${props=>props.isLogined? '1fr 1fr 1fr': '1fr 2fr'};
    justify-self: center;
    align-self: center;
    padding: 0.1rem;
`

const LangSelector = styled.span`
    font-size: ${props=>(props.fontsize)? props.fontsize: 1}em;
    display: inline-block;
    justify-self: center;
    align-self: center;
    cursor: pointer;
`

const Menu = styled.div`
    display: none;
    padding: 0.3rem;
    position: absolute;
    min-width: 150px;
    background-color: White;
    border-radius: 0.25rem;
    box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.1);
    z-index: 1;
    ${FirstLevelContainer}:hover & {
        display: block;
    }
`

const RightMenu = styled(Menu)`
    right: 0;
`

const MenuText = styled.div`
    padding: 0.3rem 0.1rem;
    font-size: 1rem;
    cursor: default;
    user-select: none;
    color: Black;
`

const Separator = styled.hr`
    border-top: 1px solid #8c8b8b;
    padding: 0;
`

const MenuFunction = styled.div`
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.3rem 0.1rem;
    color: #555;
`

const MenuLink = styled(Link)`
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.3rem 0.1rem;
    color: #555;
    display: block;
`

class Navbar extends React.PureComponent {
    genMenu = (g, t) => {
        let c = []
        const firstLevelNode = this.props.routes.filter(v=>v.navbar.firstLevel===true).sort((a,b)=>a.navbar.itemId-b.navbar.itemId)

        for (let i = 0; i < firstLevelNode.length; i++) {

            const r = firstLevelNode[i]

            if ((r.navbar.firstLevel) & ((r.navbar.showAfterLogin===g.state.isLogined) || (r.navbar.showBeforeLogin===!g.state.isLogined))) { //If it's a first Lv item, generate, else skip
                if (r.path) { //if have path, means it's a link.  Link should not have 2nd level menu
                    c.push(<FirstLevelContainer key={r.navbar.itemId}><FirstLevelLink to={r.linkURL||r.path}>{r.navbar.itemId+' '+t(r.menuName)}</FirstLevelLink></FirstLevelContainer>)
                }
                else {  //if no patt, means it's text, thus use FirstLevelText.  If link should use FirstLevelLink
                    c.push(<FirstLevelContainer key={r.navbar.itemId}><FirstLevelText displayText={t(r.menuName)}>
                        {this.gen2ndLevel({parentId: r.navbar.itemId, t: t, g:g})}
                    </FirstLevelText></FirstLevelContainer>)
                }
            }

            
        }
        return c
    }

    gen2ndLevel = ({parentId, t, g}) => {
        const children = this.props.routes.filter(v=> v.navbar.parentId===parentId).sort((a,b)=>a.navbar.itemId-b.navbar.itemId)

        if (children.length===0) {return undefined}
        let c = []

        for(let i=0;i<children.length;i++) {
            const r = children[i]
            const toPath = r.linkURL||r.path

            if  ((r.navbar.showAfterLogin===g.state.isLogined) || (r.navbar.showBeforeLogin===!g.state.isLogined)) {
                c.push(<MenuLink to={toPath} key={`${parentId}-${i}`}>{r.navbar.itemId+' '+t(r.menuName)}</MenuLink>)
            }
        }
        if (c.length===0) {return undefined}
        return (<Menu>{c}</Menu>)
    }
        
    

    /*
    if (g.state.isLogined===true) {
                if (r.navbar.showAfterLogin===true) {
                    c.push(<NormalMenuItem to={toPath} key={i}>
                        {t(r.menuName)}
                    </NormalMenuItem>)
                }
            }
            else {
                if (r.navbar.showBeforeLogin===true) {
                    c.push(<NormalMenuItem to={toPath} key={i}>
                        {t(r.menuName)}
                    </NormalMenuItem>)
                }    
            }
    */

    getRightSideMenu = () => (
        <GqlApiSubscriber>
        {(g) => (
            <I18n>
            {(t) => (
                <RightContainer isLogined={g.state.isLogined}>
                    {!(LocaleApi.state.i18n.language==='en') && <LangSelector fontsize={1.2} onClick={() => LocaleApi.changeLanguage('en')}>EN</LangSelector>}
                    {(LocaleApi.state.i18n.language==='en') && <LangSelector fontsize={1.4} onClick={() => LocaleApi.changeLanguage('zh-HK') }>中</LangSelector>}

                    {g.state.isLogined && <FirstLevelContainer>
                        <RightSideIcon icon='bell' >
                            <RightMenu>
                                <MenuText>You have no new messages</MenuText>
                            </RightMenu>
                        </RightSideIcon>
                    </FirstLevelContainer>}
                    {g.state.isLogined && <FirstLevelContainer>
                        <RightSideIcon icon='user' haveMenu>
                            <RightMenu>
                                <MenuText>{t('Hello, user!', {name: g.state.myself.firstName + ' ' + g.state.myself.lastName}) }</MenuText>
                                <Separator/>
                                <MenuFunction onClick={()=> g.logout()}> {t('Logout')} </MenuFunction>
                            </RightMenu>
                        </RightSideIcon>
                    </FirstLevelContainer>}
                    {!g.state.isLogined && <FirstLevelContainer><FirstLevelLink to={'/login'}>{t('Sign In')}</FirstLevelLink></FirstLevelContainer>}
                </RightContainer>
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

                    <MainMenu>{this.genMenu(g, t)}</MainMenu>

                    {this.getRightSideMenu()}
                    
                </StickyDiv>
            )}
            </I18n>
        )}
        </GqlApiSubscriber>
    )}
}

export default Navbar
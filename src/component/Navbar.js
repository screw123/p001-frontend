//The whole NavBar component is controlled here.
//Current design is app.js directly supply props to this component and all logics stores here.
//Later on depends on complexity we may split it out into more structures.

//FrontMenu vs DashMenu: FrontMenu = landing pages menu, DashMenu = app menu available after login
//primarymenu vs secondarymenu: primarymenu = menu on the topmost, secondarymenu = menu under primarymenu

import React, {useState} from "react"
import {
	StickyDiv,
	RightContainer,
	FirstLevelContainer,
	FirstLevelText,
	FirstLevelLink,
	FirstLevelLoginLink,
	LangSelector,
	Menu,
	MenuLink,
	MobileMenuWrapper,
	MobileMenu,
	MobileMenuBar,
	Logo,
	DashMenuContainer,
	PrimaryMenuDiv
} from "./NavbarStyles"

const genMenu = ({g, c, routes, isFrontMenu, isPrimaryMenu}) => {
	let menu = []
	const firstLevelNode = routes
		.filter(v => v.navbar.firstLevel === true)
		.sort((a, b) => a.navbar.itemId - b.navbar.itemId)

	for (let i = 0; i < firstLevelNode.length; i++) {
		const r = firstLevelNode[i]

		if (r.navbar.firstLevel & (isFrontMenu? (r.navbar.showBeforeLogin & !r.navbar.showAfterLogin): r.navbar.showAfterLogin) ) {
		//(r.navbar.showAfterLogin === g.state.isLogined || r.navbar.showBeforeLogin === !g.state.isLogined) ) {
		//If it's a first Lv item, generate, else skip
			if (r.path) {
				//if have path, means it's a link.  Link should not have 2nd level menu
				menu.push(
					<FirstLevelContainer key={r.navbar.itemId}>
						<FirstLevelLink
							color={isPrimaryMenu? '#fff':undefined}
							to={r.linkURL || r.path}
							onClick={() => {
								if (c.state.width <= 768) c.toggleMenuBar()
							}}
						>
							{r.navbar.itemId + " " + c.t(r.menuName)}
						</FirstLevelLink>
					</FirstLevelContainer>
				)
			} else {
				//if no patt, means it's text, thus use FirstLevelText.  If link should use FirstLevelLink
				menu.push(
					<FirstLevelContainer key={r.navbar.itemId}>
						<FirstLevelText displayText={c.t(r.menuName)} color={isPrimaryMenu? '#fff':undefined}>
							{gen2ndLevel({ parentId: r.navbar.itemId, c: c, g: g, routes: routes })}
						</FirstLevelText>
					</FirstLevelContainer>
				)
			}
		}
	}
	if (isPrimaryMenu) {
		menu.push(langSelector({c: c, changeEng: 'EN', changeChn: '中'}) )
		if (!g.state.isLogined) {
			menu.push(<FirstLevelContainer>
				<FirstLevelLoginLink to={"/login"}>
					{c.t("Login")}
				</FirstLevelLoginLink>
			</FirstLevelContainer>)
		}
		else {
			menu.push(<FirstLevelContainer>
				<FirstLevelText color='#fff' displayText={c.t('Logout')} onClick={() => g.logout()} />
			</FirstLevelContainer>)
		}
	}
	return menu
}

const gen2ndLevel = ({ parentId, c, g, routes, isFrontMenu }) => {
	const children = routes
		.filter(v => v.navbar.parentId === parentId)
		.sort((a, b) => a.navbar.itemId - b.navbar.itemId)

	if (children.length === 0) {
		return undefined
	}
	let menu = []

	for (let i = 0; i < children.length; i++) {
		const r = children[i]
		const toPath = r.linkURL || r.path

		//if ((g.state.isLogined && r.navbar.showAfterLogin) ||(!g.state.isLogined && r.navbar.showBeforeLogin)) {
		if (isFrontMenu? (r.navbar.showBeforeLogin & !r.navbar.showAfterLogin): r.navbar.showAfterLogin) {	
			menu.push(
				<MenuLink
					to={toPath}
					key={`${parentId}-${i}`}
					onClick={() => {
						if (c.state.width <= 768) c.toggleMenuBar()
					}}
				>
					{r.navbar.itemId + " " + c.t(r.menuName)}
				</MenuLink>
			)
		}
	}
	if (menu.length === 0) {
		return undefined
	}
	return <Menu>{menu}</Menu>
}

const langSelector = ({c, changeEng, changeChn}) => (
	<>
		{!(c.state.i18n.language === "en") && (
			<LangSelector
				fontsize={1}
				onClick={() => c.changeLanguage("en")}
			>
				{changeEng}
			</LangSelector>
		)}
		{c.state.i18n.language === "en" && (
			<LangSelector
				fontsize={1}
				onClick={() => c.changeLanguage("zh-HK")}
			>
				{changeChn}
			</LangSelector>
		)}
	</>
)

const genNavbar = ({g, c, routes, isFrontMenu}) => (
	<>
		{c.state.width <= 768 && (
			<MobileMenuWrapper onClick={() => c.toggleMenuBar()}>
				<MobileMenu />
			</MobileMenuWrapper>
		)}

		{c.state.width > 768 && (
			<>
				
			</>
		)}
	</>
)

const Navbar = ({routes, g, c}) => {
	const [showFrontMenu, setShowFrontMenu] = useState(true)
	const [showMobileMenu, setShowMobileMenu] = useState(false)

	//if scrolled down, user is logined, and it's currently showing front menu, change to show dash menu instead
	if ((c.state.scrollTop > 200) & (g.state.isLogined) & (showFrontMenu ===true) ) { setShowFrontMenu(false) }
	
	//if scrolled up and currently not showing front menu, change to show front menu
	else if ((c.state.scrollTop < 100) & (showFrontMenu ===false) ) { setShowFrontMenu(true) }

	return(
		<>
			<StickyDiv>
				<PrimaryMenuDiv>
					<Logo to="/" />
					<RightContainer>
						{genMenu({g: g, c: c, routes: routes, isFrontMenu: showFrontMenu, isPrimaryMenu: true})}
					</RightContainer>
				</PrimaryMenuDiv>
				{g.state.isLogined && (showFrontMenu === true) && <DashMenuContainer>
					{genMenu({g: g, c: c, routes: routes, isFrontMenu: false, isPrimaryMenu: false})}
				</DashMenuContainer>}
					{showMobileMenu && <MobileMenuBar show={c.state.showMenuBar}>
						{langSelector({c: c, changeEng: 'Switch to English', changeChn: '轉成中文'})}
						{genMenu({g: g, c: c, routes: routes})}
					</MobileMenuBar>}
			</StickyDiv>
			
		</>
	)
}


/*
<MobileMenuBar show={c.state.showMenuBar}>
					{langSelector({c: c, changeEng: 'Switch to English', changeChn: '轉成中文'})}
					{genMenu({g: g, c: c, routes: routes, isFrontMenu: isFrontMenu})}
				</MobileMenuBar>
				*/

/*
{g.state.isLogined && (
						<FirstLevelContainer>
							<RightSideIcon icon="user" haveMenu>
								<RightMenu>
									<MenuText>
										{c.t("Hello, user!", {
											name: g.state.myself.firstName + " " + g.state.myself.lastName
										})}
									</MenuText>
									<Separator />
									<MenuFunction onClick={() => g.logout()}>
										{" "}
										{c.t("Logout")}{" "}
									</MenuFunction>
								</RightMenu>
							</RightSideIcon>
						</FirstLevelContainer>
					)}
*/

export default Navbar

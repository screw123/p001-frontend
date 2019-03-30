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
	MobileMenuButton,
	Logo,
	DashMenuContainer,
	PrimaryMenuDiv,
	MobileMenu,
	MobileMenuItem
} from "./NavbarStyles"

const genMenu = ({g, c, routes, isFrontMenu, isPrimaryMenu}) => {
	let menu = []
	const firstLevelNode = routes
		.filter(v => v.navbar.firstLevel === true)
		.sort((a, b) => a.navbar.itemId - b.navbar.itemId)

	for (let i = 0; i < firstLevelNode.length; i++) {
		const r = firstLevelNode[i]

		if (isFrontMenu? (r.navbar.showBeforeLogin & !r.navbar.showAfterLogin): r.navbar.showAfterLogin) {
		//If it's a first Lv item, generate, else skip
			if (r.path) {
				//if have path, means it's a link.  Link should not have 2nd level menu
				menu.push(
					<FirstLevelContainer key={r.navbar.itemId}>
						<FirstLevelLink
							color={isPrimaryMenu? '#fff':'#666'}
							to={r.linkURL || r.path}
							onClick={() => {
								if (c.state.width <= 768) c.toggleMenuBar()
							}}
						>
							{c.t(r.menuName)}
						</FirstLevelLink>
					</FirstLevelContainer>
				)
			} else {
				//if no patt, means it's text, thus use FirstLevelText.  If link should use FirstLevelLink
				console.log(r.menuName)
				menu.push(
					<FirstLevelContainer key={r.navbar.itemId}>
						<FirstLevelText displayText={c.t(r.menuName)} color={isPrimaryMenu? '#fff':'#666'}>
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
			menu.push(<FirstLevelContainer key='link-login'>
				<FirstLevelLoginLink to={"/login"}>
					{c.t("Login")}
				</FirstLevelLoginLink>
			</FirstLevelContainer>)
		}
		else {
			menu.push(<FirstLevelContainer key='link-logout'>
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

		if (isFrontMenu? (r.navbar.showBeforeLogin & !r.navbar.showAfterLogin): r.navbar.showAfterLogin) {	
			menu.push(
				<MenuLink
					to={toPath}
					key={`${parentId}-${i}`}
					onClick={() => {
						if (c.state.width <= 768) c.toggleMenuBar()
					}}
				>
					{c.t(r.menuName)}
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
			<LangSelector onClick={() => c.changeLanguage("en")} key='lang-en'>
				{changeEng}
			</LangSelector>
		)}
		{c.state.i18n.language === "en" && (
			<LangSelector onClick={() => c.changeLanguage("zh-HK")} key='lang-zh'>
				{changeChn}
			</LangSelector>
		)}
	</>
)

const genMobileMenu = ({g, c, routes}) => {
	let primaryMenu = [], secondaryMenu = []
	const firstLevelNode = routes
		.filter(v => v.navbar.firstLevel === true)
		.sort((a, b) => a.navbar.itemId - b.navbar.itemId)
	if (g.state.isLogined) {
		const n1 = firstLevelNode.filter(v => v.navbar.showBeforeLogin)
		const n2 = firstLevelNode.filter(v => v.navbar.showAfterLogin)
		secondaryMenu = fillMobileMenu({g:g, c:c, nodes: n1, allNodes: routes})
		primaryMenu = fillMobileMenu({g:g, c:c, nodes: n2, allNodes: routes})
	}
	else {
		const n = firstLevelNode.filter(v => v.navbar.showBeforeLogin)
		//primaryMenu = fillMobileMenu({g:g, c:c, nodes: n, allNodes: routes})
	}

	return <><div>{primaryMenu}</div><div>{secondaryMenu}</div></>

}

const fillMobileMenu = ({g, c, nodes, allNodes}) => {
	let arr = []
	for (let i = 0; i < nodes.length; i++) {
		console.log(nodes[i])
		arr.push(<MobileMenuItem>{c.t(nodes[i].menuName)}</MobileMenuItem>)
/*
		//if have path, means it's a link.  Link should not have 2nd level menu
		if (!nodes[i].path) {
			const children = allNodes
				.filter(v => v.navbar.parentId === nodes[i].navbar.itemId)
				.sort((a, b) => a.navbar.itemId - b.navbar.itemId)

			for (let j = 0; j < children.length; i++) {
				arr.push(<MobileMenuItem secondLevel>{c.t(children[j].name)}</MobileMenuItem>)
			}
		}*/
	}
	return arr
}


const Navbar = ({routes, g, c}) => {
	const [showFrontMenu, setShowFrontMenu] = useState(true)
	const [showMobileMenu, setShowMobileMenu] = useState(false)

	//if scrolled down, user is logined, and it's currently showing front menu, change to show dash menu instead
	if ((c.state.scrollTop > 200) & (g.state.isLogined) & (showFrontMenu ===true) ) { setShowFrontMenu(false) }
	
	//if scrolled up and currently not showing front menu, change to show front menu
	else if ((c.state.scrollTop < 100) & (showFrontMenu ===false) ) { setShowFrontMenu(true) }

	return(
		<StickyDiv>
			{c.state.width > 1024 && (
				<>
					<PrimaryMenuDiv>
						<Logo to="/" />
						<RightContainer>
							{genMenu({g: g, c: c, routes: routes, isFrontMenu: showFrontMenu, isPrimaryMenu: true})}
						</RightContainer>
					</PrimaryMenuDiv>
					{g.state.isLogined && (showFrontMenu === true) && <DashMenuContainer>
						{genMenu({g: g, c: c, routes: routes, isFrontMenu: false, isPrimaryMenu: false})}
					</DashMenuContainer>}
				</>
			)}
			{c.state.width <= 1024 && (
				<>
					<PrimaryMenuDiv mobileMenuExpand={showMobileMenu}>
						<Logo to="/" />
						<MobileMenuWrapper onClick={() => (showMobileMenu ? setShowMobileMenu(false): setShowMobileMenu(true)) }>
							<MobileMenuButton isMenuOpen={showMobileMenu} />
						</MobileMenuWrapper>
						{showMobileMenu && <MobileMenu>
							{genMobileMenu({g: g, c: c, routes: routes})}
						</MobileMenu>}
					</PrimaryMenuDiv>
				</>
			)}
		</StickyDiv>
	)
}

export default Navbar

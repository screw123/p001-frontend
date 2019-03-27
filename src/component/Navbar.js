//The whole NavBar component is controlled here.
//Current design is app.js directly supply props to this component and all logics stores here.
//Later on depends on complexity we may split it out into more structures.

import React from "react"
import { GqlApiSubscriber } from "../stateContainer/GqlApi.js"
import LocaleApi, { LocaleApiSubscriber } from "../stateContainer/LocaleApi.js"
import {
	StickyDiv,
	LeftContainer,
	RightContainer,
	FirstLevelContainer,
	FirstLevelText,
	FirstLevelLink,
	FirstLevelLoginLink,
	RightSideIcon,
	LangSelector,
	Menu,
	RightMenu,
	MenuText,
	Separator,
	MenuFunction,
	MenuLink,
	MobileMenuWrapper,
	MobileMenu,
	MobileMenuBar,
	Logo
} from "./NavbarStyles"

const genMenu = ({g, c, routes}) => {
	let menu = []
	const firstLevelNode = routes
		.filter(v => v.navbar.firstLevel === true)
		.sort((a, b) => a.navbar.itemId - b.navbar.itemId)

	for (let i = 0; i < firstLevelNode.length; i++) {
		const r = firstLevelNode[i]

		if (
			r.navbar.firstLevel &
			(r.navbar.showAfterLogin === g.state.isLogined ||
				r.navbar.showBeforeLogin === !g.state.isLogined)
		) {
			//If it's a first Lv item, generate, else skip
			if (r.path) {
				//if have path, means it's a link.  Link should not have 2nd level menu
				menu.push(
					<FirstLevelContainer key={r.navbar.itemId}>
						<FirstLevelLink
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
						<FirstLevelText displayText={c.t(r.menuName)}>
							{gen2ndLevel({ parentId: r.navbar.itemId, c: c, g: g, routes: routes })}
						</FirstLevelText>
					</FirstLevelContainer>
				)
			}
		}
	}
	return menu
}

const gen2ndLevel = ({ parentId, c, g, routes }) => {
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

		if (
			(g.state.isLogined && r.navbar.showAfterLogin) ||
			(!g.state.isLogined && r.navbar.showBeforeLogin)
		) {
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

const Navbar = (props) => (
	<GqlApiSubscriber>
	{g => (
		<LocaleApiSubscriber>
		{c => (
			<>
				<StickyDiv>
					<LeftContainer>
						<Logo to="/" />
					</LeftContainer>

					<RightContainer isLogined={g.state.isLogined}>
						{c.state.width <= 768 && (
							<MobileMenuWrapper onClick={() => c.toggleMenuBar()}>
								<MobileMenu />
							</MobileMenuWrapper>
						)}

						{c.state.width > 768 && (
							<>
								{genMenu({g: g, c: c, routes: props.routes})}
								{langSelector({c: c, changeEng: 'EN', changeChn: '中'})}
								<div>
									

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
									{!g.state.isLogined && (
										<FirstLevelContainer>
											<FirstLevelLoginLink to={"/login"}>
												{c.t("Login")}
											</FirstLevelLoginLink>
										</FirstLevelContainer>
									)}
								</div>
							</>
						)}
					</RightContainer>
				</StickyDiv>
				<MobileMenuBar show={c.state.showMenuBar}>
					{langSelector({c: c, changeEng: 'Switch to English', changeChn: '轉成中文'})}
					{ genMenu({g: g, c: c, routes: props.routes}) }
				</MobileMenuBar>
			</>
		)}
		</LocaleApiSubscriber>
	)}
	</GqlApiSubscriber>
)

export default Navbar

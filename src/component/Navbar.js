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

const Navbar = (props) => {
	const genMenu = (g, t) => {
		let c = []
		const firstLevelNode = props.routes
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
					c.push(
						<FirstLevelContainer key={r.navbar.itemId}>
							<FirstLevelLink
								to={r.linkURL || r.path}
								onClick={() => {
									if (LocaleApi.state.width <= 768) LocaleApi.toggleMenuBar()
								}}
							>
								{r.navbar.itemId + " " + t(r.menuName)}
							</FirstLevelLink>
						</FirstLevelContainer>
					)
				} else {
					//if no patt, means it's text, thus use FirstLevelText.  If link should use FirstLevelLink
					c.push(
						<FirstLevelContainer key={r.navbar.itemId}>
							<FirstLevelText displayText={t(r.menuName)}>
								{gen2ndLevel({ parentId: r.navbar.itemId, t: t, g: g })}
							</FirstLevelText>
						</FirstLevelContainer>
					)
				}
			}
		}

		return c
	}

	const gen2ndLevel = ({ parentId, t, g }) => {
		const children = props.routes
			.filter(v => v.navbar.parentId === parentId)
			.sort((a, b) => a.navbar.itemId - b.navbar.itemId)

		if (children.length === 0) {
			return undefined
		}
		let c = []

		for (let i = 0; i < children.length; i++) {
			const r = children[i]
			const toPath = r.linkURL || r.path

			if (
				(g.state.isLogined && r.navbar.showAfterLogin) ||
				(!g.state.isLogined && r.navbar.showBeforeLogin)
			) {
				c.push(
					<MenuLink
						to={toPath}
						key={`${parentId}-${i}`}
						onClick={() => {
							if (LocaleApi.state.width <= 768) LocaleApi.toggleMenuBar()
						}}
					>
						{r.navbar.itemId + " " + t(r.menuName)}
					</MenuLink>
				)
			}
		}
		if (c.length === 0) {
			return undefined
		}
		return <Menu>{c}</Menu>
	}

	return (
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
							{LocaleApi.state.width <= 768 && (
								<MobileMenuWrapper onClick={() => LocaleApi.toggleMenuBar()}>
									<MobileMenu />
								</MobileMenuWrapper>
							)}

							{LocaleApi.state.width > 768 && (
								<>
									{genMenu(g, c.t)}
									<div>
										{!(LocaleApi.state.i18n.language === "en") && (
											<LangSelector
												fontsize={1.2}
												onClick={() => LocaleApi.changeLanguage("en")}
											>
												EN
											</LangSelector>
										)}
										{LocaleApi.state.i18n.language === "en" && (
											<LangSelector
												fontsize={1.4}
												onClick={() => LocaleApi.changeLanguage("zh-HK")}
											>
												中
											</LangSelector>
										)}

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
					<MobileMenuBar show={LocaleApi.state.showMenuBar}>
						{genMenu(g, c.t)}
					</MobileMenuBar>
				</>
			)}
			</LocaleApiSubscriber>
		)}
		</GqlApiSubscriber>
	)
}

export default Navbar

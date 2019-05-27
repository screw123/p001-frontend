import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAlignJustify, faTimes } from "@fortawesome/free-solid-svg-icons"

export const StickyDiv = styled.div`
	position: fixed;
	top: 0;
	margin: 0;
	z-index: 2000;
	grid-row: start / navbar;
	@media (max-width: 1024px) {
		height: 4rem;
	}
	width: 100%;
`

export const PrimaryMenuDiv = styled.div`
	background: linear-gradient(180deg, #f43ea6 0%, #f5576c 100%);
	${({mobileMenuExpand})=>mobileMenuExpand? 'height: 100vh;': ''}
	display: grid;
	padding: 1rem 1rem 1rem 7rem;
	grid-template-columns: 10rem auto;
	grid-template-rows: auto auto;
	grid-column-gap: 0.75rem;
	@media (max-width: 1024px) {
		padding: 0.75rem 1rem;
		grid-template-rows: 3rem auto;
		grid-template-columns: 7.75rem auto;
	}
	${({mobileMenuExpand})=>mobileMenuExpand? 'overflow:auto': ''};
`



export const Logo = styled(Link)`
	align-self: center;
	justify-self: center;
	display: block;
	height: 4rem;
	width: 9rem;
	grid-row: 1;
	grid-column: 1;
	background-image: url("/Logo_white.svg");
	background-size: 100% 100%;
	@media (max-width: 1024px) {
		height: 3rem;
		width: 6.75rem;
	}
`

export const RightContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-self: center;
	align-items: center;
	justify-content: center;
`

export const DashMenuContainer = styled.div`
	justify-self: self-end;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	background: #EEE;
`

export const FirstLevelContainer = styled.div`
	display: inline-block;
	padding: 0.3rem 1rem;
	position: relative;
	font-weight: 500;
	font-size: 1.2rem;
	cursor: pointer;
	white-space: nowrap;
`

export const FirstLevelText = styled(({ displayText, key, color, ...props }) => (
	<div>
		<span key1={key} {...props}>
			{displayText}
		</span>
		{props.children}
	</div>
))`
	${({color})=>color? 'color:'+color : ''}
	${props => (props.children ? '&:after { content: "▾";' : "")}
`

export const FirstLevelLink = styled(({children, color, ...props})=>(
	<Link {...props}>
		{children}
		<FirstLevelHover />
	</Link>
))`
	display: inline-block;
	${({color})=>color? 'color:'+color : ''}
`

export const FirstLevelLoginLink = styled(Link)`
	display: inline-block;
	line-height: 2rem;
	padding: 0.5rem 3rem;
	border-radius: 3rem;
	background-color: rgba(216, 216, 216, 0.5);
	color: White;
`

const FirstLevelHover = styled.div`
	border: 0.1rem solid white;
	border-radius: 1rem;
	width: 0rem;
	opacity: 0;
	transition: opacity 0s, width 0.1s;
	${FirstLevelLink}:hover & { 
		opacity: 1;
		width: 2.5rem;
	}
`

export const RightSideIcon = styled(({ icon, haveMenu, ...props }) => (
	<div {...props}>
		<FontAwesomeIcon icon={icon} />
		{props.children}
	</div>
))`
	display: inline-block;
	position: relative;
	cursor: pointer;
	font-size: 1.3rem;
	@media (max-width: 768px) {
		font-size: 1.1rem;
	}
	justify-self: center;
	align-self: center;
	${haveMenu => (haveMenu ? '&:after { content: "▾"; }' : "")}
`

export const LangSelector = styled.span`
	font-size: 1.2rem;
	font-weight: 500;
	padding: ${({padding})=>padding? padding : '0.3rem 1rem'};
	display: inline-block;
	justify-self: center;
	//align-self: center;
	cursor: pointer;
	color: white;
`

export const Menu = styled.div`
	display: none;
	padding: 0.5rem;
	position: absolute;
	right: 0;
	min-width: 150px;
	background-color: White;
	border-radius: 0.25rem;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
	z-index: 6;
	${FirstLevelContainer}:hover & {
		display: block;
	}
`

export const Separator = styled.hr`
	border-top: 1px solid #8c8b8b;
	padding: 0;
`

export const MenuFunction = styled.div`
	font-size: 0.9rem;
	cursor: pointer;
	padding: 0.3rem 0.1rem;
`

export const MenuLink = styled(Link)`
	font-size: 1rem;
	cursor: pointer;
	padding: 0.5rem 0.2rem;
	display: block;
`

export const MobileMenuWrapper = styled.div`
	color: white;
	cursor: pointer;
	font-size: 1.25rem;
	align-self: center;
	justify-self: right;
`

export const MobileMenuButton = styled(({isMenuOpen,  ...props }) => <FontAwesomeIcon icon={isMenuOpen? faTimes: faAlignJustify} />)``

export const MobileMenu = styled.div`
	grid-column: 1 / span 2;
	margin: 2rem 0;
	display: grid;
	grid-template-rows: auto
	
`

export const MobileMenuItem = styled.div`
	font-size: ${({secondLevel})=>secondLevel? '1rem': '1.1rem'};
	padding: 0.2rem ${({secondLevel})=>secondLevel? '1rem': '0'};
	${({color})=>color? 'color:'+color : ''}
	font-weight: 500;
	display: block;
`

export const MobileMenuLink = styled(({children, color, ...props})=>(
	<Link {...props}>
		{children}
	</Link>

))`
display: block;
	${({color})=>color? 'color:'+color : ''}
	font-size: ${({secondLevel})=>secondLevel? '1rem': '1.2rem'};
	padding: 0.2rem ${({secondLevel})=>secondLevel? '1rem': '0'};
`

export const MobilePrimaryWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
	grid-gap: 0.25rem 0.25rem;
`

export const MobileSectionDiv = styled.div`
	display: block;
`

export const MobileSecondaryWrapper = styled.div`
	display: flex;
	flex-flow: column wrap;
	align-content: center;
`


/*
export const MobileMenuBar = styled.div`
	position: fixed;
	display: flex;
	flex-direction: column;
	background: linear-gradient(180deg, #f43ea6 0%, #f5576c 100%);
	color: white;
	height: 90vh;
	margin-top: 5.5rem;
	padding: 1rem;
	right:  ${props => (props.show ? '0px' : '-22rem')}
	-webkit-transition: right 0.25s ease;
	-moz-transition: right 0.25s ease;
	-ms-transition: right 0.25s ease;
	-o-transition: right 0.25s ease;
	transition: right 0.25s ease;
	@media (min-width: 769px) {
		display: none;
	}
`



*/
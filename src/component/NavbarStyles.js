import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons"

export const StickyDiv = styled.div`
  ${props=> props.nonStick? '' : 'position: sticky;'}
  top: 0;
  margin: 0;
  // same for every component
  padding: 1rem 7rem;
  background: linear-gradient(180deg, #f43ea6 0%, #f5576c 100%);
  grid-row: ${props=> props.section? props.section: 'start / navbar'};
  display: grid;
  grid-template-rows: auto;
  grid-column-gap: 0.75rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  grid-template-columns: 10rem auto;
  @media (max-width: 768px) {
    // same for every component
    padding: 0.75rem 1rem;
    height: 4rem;
    grid-template-columns: 7.75rem auto;
  }
`
export const Logo = styled(Link)`
  display: block;
  height: 4rem;
  width: 9rem;
  background-image: url("/Logo_white.svg");
  background-size: 100% 100%;
  @media (max-width: 768px) {
    height: 3rem;
    width: 6.75rem;
  }
`

export const LeftContainer = styled.div`
  align-self: center;
  justify-self: self-start;
`

//Middle not used anymore, only keey as reference
export const MiddleContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${props => (props.isLogined ? "1fr 1fr 1fr" : "1fr 2fr")};
  justify-self: center;
  align-self: center;
`

export const RightContainer = styled.div`
  justify-self: self-end;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

export const FirstLevelContainer = styled.div`
  display: inline-block;
  padding: 0.3rem 1rem;
  color: white;
  position: relative;
`

export const FirstLevelText = styled(({ displayText, key, ...props }) => (
  <div>
    <span key1={key} {...props}>
      {displayText}
    </span>
    {props.children}
  </div>
))`
  white-space: nowrap;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  color: white;

  ${props => (props.children ? '&:after { content: "▾";' : "")}
`

export const FirstLevelLink = styled(({children, ...props})=>(
  <Link {...props}>
    {children}
    <FirstLevelHover />
  </Link>

))`
  display: inline-block;
  white-space: nowrap;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  color: white;
`

export const FirstLevelLoginLink = styled(Link)`
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 2rem;
  padding: 0.5rem 3rem;
  border-radius: 3rem;
  background-color: rgba(216, 216, 216, 0.5);
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
  padding: 0.3rem 1rem;
  display: inline-block;
  justify-self: center;
  //align-self: center;
  cursor: pointer;
  color: white;
`

export const Menu = styled.div`
  display: none;
  padding: 0.3rem;
  position: absolute;
  right: 0;
  min-width: 150px;
  background-color: White;
  border-radius: 0.25rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
  ${FirstLevelContainer}:hover & {
    display: block;
  }
`

export const RightMenu = styled(Menu)``

export const MenuText = styled.div`
  padding: 0.3rem 0.1rem;
  font-size: 1rem;
  cursor: default;
  user-select: none;
  color: Black;
`

export const Separator = styled.hr`
  border-top: 1px solid #8c8b8b;
  padding: 0;
`

export const MenuFunction = styled.div`
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.3rem 0.1rem;
  color: #555;
`

export const MenuLink = styled(Link)`
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.3rem 0.1rem;
  color: #555;
  display: block;
`

export const MobileMenuWrapper = styled.div`
  color: white;
  cursor: pointer;
  font-size: 1.25rem;
`

export const MobileMenu = styled(({ ...props }) => <FontAwesomeIcon icon={faAlignJustify} />)``

export const MobileMenuBar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f43ea6 0%, #f5576c 100%);
  color: white;
  height: 90vh;
  margin-top: 5.5rem;
	padding: 1rem;
	right:  ${props => (props.show ? "0px" : "-22rem")}
	-webkit-transition: right 0.25s ease;
  -moz-transition: right 0.25s ease;
  -ms-transition: right 0.25s ease;
  -o-transition: right 0.25s ease;
  transition: right 0.25s ease;
  @media (min-width: 769px) {
    display: none;
  }
`

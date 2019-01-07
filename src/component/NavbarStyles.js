import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";

export const StickyDiv = styled.div`
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
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  grid-template-columns: 100px auto 200px;
  @media (max-width: 768px) {
    height: 40px;
    grid-template-columns: 50px auto 150px;
  }
`;

export const LeftContainer = styled.div`
  align-self: center;
  justify-self: center;
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-self: center;
  align-self: center;
`;

export const RightContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${props => (props.isLogined ? "1fr 1fr 1fr" : "1fr 2fr")};
  justify-self: center;
  align-self: center;
`;

export const FirstLevelContainer = styled.div`
  display: inline-block;
  padding: 0.3rem 0.5rem;
`;

export const FirstLevelText = styled(({ displayText, key, ...props }) => (
  <div>
    <span key1={key} {...props}>
      {displayText}
    </span>
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
  ${props => (props.children ? '&:after { content: "▾";' : "")}
`;

export const FirstLevelLink = styled(Link)`
  display: inline-block;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: Yellow;
  }
`;

export const RightSideIcon = styled(({ icon, haveMenu, ...props }) => (
  <div {...props}>
    <FontAwesomeIcon icon={icon} />
    {props.children}
  </div>
))`
  display: inline-block;
  cursor: pointer;
  font-size: 1.3rem;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  justify-self: center;
  align-self: center;
  &:hover {
    color: Yellow;
  }
  ${haveMenu => (haveMenu ? '&:after { content: "▾"; }' : "")}
`;

export const LangSelector = styled.span`
  font-size: ${props => (props.fontsize ? props.fontsize : 1)}rem;
  display: inline-block;
  justify-self: center;
  align-self: center;
  cursor: pointer;
`;

export const Menu = styled.div`
  display: none;
  padding: 0.3rem;
  position: absolute;
  min-width: 150px;
  background-color: White;
  border-radius: 0.25rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
  ${FirstLevelContainer}:hover & {
    display: block;
  }
`;

export const RightMenu = styled(Menu)`
  right: 0;
`;

export const MenuText = styled.div`
  padding: 0.3rem 0.1rem;
  font-size: 1rem;
  cursor: default;
  user-select: none;
  color: Black;
`;

export const Separator = styled.hr`
  border-top: 1px solid #8c8b8b;
  padding: 0;
`;

export const MenuFunction = styled.div`
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.3rem 0.1rem;
  color: #555;
`;

export const MenuLink = styled(Link)`
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.3rem 0.1rem;
  color: #555;
  display: block;
`;

export const MobileMenuWrapper = styled.div``;

export const MobileMenu = styled(({ ...props }) => <FontAwesomeIcon icon={faAlignJustify} />)``;

export const MobileMenuBar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: #f47;
  color: white;
  height: 91vh;
  margin-top: 40px;
	padding: 15px;
	left:  ${props => (props.show ? "0px" : "-230px")}
	-webkit-transition: left 0.25s ease;
  -moz-transition: left 0.25s ease;
  -ms-transition: left 0.25s ease;
  -o-transition: left 0.25s ease;
  transition: left 0.25s ease;
  @media (min-width: 769px) {
    display: none;
  }
`;

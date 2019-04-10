import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

export const Header = styled.div`
  background: url(${props => (props.Pricing ? "/images/header-pricing.png" : "/images/header-about.png")}) center no-repeat;
  background-size: cover;
  color: white;
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  height: 450px;
  display: flex;
	justify-content:center;
	align-content:center;
	flex-direction:column;
`
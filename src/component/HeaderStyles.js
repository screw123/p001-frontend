import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

export const Header = styled.div`
  background: url(${props => (props.Pricing ? "/assets/header-pricing.png" : "/assets/header-about.png")}) center no-repeat;
  background-size: cover;
  color: white;
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  height: 300px;
`
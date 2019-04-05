import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const ToggleStyle = styled.div`
	position: relative;
  left: 50%;
  width: 60px;
  height: 40px;
  border-radius: 100px;
  background-color: #ddd;
  margin: -20px -40px;
  overflow: hidden;
  box-shadow: inset 0 0 2px 1px rgba(0,0,0,.05);
  margin-top:10%;

	@media all and (max-width: 740px) {
  	margin-top:5%;
	}

	.b {
	  display: block;
	}

	.check {
	  position: absolute;
	  display: block;
	  cursor: pointer;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  opacity: 0;
	  z-index: 2;
	}

  .check:checked ~ .track {
    box-shadow: inset 0 0 0 20px #4bd863;
  }

  .check:checked ~ .switch {
    right: 2px;
    left: 22px;
    transition: .35s cubic-bezier(0.785, 0.135, 0.150, 0.860);
    transition-property: left, right;
    transition-delay: .05s, 0s;
  }

	.switch {
	  position: absolute;
	  left: 2px;
	  top: 2px;
	  bottom: 2px;
	  right: 22px;
	  background-color: #fff;
	  border-radius: 36px;
	  z-index: 1;
	  transition: .35s cubic-bezier(0.785, 0.135, 0.150, 0.860);
	  transition-property: left, right;
	  transition-delay: 0s, .05s;
	  box-shadow: 0 1px 2px rgba(0,0,0,.2);
	}

	.track {
	  position: absolute;
	  left: 0;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  transition: .35s cubic-bezier(0.785, 0.135, 0.150, 0.860);
	  box-shadow: inset 0 0 0 2px rgba(0,0,0,.05);
	  border-radius: 40px;
	}
`

class Toggle extends React.Component {

	render = () => (
		<React.Fragment>
			<ToggleStyle>
			  <input type="checkbox" className="check"/>
			  <b className="b switch"></b>
			  <b className="b track"></b>
			</ToggleStyle>
    	</React.Fragment>
	)
}
export default Toggle
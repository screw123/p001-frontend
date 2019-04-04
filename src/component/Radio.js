import React from "react"
import styled from 'styled-components'

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const FilterPrice= styled.div`
	padding: 1em;
	background-image: linear-gradient(-180deg, #F43EA6 0%, #F5576C 100%);
	border-radius: 16px;
	color: ${props => (props.checked ? 'white' : '#A6A6A6')};
`

const Radio = ({name,text,checked, ...props }) => (
  <React.Fragment>
		<FilterPrice checked={checked}>
	    <label>
				<HiddenRadio checked={checked} type="radio" {...props} name="filter"/>
	      <span checked={checked} style={{ marginLeft: 8 }}>{text}</span>
	    </label>
		</FilterPrice>
  </React.Fragment>
)

export default Radio
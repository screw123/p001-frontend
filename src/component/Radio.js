import React from "react"
import styled from 'styled-components'

const RadioContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const HiddenRadio = styled.input.attrs({ type: 'Radio' })`
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

const Radio = ({ className, checked, ...props }) => (
  <RadioContainer className={className}>
    <HiddenRadio checked={checked} {...props} />
  </RadioContainer>
)

export default Radio
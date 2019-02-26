//Modal component 

import React from 'react'
import styled, {keyframes} from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {ClickIcon} from './BasicComponents.js'

const roundRadiusREM = 2

const ModalBG = styled.div`
    display: ${props=>(props.show)? 'block':'none'};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.6);
`

const ModalBody = styled.div`
    background-color: white;
    margin: 3% auto;
    width: 95%;
    box-shadow: 0 0.2rem 0.4rem 0 rgba(0,0,0,0.4),0 0.3rem 1.2rem 0 rgba(0,0,0,0.2);
    border-radius: ${roundRadiusREM}rem;
`

const Title = styled.div`
    background: #f47;
    padding: ${roundRadiusREM/2}rem ${roundRadiusREM}rem ${({hasTitle})=> hasTitle? 0.5 :2}rem ${roundRadiusREM/2}rem;
    border-radius: ${roundRadiusREM}rem ${roundRadiusREM}rem 0 0;
    text-align: center;
`

const Content = styled.div`
`


const Footer = styled.div`
    padding: ${roundRadiusREM/2}rem;
    justify-content: center;
    background-color: #f47;
    border-radius: 0 0 ${roundRadiusREM}rem ${roundRadiusREM}rem;
`

const Modal = ({component, content, title, closeModal, footerButtons, hideTitle, ...props}) => (
    <ModalBG {...props}>
        <ModalBody>
            {!hideTitle && <Title hasTitle={title}>
                {title}
                {closeModal && <ClickIcon icon='window-close' onClick={closeModal} float='right' />}
            </Title>}
            <Content>
                {component}
                {content}
            </Content>
            {!!footerButtons&& <Footer>
                {footerButtons}
            </Footer>}
        </ModalBody>
    </ModalBG>
)

export default Modal
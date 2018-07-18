import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    margin: 15% auto;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 0.2em 0.4em 0 rgba(0,0,0,0.4),0 0.3em 1.2em 0 rgba(0,0,0,0.2);
    transition: all 0.3s ease-out;
    
`

const Title = styled.h3`
    background-color: lime;
    padding: 1em 2em;
`

const ModalContent = styled.div`
    padding: 2em;
`

const IconDiv = styled.div`
    align-self: center;
    padding: 0.5em;
    cursor: pointer;
`

const ModalFooter = styled.div`
    padding: 1em;
    justify-content: center;
    background-color: lime;
`

export const CloseIcon = ({onClick, ...props}) => (
    <IconDiv onClick={onClick}>
        <FontAwesomeIcon {...props}/>
    </IconDiv>
)

const Modal = ({component, content, title, closeModal, footerButtons, ...props}) => (
    <ModalBG {...props}>
        <ModalBody>
            <Title>
                {title}
                {closeModal && <CloseIcon onClick={closeModal} />}
            </Title>
            <ModalContent>
                {component}
                {content}
            </ModalContent>
            <ModalFooter>
                {footerButtons}
            </ModalFooter>
        </ModalBody>
    </ModalBG>
)

export default Modal
import React from 'react'
import styled, { keyframes } from 'styled-components'

const ModalBG = styled.div`
    display: ${props=>(props.show)? 'block':'none'};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
`

const ModalContent = styled.div`
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    transition: all 0.3s ease-out;
    
`

const Title = styled.h3`
    background-color: lime;
    
`

const unfoldIn = keyframes`
    0% {
        transform:scaleY(.005) scaleX(0);
    }
    50% {
        transform:scaleY(.005) scaleX(1);
    }
    100% {
        transform:scaleY(1) scaleX(1);
    }
`

const unfoldOut = keyframes`
    0% {
        transform:scaleY(1) scaleX(1);
    }
    50% {
        transform:scaleY(.005) scaleX(1);
    }
    100% {
        transform:scaleY(.005) scaleX(0);
    }
  &.one {
    transform:scaleY(.01) scaleX(0);
    animation:unfoldIn 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
    .modal-background {
      .modal {
        transform:scale(0);
        animation: zoomIn .5s .8s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
      }
    }
    &.out {
      transform:scale(1);
      animation:unfoldOut 1s .3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
      .modal-background {
        .modal {
          animation: zoomOut .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
        }
      }
    }
  }`

const Modal = ({component, content, title, ...props}) => (
    <ModalBG {...props}>
        <ModalContent>
            <Title>{title}</Title>
            {component}
            {content}
        </ModalContent>
    </ModalBG>
)

export default Modal
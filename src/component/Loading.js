//Big and small loading animation

import React from 'react'
import styled, { keyframes } from 'styled-components'

const SkFoldingCube = styled.div`
    margin: ${({size})=> (size>0) ? (size/10):0.1}em ${({size})=> (size>0) ? (size/2):0.5}em;
    width: ${({size})=> (size>0) ? (size*0.8):0.8}em;
    height: ${({size})=> (size>0) ? (size*0.8):0.8}em;
    ${({fullSize}) => fullSize ? 
        `position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto`
        :
        'position: relative'
    };
    transform: rotateZ(45deg);`

const skFoldCubeAngle = keyframes`
    0%, 10% {
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0; 
    }
    25%, 75% {
        transform: perspective(140px) rotateX(0deg);
        opacity: 0.75; 
    }
    90%, 100% {
        transform: perspective(140px) rotateY(180deg);
        opacity: 0; 
    }
`

const Cube = styled.div`
    float: left;
    width: 50%;
    height: 50%  ;
    position: relative;

    
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: Orange;
        animation: ${skFoldCubeAngle} 2.4s infinite linear both;
        transform-origin: 100% 100%;
    }
`

const Cube2 = styled(Cube)`
    transform: rotateZ(90deg);
    
    &:before {
        animation-delay: 0.3s;
    }
`

const Cube3 = styled(Cube)`
    transform: rotateZ(180deg);
    
    &:before {
        animation-delay: 0.6s;
    }
`

const Cube4 = styled(Cube)`
    transform: rotateZ(270deg);
    
    &:before {
        animation-delay: 0.9s;
    }
`

const FullHeightDiv = styled.div`
    min-height: 100vh;
    box-sizing: border-box;
`

const InlineDiv = styled.div`
    display: flex;
    align-self: center;
    flex-flow: row wrap;
    box-sizing: border-box;
`

const LoadingTextContainer = styled.div`
    display: grid;
    grid: 4fr 1fr 2fr / 1fr 20fr 1fr;
    min-height: 100vh;
    place-items: center / center;
`

const LoadingText = styled.p`
    grid-column: 2/2;
    grid-row: 2/2;
    place-self: center;
`

const LoadingAnim = (props) => (
    <SkFoldingCube {...props}>
        <Cube {...props}/>
        <Cube2 {...props}/>
        <Cube4 {...props}/>
        <Cube3 {...props}/>
    </SkFoldingCube>

)

export const BigLoadingScreen = ({text}) => (
    <FullHeightDiv>
        <LoadingAnim size={6} fullSize haveText={text!==undefined} />
        {text && <LoadingTextContainer>
            <LoadingText>{text}</LoadingText>
        </LoadingTextContainer>}
    </FullHeightDiv>
)

export const LoadingIcon = ({size, ...props}) => (
    <InlineDiv>
        <LoadingAnim size={size || 1} {...props}/>
    </InlineDiv>
)


export const LoadingPlaceHolder = ({...props}) => (
    <div>1</div>
)

export default LoadingAnim
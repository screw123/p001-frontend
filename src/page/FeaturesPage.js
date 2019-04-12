import React from "react"
import styled from 'styled-components'
import { Header } from "../component/HeaderStyles.js"
import {HeaderWithBar, Text} from '../component/BasicComponents.js'

const FeaturesPage = (props) => {
    const g = props.login
	const c = props.i18n
    
    return (
        <>
            <Header>{c.t('Features')}</Header>
			<Section>
				<div>
					<HeaderWithBar color='#e61d6e'>{c.t('Our Service')}</HeaderWithBar>
					<Text>Some text</Text>
				</div>
				<StepsGrid>
                    <StepDiv bgsize='70%' img='/images/ico-boxLine.svg' text={c.t('Step 1 detailed desc')} />
                    <StepDiv img='/images/ico-pickUp.svg' text={c.t('Step 2 detailed desc')} />
                    <StepDiv bgsize='60%' img='/images/ico-phone.svg' text={c.t('Step 3 detailed desc')} />
                    <StepDiv img='/images/ico-upbox.svg' text={c.t('Step 4 detailed desc')} />
                </StepsGrid>
			</Section>
        </>
    )
}

export default FeaturesPage

const Section = styled.div`
	padding: 5rem;
	display: block;
	background: #f3f3f3;
`

const StepsGrid = styled.div`
    display: grid
    grid-template-columns: 1fr 1fr
`

const StepDiv = ({img, text, bgsize}) =>(
    <StepDiv2>
        <Image src={img} bgsize={bgsize} />
        <Text>{text}</Text>
    </StepDiv2>
)
    
const StepDiv2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    border-radius: 1rem;


`

const Image = styled.div`
    width: 12rem;
	height: 12rem;
    background: ${props => `url(${props.src}) no-repeat center`}
    border-radius: 1rem;
    border-top-right-radius: 10% 50%;
    border-bottom-right-radius: 10% 50%;
    background-size: ${({bgsize='80%'})=>bgsize} auto;
    background-color: #f44d80;
    @media (max-width: 1024px) {
        width: 10rem;
	    height: 10rem;
    }
`
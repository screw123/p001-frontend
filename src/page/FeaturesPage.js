import React from "react"
import styled from 'styled-components'
import { Header } from "../component/HeaderStyles.js"
import {HeaderWithBar, Text} from '../component/BasicComponents.js'
import * as Styles from './IndexPageStyles.js'

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
            <Section bgColor='White'>
				<HeaderWithBar color='#e61d6e'>{c.t('Features')}</HeaderWithBar>

                <FeaturesGrid>
                    <FeaturesDiv>
                        <FeatureIcon image='/images/ico-couch.svg'/>
                        <FeatureHeader>{c.t('Feature1')}</FeatureHeader>
                        <FeatureDesc color='#787F84' align='left'>
                            {c.t('Feature Description1')}
                        </FeatureDesc>
                    </FeaturesDiv>

                    <FeaturesDiv>
                        <FeatureIcon image='/images/ico-lock.svg' bgsize='60%' />
                        <FeatureHeader>{c.t('Feature2')}</FeatureHeader>
                        <FeatureDesc color='#787F84' align='left'>
                            {c.t('Feature Description2')}
                        </FeatureDesc>
                    </FeaturesDiv>

                    <FeaturesDiv>
                        <FeatureIcon image='/images/ico-temp.svg' bgsize='35%' />
                        <FeatureHeader>{c.t('Feature3')}</FeatureHeader>
                        <FeatureDesc color='#787F84' align='left'>
                            {c.t('Feature Description3')}
                        </FeatureDesc>
                    </FeaturesDiv>
                </FeaturesGrid>
			</Section>
            <Styles.FooterSection>
                <Styles.TextFooter>
                    {c.t('Wisekeep© 2019 All Rights Reserved.')}
                </Styles.TextFooter>
            </Styles.FooterSection>
        </>
    )
}

export default FeaturesPage

const Section = styled.div`
	padding: 5rem;
	display: block;
    background: ${({bgColor='#f3f3f3'})=>bgColor};
    @media (max-width: 1024px) {
        padding: 5rem 3rem;
    }
    @media (max-width: 768px) {
        padding: 5rem 2rem;
    }
`

const StepsGrid = styled.div`
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 1rem;
    padding: 3rem 0;
    @media (max-width: 1024px) {
        
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
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
    grid-gap: 2rem;
    place-items: center left;
    padding: 0 2rem 0 0;
    background: White;
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
    @media (max-width: 768px) {
        width: 8rem;
	    height: 8rem;
    }
`

const FeaturesGrid = styled.div`
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    grid-gap: 6rem;
    padding: 3rem 0;
    place-items: start center;
`

const FeaturesDiv = styled.div`
    display: grid;
    place-items: center start;
    grid-gap: 1rem;
    grid-template-columns: 8rem auto;
    grid-template-rows: auto;
    grid-template-areas: 
        "icon header"
        "desc desc";
    @media (max-width: 1024px) {

    }
    @media (max-width: 768px) {

    }
`

const FeatureIcon = styled.div`
    grid-area: icon;
	min-width: 8rem;
	min-height: 8rem;
	width: 8rem;
	height: 8rem;
	background: ${props => `url(${props.image}) no-repeat center`};
    background-size: ${({bgsize='80%'})=>bgsize} auto;
`

const FeatureHeader = styled(Styles.TextBig)`
    grid-area: header;
`

const FeatureDesc = styled(Text)`
    grid-area: desc;
    align-self: start;

`
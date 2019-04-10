import React from "react"
import styled from 'styled-components'
import { Header } from "../component/HeaderStyles.js"
import {HeaderWithBar, Text} from '../component/BasicComponents.js'

const AboutUsPage = (props) => {
    const g = props.login
	const c = props.i18n
    
    return (
        <>
            <Header Pricing>{c.t('About Us')}</Header>
			<Section>
				<div>
					<HeaderWithBar color='#e61d6e'>{c.t('About Us')}</HeaderWithBar>
					<Text>Some text</Text>
				</div>
				
			</Section>
        </>
    )
}

export default AboutUsPage

const Section = styled.div`
	padding: 5rem;
	display: grid;
	grid-template-columns: 3fr 2fr;
	grid-gap: 2rem;
	grid-template-rows: 100%;
	align-items: center;
	background: #f3f3f3;
	@media (max-width: 1024px) {
		grid-template-columns: 100%;
		grid-template-rows: auto;
	}
	@media (max-width: 768px) {
		grid-template-columns: 100%;
		grid-template-rows: auto;
	}
`
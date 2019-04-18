import React, {useState} from 'react'
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import * as Styles from './IndexPageStyles'
import Wizard from '../component/Wizard'

import {
	Background,
	ContrastedCTAButton,
	HeaderWithBar,
	Text,
	ClickableText,
	CTAButton
} from '../component/BasicComponents.js'


const ContainerBox = styled.div`
    background-color: white;
    border-radius: 16px;
    margin: 5% 10%;
    padding: 4rem 3rem;
    z-index: -2;
`

const PlanPage = (props) => {
    const [redirectPath, setRedirectPath] = useState(undefined)

	const g = props.login
	const c = props.i18n

	let test = () => {
		console.log('here!!')
	}
	return (
        <ContainerBox>
            <HeaderWithBar color='#787F84' padding='1rem 0 0'>{c.t('Choose Your Plan')}</HeaderWithBar>
            <Text color='#787F84' align='left'>
                {c.t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate')}
            </Text>
            <Wizard totalSteps={5}/>
            <Styles.CardsTwoRow>
                <Styles.CardTwo>
                    <Styles.CardTwoImage image='/images/ico-couch.svg'/>
                </Styles.CardTwo>

                <Styles.CardTwo>
                    <Styles.CardTwoImage image='/images/ico-lock.svg' bgsize='60%' />
                </Styles.CardTwo>

                <Styles.CardTwo>
                    <Styles.CardTwoImage image='/images/ico-temp.svg' bgsize='35%' />
                </Styles.CardTwo>
            </Styles.CardsTwoRow>
			<button onClick={() => test()}>Heloo!!!</button>
        </ContainerBox>
	)
}

export default PlanPage
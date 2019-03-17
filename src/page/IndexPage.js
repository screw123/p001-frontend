import React from 'react'
import { I18n } from 'react-i18next'
import * as Styles from './IndexPageStyles'
import {
	Background,
	ContrastedCTAButton,
	HeaderWithBar,
	Text
} from '../component/BasicComponents.js'
import { BigLoadingScreen } from '../component/Loading.js'

class IndexPage extends React.Component {
	render = () => {
		const c = this.props.i18n
		return (
			<div>
				{/* <BigLoadingScreen text={'Welcome to Wisekeep!  Our website is under construction!'} /> */}
				<Styles.TopSection>
					<HeaderWithBar color='#fff'>
						{c.t('Wisekeep provide valet storage service')}
					</HeaderWithBar>
					<Text color='#fff'>
						{c.t(
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate, nisl commodo sagittis luctus, nunc velit auctor mauris, vitae ornare nisl nisl euismod lectus.'
						)}
					</Text>
					<br />
					<ContrastedCTAButton> {c.t('Start Now!')}</ContrastedCTAButton>
					<Styles.Image />
				</Styles.TopSection>

				<Background>
					<Styles.Section>
						<HeaderWithBar color='#787F84'>{c.t('How It Works')}</HeaderWithBar>
						<Text color='#787F84'>
							{c.t(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate'
							)}
						</Text>
					</Styles.Section>
				</Background>
			</div>
		)
	}
}

export default IndexPage

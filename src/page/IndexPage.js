import React from 'react'
import { I18n } from 'react-i18next'
import * as Styles from './IndexPageStyles'
import { Background, ContrastedCTAButton, Header, Text } from '../component/BasicComponents.js'
import { BigLoadingScreen } from '../component/Loading.js'

class IndexPage extends React.Component {
	render = () => {
		const c = this.props.i18n
		return (
			<div>
				{/* <BigLoadingScreen text={'Welcome to Wisekeep!  Our website is under construction!'} /> */}
				<Styles.TopSection>
					<Styles.Bar />
					<Header color='#fff'>{c.t('Wisekeep provide valet storage service')}</Header>
					<Text color='#fff'>
						{c.t(
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate, nisl commodo sagittis luctus, nunc velit auctor mauris, vitae ornare nisl nisl euismod lectus.'
						)}
					</Text>
					<br />
					<ContrastedCTAButton> {c.t('Start Now!')}</ContrastedCTAButton>
					<Styles.Image />
				</Styles.TopSection>
			</div>
		)
	}
}

export default IndexPage

import React from 'react'
import { I18n } from 'react-i18next'
import * as Styles from './IndexPageStyles'
import {
	Background,
	ContrastedCTAButton,
	HeaderWithBar,
	Text,
	ClickableText
} from '../component/BasicComponents.js'
import { BigLoadingScreen } from '../component/Loading.js'

class IndexPage extends React.Component {
	render = () => {
		const c = this.props.i18n
		return (
			<div>
				{/* <BigLoadingScreen text={'Welcome to Wisekeep!  Our website is under construction!'} /> */}
				<Styles.TopSection>
					<HeaderWithBar color='#fff' z={1} >
						{c.t('Wisekeep provide valet storage service')}
					</HeaderWithBar>
					<Text color='#fff' z={1}>
						{c.t(
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate, nisl commodo sagittis luctus, nunc velit auctor mauris, vitae ornare nisl nisl euismod lectus.'
						)}
					</Text>
					<br />
					{c.state.width > 768 && (<ContrastedCTAButton z={1}> {c.t('Start Now!')}</ContrastedCTAButton>)}
					<Styles.Banner />
				</Styles.TopSection>

				<Background color='#f3f3f3'>
					<Styles.Section>
						<HeaderWithBar color='#787F84'>{c.t('How It Works')}</HeaderWithBar>
						<Text color='#787F84'>
							{c.t(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate'
							)}
						</Text>
						<Styles.CardsRow>
							<Styles.Card>
								<Styles.CardImage image='/card-wave-1.png' />
								<Styles.CardContent>
									<Text color='#787F84' align='center'>
										{c.t('We send you boxes')}
									</Text>
								</Styles.CardContent>
								<Styles.CardFooter>
									<ClickableText color='#787F84' align='center'>
										{c.t('Learn More')}
									</ClickableText>
									<Styles.RightIconWrapper>
										<Styles.RightIcon />
									</Styles.RightIconWrapper>
								</Styles.CardFooter>
							</Styles.Card>

							<Styles.Card>
								<Styles.CardImage image='/card-wave-2.png' />
								<Styles.CardContent>
									<Text color='#787F84' align='center'>
										{c.t(
											'You put your stuff in physical box, and digitally store the stuff in the virtual box. We store both'
										)}
									</Text>
								</Styles.CardContent>
								<Styles.CardFooter>
									<ClickableText color='#787F84' align='center'>
										{c.t('Learn More')}
									</ClickableText>
									<Styles.RightIconWrapper>
										<Styles.RightIcon />
									</Styles.RightIconWrapper>
								</Styles.CardFooter>
							</Styles.Card>

							<Styles.Card>
								<Styles.CardImage image='/card-wave-3.png' />
								<Styles.CardContent>
									<Text color='#787F84' align='center'>
										{c.t('We send you your stuff when you need it')}
									</Text>
								</Styles.CardContent>
								<Styles.CardFooter>
									<ClickableText color='#787F84' align='center'>
										{c.t('Learn More')}
									</ClickableText>
									<Styles.RightIconWrapper>
										<Styles.RightIcon />
									</Styles.RightIconWrapper>
								</Styles.CardFooter>
							</Styles.Card>

							<Styles.Card>
								<Styles.CardImage image='/card-wave-4.png' />
								<Styles.CardContent>
									<Text color='#787F84' align='center'>
										{c.t('Enjoy your stuff again')}
									</Text>
								</Styles.CardContent>
								<Styles.CardFooter>
									<ClickableText color='#787F84' align='center'>
										{c.t('Learn More')}
									</ClickableText>
									<Styles.RightIconWrapper>
										<Styles.RightIcon />
									</Styles.RightIconWrapper>
								</Styles.CardFooter>
							</Styles.Card>
						</Styles.CardsRow>
					</Styles.Section>
				</Background>
			</div>
		)
	}
}

export default IndexPage

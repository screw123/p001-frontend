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
					<HeaderWithBar color='#fff' z={1}>
						{c.t('Wisekeep provide valet storage service')}
					</HeaderWithBar>
					<Text color='#fff' z={1}>
						{c.t(
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate, nisl commodo sagittis luctus, nunc velit auctor mauris, vitae ornare nisl nisl euismod lectus.'
						)}
					</Text>
					<br />
					{c.state.width > 768 && (
						<ContrastedCTAButton z={1}> {c.t('Start Now!')}</ContrastedCTAButton>
					)}
					<Styles.Banner />
				</Styles.TopSection>

				{/* Cards Section */}
				<Background color='#f3f3f3'>
					<Styles.Section top={true}>
						<HeaderWithBar color='#787F84'>{c.t('How It Works')}</HeaderWithBar>
						<Text color='#787F84'>
							{c.t(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate'
							)}
						</Text>
						<Styles.CardsRow>
							<Styles.Card>
								<Styles.CardImage image='/images/ico-boxLine.svg' />
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
								<Styles.CardImage image='/images/ico-pickUp.svg' />
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
								<Styles.CardImage image='/images/ico-phone.svg' />
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
								<Styles.CardImage image='/images/ico-upbox.svg' />
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

					<Styles.Section top={false}>
						<HeaderWithBar color='#787F84'>{c.t('Why Us')}</HeaderWithBar>
						<Text color='#787F84' align='center'>
							{c.t(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate, nisl commodo sagittis luctus, nunc velit auctor mauris, vitae ornare nisl nisl euismod lectus. Vestibulum faucibus posuere neque eget eleifend. In in mattis sem. Nullam ultrices auctor turpis non pharetra.'
							)}
						</Text>

						<Styles.CardsTwoRow>
							<Styles.CardTwo>
								<Styles.CardTwoImage image='/images/ico-couch.svg' />
								<Styles.CardTwoContent>
									<Styles.TextBig>{c.t('Save Space')}</Styles.TextBig>
									<Text color='#787F84' align='left'>
										{c.t(
											'Lorem ipsum dolor sit amet,consectetur adipiscing elit'
										)}
									</Text>
									<ClickableText color='#787F84' align='left'>
										{c.t('Learn More')}
									</ClickableText>
								</Styles.CardTwoContent>
							</Styles.CardTwo>

							<Styles.CardTwo>
								<Styles.CardTwoImage image='/images/ico-lock.svg' />
								<Styles.CardTwoContent>
									<Styles.TextBig>{c.t('Security')}</Styles.TextBig>
									<Text color='#787F84' align='left'>
										{c.t(
											'Lorem ipsum dolor sit amet,consectetur adipiscing elit'
										)}
									</Text>
									<ClickableText color='#787F84' align='left'>
										{c.t('Learn More')}
									</ClickableText>
								</Styles.CardTwoContent>
							</Styles.CardTwo>

							<Styles.CardTwo>
								<Styles.CardTwoImage image='/images/ico-temp.svg' />
								<Styles.CardTwoContent>
									<Styles.TextBig>{c.t('Climate Control')}</Styles.TextBig>
									<Text color='#787F84' align='left'>
										{c.t(
											'Lorem ipsum dolor sit amet,consectetur adipiscing elit'
										)}
									</Text>
									<ClickableText color='#787F84' align='left'>
										{c.t('Learn More')}
									</ClickableText>
								</Styles.CardTwoContent>
							</Styles.CardTwo>
						</Styles.CardsTwoRow>
					</Styles.Section>
				</Background>

				{/* Plan Section */}
				<Styles.PlanSection>
					<Styles.PlanImage />
					<Styles.PlanContent>
						<Background>
							<HeaderWithBar color='#787F84'>{c.t('Choose Your Plan')}</HeaderWithBar>
							<Text color='#787F84' align='left'>
								{c.t(
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate'
								)}
							</Text>

							<Text color='#787F84' align='left'>
								{c.t('Select the payment method')}
							</Text>
						</Background>
					</Styles.PlanContent>
				</Styles.PlanSection>
			</div>
		)
	}
}

export default IndexPage

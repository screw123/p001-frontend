import React from 'react'
import { I18n } from 'react-i18next'
import * as Styles from './IndexPageStyles'
import {
	Background,
	ContrastedCTAButton,
	HeaderWithBar,
	Text,
	ClickableText,
	CTAButton
} from '../component/BasicComponents.js'
import { BigLoadingScreen } from '../component/Loading.js'

class IndexPage extends React.Component {
	render = () => {
		const c = this.props.i18n
		return (
			<>
				<Styles.TopSection>
					<HeaderWithBar color='#fff' z={1}>
						{c.t('Wisekeep is your storage service at fingertips')}
					</HeaderWithBar>
					<Text color='#fff' z={1}>
						{c.t('short description of our service')}
					</Text>
					<br />
					{c.state.width > 768 && (
						<ContrastedCTAButton z={1}> {c.t('Start Now')}</ContrastedCTAButton>
					)}
					<Styles.Banner />
				</Styles.TopSection>

				{/* Cards Section */}
				<Background color='#f3f3f3'>
					<Styles.Section top={true}>
						<HeaderWithBar color='#787F84'>{c.t('How It Works')}</HeaderWithBar>
						<Text color='#787F84'>{c.t('Infinite space in 4 steps')}</Text>
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
								<Styles.CardImage image='/images/ico-pickUp.svg' bgsize='60%' />
								<Styles.CardContent>
									<Text color='#787F84' align='center'>
										{c.t('We store both physical and digital stuff')}
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
								<Styles.CardImage image='/images/ico-phone.svg' bgsize='40%' />
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
								<Styles.CardTwoImage image='/images/ico-couch.svg'/>
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
								<Styles.CardTwoImage image='/images/ico-lock.svg' bgsize='60%' />
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
								<Styles.CardTwoImage image='/images/ico-temp.svg' bgsize='35%' />
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
						<HeaderWithBar color='#787F84'>{c.t('Choose Your Plan')}</HeaderWithBar>
						<Text color='#787F84' align='left'>
							{c.t(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate'
							)}
						</Text>

						<Styles.ProgressImage image='/images/line.svg' />

						<Text color='#787F84' align='left'>
							{c.t('Select the payment method')}
						</Text>

						<Styles.CardsThreeRow>
							<Styles.CardThree>
								<Styles.CardThreeImage image='/images/ico-calendarDay.svg' />
								<Styles.CardThreeContent>
									<Styles.TextPlan>{c.t('Daily')}</Styles.TextPlan>
								</Styles.CardThreeContent>
							</Styles.CardThree>

							<Styles.CardThree>
								<Styles.CardThreeImage image='/images/ico-calendarMonth.svg' />
								<Styles.CardThreeContent>
									<Styles.TextPlan>{c.t('Monthly')}</Styles.TextPlan>
								</Styles.CardThreeContent>
							</Styles.CardThree>

							<Styles.CardThree>
								<Styles.CardThreeImage image='/images/ico-calendarYear.svg' />
								<Styles.CardThreeContent>
									<Styles.TextPlan>{c.t('Annual')}</Styles.TextPlan>
								</Styles.CardThreeContent>
							</Styles.CardThree>
						</Styles.CardsThreeRow>

						<Styles.PlanFooter>
							<Styles.Condition>
								<Styles.CheckBox type='checkbox' />
								<Text color='#787F84' align='left'>
									{c.t('I agree with the terms and conditions')}
								</Text>
							</Styles.Condition>
							<Styles.NextButton>
								<CTAButton>{c.t('Next')}</CTAButton>
							</Styles.NextButton>
						</Styles.PlanFooter>
					</Styles.PlanContent>
				</Styles.PlanSection>

				{/* Review Section */}
				<Styles.ReviewSection>
					<HeaderWithBar color='#787F84'>
						{c.t('Loved by businesses and individuals')}
					</HeaderWithBar>

					<Styles.CardsFourRow>
						<Styles.CardFour>
							<Styles.Stars>
								{[...Array(5)].map(i => (
									<Styles.StarIcon />
								))}
							</Styles.Stars>
							<Text>
								{c.t(
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate, nisl commodo sagittis'
								)}
							</Text>
							<Styles.CardFourContent>
								<Styles.Avatar image='/images/img-avatar.png' />
								<Styles.AvatarDescription>
									<Styles.TextName>{c.t('Nicolas Smit')}</Styles.TextName>
									<Styles.TextDesignation>
										{c.t('Individual User')}
									</Styles.TextDesignation>
								</Styles.AvatarDescription>
							</Styles.CardFourContent>
						</Styles.CardFour>

						<Styles.CardFour>
							<Styles.Stars>
								{[...Array(5)].map(i => (
									<Styles.StarIcon />
								))}
							</Styles.Stars>
							<Text>
								{c.t(
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate, nisl commodo sagittis'
								)}
							</Text>
							<Styles.CardFourContent>
								<Styles.Avatar image='/images/img-avatar.png' />
								<Styles.AvatarDescription>
									<Styles.TextName>{c.t('Nicolas Smit')}</Styles.TextName>
									<Styles.TextDesignation>
										{c.t('Individual User')}
									</Styles.TextDesignation>
								</Styles.AvatarDescription>
							</Styles.CardFourContent>
						</Styles.CardFour>

						<Styles.CardFour>
							<Styles.Stars>
								{[...Array(5)].map(i => (
									<Styles.StarIcon />
								))}
							</Styles.Stars>
							<Text>
								{c.t(
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate, nisl commodo sagittis'
								)}
							</Text>
							<Styles.CardFourContent>
								<Styles.Avatar image='/images/img-avatar.png' />
								<Styles.AvatarDescription>
									<Styles.TextName>{c.t('Nicolas Smit')}</Styles.TextName>
									<Styles.TextDesignation>
										{c.t('Individual User')}
									</Styles.TextDesignation>
								</Styles.AvatarDescription>
							</Styles.CardFourContent>
						</Styles.CardFour>
					</Styles.CardsFourRow>

					<Styles.BrandRow>
						<Styles.BrandWrapper>
							<Styles.BrandImage image='/images/logo.png' />
							<Styles.BrandImage image='/images/logo.png' />
							<Styles.BrandImage image='/images/logo.png' />
						</Styles.BrandWrapper>

						<Styles.BrandText>{c.t('Brands that trust us')}</Styles.BrandText>
					</Styles.BrandRow>
				</Styles.ReviewSection>

				{/* Subscribe Section */}
				{/*<Styles.SubscribeSection image='/images/city.png'>
					<Styles.SubscribeBox>
						<Styles.TextSubscribe>
							{c.t('Subscribe and get the latest news')}
						</Styles.TextSubscribe>

						<Styles.InputBox>
							<Styles.Email placeholder='Email' />
							<CTAButton>{c.t('Send')}</CTAButton>
						</Styles.InputBox>
					</Styles.SubscribeBox>

					<Styles.TextDirection>{c.t('Get Directions')}</Styles.TextDirection>
				</Styles.SubscribeSection>*/}

				{/* Footer Section */}
				<Styles.FooterSection>
					<Styles.TextFooter>
						{c.t('Wisekeep© 2019 All Rights Reserved.')}
					</Styles.TextFooter>
				</Styles.FooterSection>
			</>
		)
	}
}

export default IndexPage

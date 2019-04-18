import React, {useState} from 'react'
import { I18n } from 'react-i18next'
import * as Styles from './IndexPageStyles'
import { Redirect } from 'react-router-dom'

import {
	Background,
	ContrastedCTAButton,
	HeaderWithBar,
	Text,
	ClickableText,
	CTAButton
} from '../component/BasicComponents.js'

const IndexPage = (props) => {
	const c = props.i18n

	const [redirectPath, setRedirectPath] = useState(undefined)
	const [passOnState, setPassOnState] = useState(undefined)
	const tawk = window.Tawk_API || {}

	return (
		<>
			{redirectPath && <Redirect push to={{pathname: redirectPath, state: passOnState }} />  }

			<Styles.TopSection>
				<HeaderWithBar color='#fff' z={1}>
					{c.t('When storage is rare we guard it with care')}
				</HeaderWithBar>
				<Text color='#fff' z={1}>
					{c.t('short description of our service')}
				</Text>
				<br />
				{c.state.width > 768 && (
					<ContrastedCTAButton z={1} onClick={
						//()=>setRedirectPath('/login')}
						()=>tawk.toggle()}
					> {c.t('Start Now')}</ContrastedCTAButton>
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
								<ClickableText color='#787F84' align='center' onClick={()=>setRedirectPath('/features')}>
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
								<ClickableText color='#787F84' align='center' onClick={()=>setRedirectPath('/features')}>
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
								<ClickableText color='#787F84' align='center' onClick={()=>setRedirectPath('/features')}>
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
								<ClickableText color='#787F84' align='center' onClick={()=>setRedirectPath('/features')}>
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
					<HeaderWithBar color='#787F84'>{c.t('Why Choose Wisekeep')}</HeaderWithBar>
					<Text color='#787F84' align='center'>
						{c.t('Wisekeep has a lot of nice features1')}
					</Text>
					<Text><br /></Text>
					<Text color='#787F84' align='center'>
						{c.t('Wisekeep has a lot of nice features2')}
					</Text>

					<Styles.CardsTwoRow>
						<Styles.CardTwo>
							<Styles.CardTwoImage image='/images/ico-couch.svg'/>
							<Styles.CardTwoContent>
								<Styles.TextBig>{c.t('Feature1')}</Styles.TextBig>
								<ClickableText color='#787F84' align='left' onClick={()=>setRedirectPath('/features')}>
									{c.t('Learn More')}
								</ClickableText>
							</Styles.CardTwoContent>
						</Styles.CardTwo>

						<Styles.CardTwo>
							<Styles.CardTwoImage image='/images/ico-lock.svg' bgsize='60%' />
							<Styles.CardTwoContent>
								<Styles.TextBig>{c.t('Feature2')}</Styles.TextBig>
								<ClickableText color='#787F84' align='left' onClick={()=>setRedirectPath('/features')}>
									{c.t('Learn More')}
								</ClickableText>
							</Styles.CardTwoContent>
						</Styles.CardTwo>

						<Styles.CardTwo>
							<Styles.CardTwoImage image='/images/ico-temp.svg' bgsize='35%' />
							<Styles.CardTwoContent>
								<Styles.TextBig>{c.t('Feature3')}</Styles.TextBig>
								<ClickableText color='#787F84' align='left' onClick={()=>setRedirectPath('/features')}>
									{c.t('Learn More')}
								</ClickableText>
							</Styles.CardTwoContent>
						</Styles.CardTwo>
					</Styles.CardsTwoRow>
				</Styles.Section>
			</Background>

			{/* Plan Section */}
			{/*<Styles.PlanSection>
				<Styles.PlanImage />
				<Styles.PlanContent>
					<HeaderWithBar color='#787F84'>{c.t('Choose Your Plan')}</HeaderWithBar>
					<Text color='#787F84' align='left'>
						{c.t('Let Wisekeep be with you our plans move with the rhythm of your life')}
					</Text>

					<Styles.ProgressImage image='/images/line.svg' />

					<Text color='#787F84' align='left'>
						{c.t('Choose the time interval most suitable to you')}
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
						{/*<Styles.Condition>
							<Styles.CheckBox type='checkbox' />
							<Text color='#787F84' align='left'>
								{c.t('I agree with the terms and conditions')}
							</Text>
						</Styles.Condition>
						<Styles.NextButton>
							<CTAButton onClick={()=>setRedirectPath('/quotation')}>{c.t('Next')}</CTAButton>
						</Styles.NextButton>
					</Styles.PlanFooter>
				</Styles.PlanContent>
			</Styles.PlanSection>*/}

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
						<Text>{'"FAST, EASY, RELIABLE"\nHad the pleasure of dealing with this lovely company today. Staff are friendly, helpful & caring! Fast, easy and reliable. Would definitely use thie service again. Thank you!! '}</Text>
						<Styles.CardFourContent>
							{/*<Styles.Avatar image='/images/img-avatar.png' />*/}
							<Styles.AvatarDescription>
								<Styles.TextName>Eliza K.</Styles.TextName>
							</Styles.AvatarDescription>
						</Styles.CardFourContent>
					</Styles.CardFour>

					<Styles.CardFour>
						<Styles.Stars>
							{[...Array(5)].map(i => (
								<Styles.StarIcon />
							))}
						</Styles.Stars>
						<Text>{'本人多野又怕煩，研究左幾間迷你倉，都多條款挷實，試左Wisekeep, 佢將d大膠箱送上門, pack完野call佢地 就幫你送去倉 要返d野嘅時候佢地就送返上門 ，都幾方便， 每月收$30幾蚊個大箱，app記錄都好方便，like!'}</Text>
						<Styles.CardFourContent>
							{/*<Styles.Avatar image='/images/img-avatar.png' />*/}
							<Styles.AvatarDescription>
								<Styles.TextName>Kenny L.</Styles.TextName>
							</Styles.AvatarDescription>
						</Styles.CardFourContent>
					</Styles.CardFour>

					<Styles.CardFour>
						<Styles.Stars>
							{[...Array(5)].map(i => (
								<Styles.StarIcon />
							))}
						</Styles.Stars>
						<Text>{'Very satisfied with the services. On time, easy to schedule, clean new cases, and very courteous crew. Thank you Wisekeep team!'}</Text>
						<Styles.CardFourContent>
							{/*<Styles.Avatar image='/images/img-avatar.png' />*/}
							<Styles.AvatarDescription>
								<Styles.TextName>Lianne W.</Styles.TextName>
								<Styles.TextDesignation>

								</Styles.TextDesignation>
							</Styles.AvatarDescription>
						</Styles.CardFourContent>
					</Styles.CardFour>
				</Styles.CardsFourRow>
`			
				{/*<Styles.BrandRow>
					<Styles.BrandWrapper>
						<Styles.BrandImage image='/images/logo.png' />
						<Styles.BrandImage image='/images/logo.png' />
						<Styles.BrandImage image='/images/logo.png' />
					</Styles.BrandWrapper>

					<Styles.BrandText>{c.t('Brands that trust us')}</Styles.BrandText>
				</Styles.BrandRow>*/}
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

export default IndexPage

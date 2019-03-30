import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Background and Cards

const BG = styled.div`
	background: ${({color})=> color? color:'White'};
	box-sizing: border-box;
	min-height: 100vh;
`

const BG2 = styled.div`
	// @media (max-width: 1366px) {
	//     width: 100%
	// }

	// @media (min-width: 1367px) {
	//     width: 1366px
	//     margin: auto
	// }

	// New
	padding: 3rem 6rem;

	margin: auto;
	@media (max-width: 1024px) {
		padding: 2rem;
	}
	@media (max-width: 768px) {
		padding: 1.75rem 1rem;
	}
`

export const Background = ({ children, color }) => (
	<BG color={color}>
		<BG2>
			{children}
		</BG2>
	</BG>
)

export const Card = styled.div`
	border-radius: 1rem;
	background: #fff;
	${({noShadow})=>noShadow? '' : 'box-shadow: 0px 6px 12px 3px rgba(0, 0, 0, 0.4);'}

`

export const BigCard = styled(Card)`
	display: flex;
	min-height: 70vh;
`

export const AccentedBigCard = styled.div`
	min-height: 70vh;
	border-radius: 1rem;
	box-shadow: 6px 6px 48px 3px rgba(230, 29, 110, 0.4);
`

export const AccentedTwinCard = styled(AccentedBigCard)`
	display: grid;
	min-height: 70vh;
	grid-template-columns: 1fr 1fr;
	@media (max-width: 768px) {
		grid-template-columns: auto;
	}
`

export const TwinCardChild = styled.div`
	padding: 2rem;
	border-radius: 1rem;
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const AccentedTwinCardChild = styled(TwinCardChild)`
	background: linear-gradient(180deg, #f43ea6 0%, #f5576c 100%);
`




//Text and Headers

export const Text = styled.div`
	font-size: 1rem;
	line-height: 1.5rem;
	color: ${props => props.color? props.color: '#888'};
	text-align: ${props => props.align};
	@media (max-width: 768px) {
		font-size: 0.85rem;
		line-height: 1.1rem;
	}
`

export const Header = styled(Text)`
	margin: 0 0 1rem 0;
	font-size: 3rem;
	font-weight: 600;
	line-height: 3.75rem;
	@media (max-width: 768px) {
		font-size: 2rem;
		line-height: 1.75rem;
	}
`

export const Header2 = styled(Text)`
	font-size: 2.5rem;
	font-weight: 400;
	line-height: 3.5rem;
	@media (max-width: 768px) {
		font-size: 1.75rem;
		line-height: 1.75rem;
	}
`

export const ClickableText = styled(Text)`
	font-weight: 600;
	cursor: pointer;
`


export const HeaderCards = styled(Text)`
	border-bottom: 1px solid #E8E8E8;
	color: #787F84;
	font-size: 28px;
	font-weight: bold;
    padding-bottom: 2%;
`


//Buttons

export const Button = styled.button`
	cursor: pointer;
	border: none;
	font-size: 1.25rem;
	font-weight: 600;
	border-radius: 3rem;
	margin: 0.5rem 1rem;
	padding: 0.5rem 2rem;
	min-width: 10rem;
	background: ${props => !props.disabled ? '#E61D6E': 'rgba(128, 128, 128, 0.2)'};
	color: ${props => (!props.disabled ?  'white': '#888')};
`

export const CTAButton = styled(Button)`
	padding: 0.75rem 2.5rem;
	font-size: 1.5rem;
	min-width: 12rem;
	background: ${props => !props.disabled ? `rgba(128, 128, 128, 0.2)` : `linear-gradient(180deg, #F43EA6 0%, #F5576C 100%)`};
`

export const ContrastedCTAButton = styled(CTAButton)`
	background: ${props => props.disabled ? 'rgba(128, 128, 128, 0.2)' : 'White'};
	color: ${props => props.disabled ?  '#E61D6E': '#888'};
`

export const FunctionButton = styled.button`
	cursor: pointer;
	border: 1px solid #888;
	font-size: 1rem;
	border-radius: 3rem;
	margin: 0.5rem 1rem;
	padding: 0.5rem 2rem;
	min-width: 8rem;
	background: ${props => !props.disabled ? 'transparent': 'rgba(128, 128, 128, 0.2)'};
	color: ${props => (props.disabled ?  'white' : '#888')};
`

export const ContrastFunctionButton = styled.button`
	cursor: pointer;
	border: 1px solid #D00;
	font-size: 1rem;
	border-radius: 3rem;
	margin: 0.5rem 1rem;
	padding: 0.5rem 2rem;
	min-width: 8rem;
	background: ${props => !props.disabled ? 'transparent': 'rgba(128, 128, 128, 0.2)'};
	color: ${props => (props.disabled ?  'white' : '#D00')};
`



//Special Text and Icon

export const Tag = styled.span`
	${props => props.float && `float: ${props.float}`};
	background: ${props => (props.background ? props.background : 'Red')};
	padding: 0.25rem;
	margin: 0 0.25rem;
	font-size: 0.7rem;
	border-radius: ${props => (props.circle ? `50%` : `0.2rem`)};
	color: ${props => (props.color ? props.color : `White`)};
	${({ children }) => (children ? '' : 'visibility: hidden')};
`

export const ToolTip = props => (
	<ToolTipBox>
		{props.mainText}
		<ToolTipText>{props.tip}</ToolTipText>
	</ToolTipBox>
)

const ToolTipBox = styled.div`
	position: relative;
	display: inline-block;
	border-bottom: 1px dotted black;
	cursor: pointer;
	z-index: 1;

	// If you want to make it full width:
	// width: 100%;
	//text-align: center;
`

const ToolTipText = styled.span`
	visibility: hidden;
	background-color: DimGrey;
	color: #fff;
	text-align: center;
	border-radius: 0.25rem;
	padding: 0.1rem 0.5rem;
	position: absolute;
	z-index: 1;
	left: 100%;
	margin-left: 0.5rem;

	&:after {
		content: '';
		position: absolute;
		left: 100%;
		z-index: 1000;
		margin-left: 0;
		margin-bottom: -1rem;
	}

	${ToolTipBox}:hover & {
		visibility: visible;
	}
`

const IconSpan = styled.span`
	align-self: center;
	cursor: pointer;
	${({ float }) => (float ? 'float:' + float : '')}
`

export const ClickIcon = ({ icon, onClick, float, ...props }) => (
	<IconSpan onClick={onClick} float={float}>
		<FontAwesomeIcon icon={icon} {...props} />
	</IconSpan>
)

export const StraightRow = styled.div`
    display: flex
    flex-flow: row nowrap;
`

const SectionDiv = styled.div`
	display: grid;
	box-sizing: border-box;
	grid-template-columns: [s1] 2.5% [content] auto [end] 2.5% [s2];
`

const Div2 = styled.div`
	grid-column: content / end;
`

const SectionHeader = styled.div`
	font-weight: 600;
	font-size: 1.75rem;
	box-sizing: border-box;
	display: grid;
	padding: 1rem 0;
	grid-column: content / end;
	grid-template-columns: [iconLeft] ${({ headerIconLeft }) => (headerIconLeft ? '12.5' : '0')}% [content] auto [iconRight] ${({
			headerIconRight
		}) => (headerIconRight ? '12.5' : '0')}% [end];
`

const HeaderText = styled.div`
	grid-column: content / iconRight;
`

const HeaderIconLeft = styled.div`
	grid-column: iconLeft / content;
`

const HeaderIconRight = styled.div`
	grid-column: iconRight / end;
`

const SectionContent = styled.div`
	display: flex;
	> 
`

export const Section = props => {
	return (
		<SectionDiv>
			<Div2>
				<SectionHeader {...props}>
					<HeaderIconLeft {...props}>{props.headerIconLeft}</HeaderIconLeft>
					<HeaderText {...props}>{props.headerText}</HeaderText>
					<HeaderIconRight {...props}>{props.headerIconRight}</HeaderIconRight>
				</SectionHeader>
				<SectionContent>{props.children}</SectionContent>
			</Div2>
		</SectionDiv>
	)
}

export default {
	Background,
	StraightRow,
	ClickableText,
	Tag,
	Section,
	SectionContent,
	ToolTip,
	ClickIcon
}

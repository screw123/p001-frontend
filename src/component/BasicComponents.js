import React from 'react'
import styled from 'styled-components'

const BG = styled.div`
    background: White;
    box-sizing: border-box;
    min-height: 100vh;
`

const BG2 = styled.div`
    @media (max-width: 1366px) {
        width: 100%
    }
    
    @media (min-width: 1367px) {
        width: 1366px
        margin: auto
    }
`

export const Background = ({children}) => (
    <BG>
        <BG2>
			{children}
			<p></p>
        </BG2>
    </BG>
)

export const WrapRow = styled.div`
    display: flex;
    flex-flow: row wrap;
`

export const StraightRow = styled.div`
    display: flex
    flex-flow: row nowrap;
`

export const ClickableText = styled.div`
    font-weight: 600;
	cursor: pointer;
`

export const Tag = styled.span`
    ${props => props.float && `float: ${props.float}`};
	background: ${props => props.background? props.background : 'Red'};
	padding: 0.25rem;
	margin: 0 0.25rem;
    font-size: 0.7rem;
    border-radius: ${props => props.circle? `50%`:`0.2rem`};
    color: ${props => props.color ? props.color : `White`};
    ${({children})=>children? '': 'visibility: hidden'};
`

const SectionDiv = styled.div`
	display: grid;
	box-sizing:border-box;
	grid-template-columns: [s1] 2.5% [content] auto [end] 2.5% [s2];
`

const Div2 = styled.div`
	grid-column: content / end;
`

const SectionHeader = styled.div`
    font-weight: 600;
    font-size: 1.75rem;
    box-sizing:border-box;
	display: grid;
	padding: 1rem 0;
	grid-column: content / end;
	grid-template-columns: [iconLeft] ${({headerIconLeft})=>headerIconLeft?'12.5':'0'}% [content] auto [iconRight] ${({headerIconRight})=>headerIconRight?'12.5':'0'}% [end];
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

export const Section = (props) => {
	return(
		<SectionDiv><Div2>
			<SectionHeader {...props}>
				<HeaderIconLeft {...props}>{props.headerIconLeft}</HeaderIconLeft>
				<HeaderText {...props}>{props.headerText}</HeaderText>
				<HeaderIconRight {...props}>{props.headerIconRight}</HeaderIconRight>
			</SectionHeader>
			<SectionContent>{props.children}</SectionContent>
		</Div2></SectionDiv>
	)
}

export const ToolTip = (props) => (
	<ToolTipBox>
		{props.mainText}
		<ToolTipText>{props.tip}</ToolTipText>
	</ToolTipBox>
);

const ToolTipBox = styled.div`
	position: relative;
	display: inline-block;
	border-bottom: 1px dotted black;
	cursor: pointer;
	z-index: 1;

	// If you want to make it full width:
	// width: 100%;
	//text-align: center;
`;

const ToolTipText = styled.span`
	visibility: hidden;
	background-color: DimGrey;
	color: #fff;
	text-align: center;
	border-radius: 0.25em;
	padding: 0.1em 0.5em;
	position: absolute;
	z-index: 1;
	left: 100%;
	margin-left:0.5em;

	&:after {
		content: "";
		position: absolute;
		left: 100%;
		z-index: 1000;
		margin-left: 0;
		margin-bottom: -1em;
	}

	${ToolTipBox}:hover & {
		visibility: visible;
	}
`


export default {Background, WrapRow, StraightRow, ClickableText, Tag, Section, SectionContent, ToolTip }
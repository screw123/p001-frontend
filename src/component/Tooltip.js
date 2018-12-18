import React from 'react';
import styled from 'styled-components';

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
`;

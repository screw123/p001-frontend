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

	// If you want to make it full width:
	// width: 100%;
	// text-align: center;
`;

const ToolTipText = styled.span`
	visibility: hidden;
	width: 120px;
	background-color: black;
	color: #fff;
	text-align: center;
	border-radius: 6px;
	padding: 5px 0;
	position: absolute;
	z-index: 1;
	bottom: 150%;
	left: 50%;
	margin-left: -60px;

	&:after {
		content: "";
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -1em;
		border-width: 1em;
		border-style: solid;
		border-color: black transparent transparent transparent;
	}

	${ToolTipBox}:hover & {
		visibility: visible;
	}
`;

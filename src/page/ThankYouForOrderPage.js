import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LocaleApiSubscriber } from '../stateContainer/LocaleApi.js';

const Error = styled.p`
	color: red;
	font-size: 1em;
	text-align: center;
`;

const ThankYouForOrderPage = (props) => {
	let orderInfo = props.orderInfo;
	console.log(orderInfo, 'orderInfo');
	return (
		<LocaleApiSubscriber>
			{(c) => {
				return <Error>{c.t(props.message)}</Error>;
			}}
		</LocaleApiSubscriber>
	)
}

ThankYouForOrderPage.propTypes = {
	message: PropTypes.string.isRequired
}

export default ThankYouForOrderPage

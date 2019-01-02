import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LocaleApiSubscriber } from '../stateContainer/LocaleApi.js';

const Error = styled.p`
	color: red;
	font-size: 1em;
	text-align: center;
`;

const SystemError = (props) => {
	let errorData = props.errorData;
	console.log(errorData, 'errorData');
	return (
		<LocaleApiSubscriber>
			{(c) => {
				return <Error>{c.t(props.message)}</Error>;
			}}
		</LocaleApiSubscriber>
	);
};

SystemError.propTypes = {
	message: PropTypes.string.isRequired
};

export default SystemError;

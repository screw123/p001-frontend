import React from 'react';

import { Formik, Field } from 'formik';
import FormikForm, { MultiSelect, FormButton, FormErr } from '../component/FormikForm.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import {Background} from '../component/BasicComponents.js';

import UserProfileForm from '../form/UserProfileForm.js';
import EditAddressForm from '../form/EditAddressForm.js';
import SelectAddress from '../component/SelectAddress.js';

import { ApolloProvider, Query, Mutation } from 'react-apollo';

import { getMyAccount } from '../gql/query.js';

import GqlApi, { GqlApiSubscriber } from '../stateContainer/GqlApi.js';
import InfoList from '../component/InfoList.js';
import Gallery from '../component/Gallery.js';
import EditAccountForm from '../form/EditAccountForm';

import { ToolTip } from '../component/Tooltip';

class TestPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { address: '' };
	}

	handleAddressChange = (n, v) => this.setState({ address: v });

	render() {
		return (
			<div style={{ width: '25%', margin: '15% auto' }}>
				<ToolTip mainText={'Button'} tip={'You hovered me!'} />
			</div>
		);
	}
}

export default TestPage;

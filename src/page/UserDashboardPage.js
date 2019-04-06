import React from 'react'
import { getMyself } from '../gql/query.js'

import { ApolloProvider, Query } from 'react-apollo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AccountListForm from '../form/AccountListForm.js'

import { Redirect } from 'react-router-dom'

import { Background, Section, ClickableText, Text } from '../component/BasicComponents.js'
import * as Styles from './UserDashboardStyles'

const DashboardLink = props => (
	<ClickableText onClick={props.onClick}>
		{props.leftIcon && <FontAwesomeIcon icon={props.leftIcon} />}
		{props.leftIcon && ' '}
		{props.caption}
	</ClickableText>
)

class UserDashboardPage extends React.Component {
	constructor(props) {
		super(props)
		this.toggleUserProfileForm = this.toggleUserProfileForm.bind(this)
		this.state = {
			showUserProfileForm: false,
			showAccountListForm: true,
			redirectPath: undefined,
			passOnState: undefined
		}
	}

	toggleUserProfileForm = () => {
		this.setState({
			redirectPath: '/editUser',
			passOnState: undefined
		})
	}

	genUserProfile = ({ t, myself }) => (
		<div>
			<Styles.WelcomeSection>
				<Styles.WelcomeLeft>
					<Styles.Text size='3rem' height='3.25rem' weight='600'>
						{t('Hello, user!', { name: myself.firstName + ' ' + myself.lastName })}
					</Styles.Text>
					<Styles.Text size='2rem' height='3.25rem'>
						{t('Welcome')}
					</Styles.Text>
					<DashboardLink
						onClick={this.toggleUserProfileForm}
						leftIcon='sign-in-alt'
						caption={t('Edit User')}
					/>
				</Styles.WelcomeLeft>

				<Styles.WelcomeRight />
			</Styles.WelcomeSection>

			<Styles.CardsRow>
				<Styles.Card>
					<Styles.CardImage image='/images/ico-house.svg' />
					<Styles.CardGap />
					<Styles.Text align='center' size='1.5rem' weight='600'>
						{t('0 items at my location')}
					</Styles.Text>
					<Styles.CardGap />
					<ClickableText color='#E61D6E' align='center'>
						View List
					</ClickableText>
				</Styles.Card>

				<Styles.Card>
					<Styles.CardImage image='/images/ico-warehouse.svg' />
					<Styles.CardGap />
					<Styles.Text align='center' size='1.5rem' weight='600'>
						{t('0 items at storage')}
					</Styles.Text>
					<Styles.CardGap />
					<ClickableText color='#E61D6E' align='center'>
						View List
					</ClickableText>
				</Styles.Card>

				<Styles.Card>
					<Styles.Text size='1.5rem' weight='600'>
						{t('My Accounts')}
					</Styles.Text>
				</Styles.Card>
			</Styles.CardsRow>

			{this.state.showAccountListForm && <AccountListForm {...this.props} />}
		</div>
	)

	render() {
		const g = this.props.login
		const c = this.props.i18n

		if (this.state.redirectPath !== undefined) {
			return (
				<Redirect
					push
					to={{ pathname: this.state.redirectPath, state: this.state.passOnState }}
				/>
			)
		}
		return (
			<Background color='#F3F3F3'>
				{this.genUserProfile({ t: c.t, myself: g.state.myself })}

				<ApolloProvider client={g.getGqlClient()}>
					<Query query={getMyself}>{({ loading, error, data }) => <div>1</div>}</Query>
				</ApolloProvider>
			</Background>
		)
	}
}

export default UserDashboardPage

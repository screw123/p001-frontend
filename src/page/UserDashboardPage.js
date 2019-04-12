import React from 'react'
import styled from 'styled-components'
import { getMyself } from '../gql/query.js'

import get from 'lodash/get'
import { ApolloProvider, Query } from 'react-apollo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AutoSizer, List} from 'react-virtualized'

import { Redirect } from 'react-router-dom'

import { Background, ClickableText, Text, Header, Header2, Header3, IconSpan} from '../component/BasicComponents.js'
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
		this.toggleAccountEditForm = this.toggleAccountEditForm.bind(this)
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

	toggleAccountEditForm = (acct_id) => {
		this.setState({
			redirectPath: '/editAccount/'+acct_id+'/edit',
			passOnState: undefined
		})
	}

	render() {
		const g = this.props.login
		const c = this.props.i18n
		const acctOwn = get(g.state, 'myself.accountOwn_id', [])
		const no_of_accts = (acctOwn.length > 5)? 5: acctOwn.length

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
				<Styles.WelcomeSection>
					<Styles.WelcomeLeft>
						<Header size='3rem' height='3.25rem' weight='600'>{c.t('Hello ' + g.state.myself.firstName + ' ' + g.state.myself.lastName + '!')}</Header>
						<Header2>{c.t('Welcome')}</Header2>
						<DashboardLink
							onClick={this.toggleUserProfileForm}
							leftIcon='sign-in-alt'
							caption={c.t('Edit User')}
						/>
					</Styles.WelcomeLeft>

					<Styles.WelcomeRight />
				</Styles.WelcomeSection>

				<CardsRow>
					<Card>
						<Styles.CardImage image='/images/ico-house.svg' />
						<Header3>{c.t('0 items at my location')}</Header3>
						<ClickableText color='#E61D6E' align='center'>
							View List
						</ClickableText>
					</Card>

					<Card>
						<Styles.CardImage image='/images/ico-warehouse.svg' />
						<Header3 align='center' size='1.5rem' weight='600'>
							{c.t('0 items at storage')}
						</Header3>
						<ClickableText color='#E61D6E' align='center'>
							View List
						</ClickableText>
					</Card>

					<Card justify='flex-start' align='stretch'>
						<Header3>{c.t('My Accounts')}</Header3>
						<AutoSizer>
						{({width, height})=>(
							<List
								width={width}
								height={height}
								rowCount={no_of_accts}
								rowHeight={c.state.defaultHeight * lineHeight}
								rowRenderer={a=> <AccountLine RVprops={a} data={acctOwn} c={c} update={()=>this.toggleAccountEditForm(acctOwn[a.index]._id)} /> }
							/>
						)}
						</AutoSizer>
					</Card>
				</CardsRow>
			</Background>
		)
	}
}

export default UserDashboardPage

const lineHeight = 3

const AccountLine = ({RVprops, data, c, update}) => (
    <AccountLineDiv>
        <span>{data[RVprops.index].name}</span>
        <EditSpan float='right' onClick={update}>{c.t('Edit')}</EditSpan>
    </AccountLineDiv>
)

const AccountLineDiv = styled(Text)`
    line-height: ${lineHeight}rem;
    border-bottom: 1px solid #ddd;
`

const EditSpan = styled(IconSpan)`
    font-weight: 600;
    color: #E61D6E;
`

const CardsRow = styled.div`
	display: grid;
	margin: 2rem 0;
	grid-gap: 2rem;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 100%;
	place-items: center center;
	justify-content: space-between;
	@media (max-width: 768px) {
		grid-template-columns: 100%;
		grid-template-rows: 1fr 1fr 1fr;
	}
`

export const Card = styled.div`
	width: 100%;
	min-height: 22rem;
	display: flex;
	flex-direction: column;
	align-items: ${({align='center'}) => align};
	justify-content: ${({justify='center'}) => justify};
	padding: 2rem;
	border-radius: 1rem;
	background-color: #fff;
`

import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ApolloProvider, Query, Mutation } from "react-apollo"
import { LocaleApiSubscriber } from "../stateContainer/LocaleApi.js"

import parseApolloErr from "../util/parseErr.js"
import { LoadingIcon } from "./Loading.js"
import AddCreditCardForm from "../form/AddCreditCardForm.js"
import {
	MultiSelect,
	FormButton,
	FieldDiv,
	FieldLabel,
	ErrorLabel
} from "../component/FormikForm.js"
import Modal from "./Modal.js"
import { getStripeCusObj } from "../gql/query.js"

import { AddressBlock as CardBlock } from "./SelectAddress.js"
import RemoveCreditCardForm from "../form/RemoveCreditCardForm.js"
import {removeStripeSource} from '../gql/query.js'

/*
props:
allowAddCard: boolean
account or refetch + account_id
disabled
hidden
g
c
onChange(required): function, return source_id
cardList(required): array of cards (required if )
defaultSelected(required): id of selected card
*/

const CreditCardDisplay = ({ data, key, selected, onClick, disabled, innerProps, ...props }) => {
	let cardIcon

	switch (data.card.brand) {
		case "Visa":
			cardIcon = ["fab", "cc-visa"]
			break
		case "MasterCard":
			cardIcon = ["fab", "cc-mastercard"]
			break
		case "American Express":
			cardIcon = ["fab", "cc-amex"]
			break
		default:
			cardIcon = "credit-card"
	}

	return (
		<CardBlock key={key} selected={selected} onClick={onClick} disabled={disabled} {...innerProps}>
			<FontAwesomeIcon icon={cardIcon} size="2x" />
			<span>{"XXXX XXXX XXXX " + data.card.last4}</span>
			<br />
			<span>{data.card.exp_month + " / " + data.card.exp_year}</span>
		</CardBlock>
	)
}

class SelectCreditCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showAddNewCard: false,
			showRemoveCard: false,
			err: undefined
		}
		this.toggleAddNewCard = this.toggleAddNewCard.bind(this)
        this.toggleRemoveCard = this.toggleRemoveCard.bind(this)
        this.onInfoUpdate = this.onInfoUpdate.bind(this)
		this.renderMainDiv = this.renderMainDiv.bind(this)
	}

	toggleAddNewCard = (e) => {
		e.preventDefault()
		this.setState(prevState => ({ showAddNewCard: prevState.showAddNewCard ? false : true }))
	}

	toggleRemoveCard = (e) => {
		e.preventDefault()
		this.setState(prevState => ({ showRemoveCard: prevState.showRemoveCard ? false : true }))
    }
    
    onInfoUpdate = () => {
        this.setState({ showRemoveCard: false, showAddNewCard: false, err: undefined})
        this.props.onInfoUpdate()
    } 

	renderMainDiv = (stripeCusObjString, onAddCard, props) => {
        let no_of_card = 0
		let stripeCusObj

		if ((stripeCusObjString!==null)&(stripeCusObjString!=='null')) {  //if user already have a stripeObject
			stripeCusObj = JSON.parse(stripeCusObjString)
			if (stripeCusObj.sources) {
				no_of_card = stripeCusObj.sources.data.length
			}
		} else {
			//a brand new user, or he never input any payment info, then we make up an empty object to avoid error
			stripeCusObj = { sources: { data: [] } }
        }
		let options = stripeCusObj.sources.data.map(v => Object.assign({ value: v.id }, v))
		let selectedCard = options.find(v => v.value === this.props.field.value)

		return (
			<LocaleApiSubscriber>
            {c => (
                <FieldDiv className={this.props.classNames}>
                    <FieldLabel>{this.props.label}</FieldLabel>

                    {/* !showAddNewCard = show card selector.  No card is available */}
                    {!this.state.showAddNewCard && no_of_card === 0 && (
                        <span>{c.t("You have no credit card registered with us")}</span>
                    )}

                    {/*show add card button */}
                    {!this.state.showAddNewCard && props.allowAddCard && (
                        <FormButton
                            onClick={e=>this.toggleAddNewCard(e)}
                            disabled={props.disabled}>
                            <FontAwesomeIcon icon="plus-circle" />
                            {c.t("Add New Card")}
                        </FormButton>
                    )}

                    {/*show remove card button */}
                    {props.allowRemoveCard && props.field.value && (
                        <FormButton
                            onClick={e=>this.toggleRemoveCard(e)}
                            disabled={props.disabled}>
                            <FontAwesomeIcon icon="trash-alt" />
                            {c.t("Remove Selected Card")}
                        </FormButton>
                    )}

                    {/* !showAddNewCard = show card selector. Have 1+ cards */}
                    {!this.state.showAddNewCard && no_of_card > 0 && (
                        <MultiSelect
                            field={props.field}
                            form={props.form}
                            options={options}
                            multiSelect={props.multiSelect}
                            placeholder={props.placeholder}
                            isLoading={props.isLoading}
                            disabled={props.disabled}
                            customOption={CreditCardDisplay}
                            customSingleValueLabel={CreditCardDisplay}
                            isSearchable={false}
                            isClearable={false}
                            backspaceRemovesValue={false}
                        />
                    )}

                    {/* showAddNewCard = show add card form.  When show add card form, hide card selector */}
                    {!!this.state.showAddNewCard && (
                        <AddCreditCardForm
                            account_id={props.account_id || props.account._id}
                            onSuccess={this.onInfoUpdate}
                            onCancel={e => this.toggleAddNewCard(e)}
                            {...props}
                        />
                    )}

                    {/* show a "confirm remove card?" window */}
                    {!!this.props.allowRemoveCard && !!this.state.showRemoveCard && (
                        <Modal
                            show={this.state.showRemoveCard}
                            component={<RemoveCreditCardForm 
                                source={selectedCard}
                                account_id={props.account_id || props.account._id}
                                onRemoveSuccess={this.onInfoUpdate}
                            />}
                            closeModal={this.toggleRemoveCard}
                        />
                    )}

                    {props.err && <ErrorLabel>{c.t(props.err)}</ErrorLabel>}
                    {this.state.err && <ErrorLabel>{c.t(this.state.err)}</ErrorLabel>}
                </FieldDiv>
            )}
			</LocaleApiSubscriber>
		)
	}

	render() {
		if (this.props.hidden) {
			return null
		}
		const g = this.props.login

		if (this.props.account_id) {
			return (
				<ApolloProvider client={g.getGqlClient()}>
					<Query
						query={getStripeCusObj}
						variables={{ account_id: this.props.account_id }}
						notifyOnNetworkStatusChange>
						{({ loading, error, data, refetch, networkStatus }) => {
							if (loading) return <LoadingIcon size={3} />

							if (error) {
								const errStack = parseApolloErr(error)
								return (
									<div>
										{errStack.map(v => {
											return <p>{v.message}</p>
										})}
									</div>
								)
							}

							return this.renderMainDiv(
								data.getAccountById.stripeCustomerObject,
								refetch,
								this.props
							)
						}}
					</Query>
				</ApolloProvider>
			)
		}
		else if (this.props.account) {
			return this.renderMainDiv(this.props.account.stripeCustomerObject, this.props.onAddCard, this.props)
		}
	}
}

export default SelectCreditCard

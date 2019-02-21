import React from "react"
import { getPickUpOrderInfo, addPickUpOrder } from '../gql/query.js'

import { Formik, Field} from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FieldRow } from '../component/FormikForm.js'

import SelectAddress from '../component/SelectAddress.js'
import ContainerSelectionList from '../component/ContainerSelectionList.js'
import SelectCreditCard from '../component/SelectCreditCard.js'

import { ApolloProvider, Query, Mutation } from "react-apollo"
import {BigLoadingScreen} from '../component/Loading.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import parseApolloErr from '../util/parseErr.js'

import DateTimePicker from '../component/DateTimePicker.js'
import get from 'lodash/get'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import moment from 'moment'

/*
Prop list:
account_id
g = this.props.login
c = this.props.i18n
onAddQuotationSuccess = function after quote is created, return quotation object
*/

class AddPickUpOrderForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            base: 0,
            perPiece: 0
        }
        this.recalcPrice = this.recalcPrice.bind(this)
    }

    recalcPrice = ({selected, containers, priceList, setFieldValue}) => {
        let base = 0
        let perPiece = 0
        for (let i=0;i<selected.length;i++) {
            const p = priceList.find(w=>w._id=== containers.find(v=>v._id===selected[i]).priceList_id._id )
            base = Math.max(base, p.ship_in_base)
            perPiece += p.ship_in_perPiece
        }
        setFieldValue('base', base, false)
        setFieldValue('perPiece', perPiece, false)
    }

    render(){ 
        const g = this.props.login
        const c = this.props.i18n

        return (
            <ApolloProvider client={g.getGqlClient()}>
                <Query query={getPickUpOrderInfo} variables={{account_id: this.props.account_id}}>
                {({ loading: queryLoading, error: queryErr, data, refetch, networkStatus }) => {
                    if (queryLoading ) return( <BigLoadingScreen text={'Getting your best price...'}/> )

                    if (queryErr) {
						console.log(queryErr)
                        return (<p>Error :(</p>)
                    }

                    const acct = data.getAccountById
                    const containers = data.getPickUpContainersByAccount.containers
                    const SKU = data.getPickUpContainersByAccount.SKU
                    const priceList = data.getPickUpContainersByAccount.priceList
                    return(
                        <Mutation mutation={addPickUpOrder} errorPolicy="all">
                        {(mutate, {loading: mutateLoading, err: mutateErr})=>(
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    pickUpDate: moment().add(1, 'd').startOf('hour').hour(9),
									shippingAddress: get(acct, 'defaultShippingAddress_id._id',null),
                                    containerList_id: [],
                                    cardId: null,
                                    base: 0,
                                    perPiece: 0
                                }}
                                validate={ (values)=>{
                                    //need to charge minimum
                                    return {}
                                }}
                                onSubmit={async (values, actions) => {
                                    actions.setStatus(undefined)
                                    try {
                                        const vars = {
                                            account_id : this.props.account_id,
                                            pickUpDate: values['pickUpDate'].toDate(),
                                            shippingAddress_id: values['shippingAddress'],
                                            containerList_id: values['containerList_id'],
                                            cardId: values['cardId'],
                                            estTotal: values['base'] + values['perPiece']
                                        }
                                        const d = await mutate({variables: vars})
                                        console.log('server return', d)
                                        if(this.props.onSubmitSuccess) {
                                            this.props.onSubmitSuccess(d.data.addPickUpOrderDraft)
                                            actions.setSubmitting(false)
                                        }
                                    } catch(er) { 
                                        console.log('submit err', er, er.message)
                                        const errStack = parseApolloErr(er, c.t)
                                        console.log('errStack=', errStack)
                                        for (let i=0; i<errStack.length; i++) {
                                            if (errStack[i].key) { 
                                                
                                                
                                                
                                                
                                                actions.setFieldError(errStack[i].key, errStack[i].message) }
                                            else { actions.setStatus(errStack[i].message) }
                                        }
                                        actions.setSubmitting(false)
                                    }
                                }}
                            >
                            {({ errors, isSubmitting, setFieldValue, dirty, touched, values, status }) => (
                                <FormikForm>
                                    <Field
                                        name="pickUpDate"
                                        component={DateTimePicker}
                                        label={c.t('Pick Up Date')}
                                        onChange={v=>setFieldValue('pickUpDate', v)}
                                        disable={d => d.isBefore(moment())}
                                        customFormat={[
                                            {
                                                //coloring Sunday
                                                checker: (c, r, d) => d.day() === 0,
                                                style: "color: Red;",
                                                stop: false
                                            },
                                            {
                                                //coloring past days
                                                checker: (c, r, d) => d.isBefore(moment()),
                                                style: "color: Grey;font-style: italic;",
                                                stop: false
                                            },
                                            {
                                                //test bold every 10 days
                                                checker: (c, r, d) => d.month() % 2 === 1,
                                                style: "background: #EEE;",
                                                stop: false
                                            }
                                        ]}
                                        selectedDate={values.pickUpDate}
                                        showTimeslot={true}
                                        timeslot={[
                                            { label: "Morning: 9am-1pm", value: 9 },
                                            { label: "Afternoon: 1pm-6pm", value: 13 },
                                            { label: "Night: 6pm-10pm", value: 18 }
                                        ]}
                                    />
                                    <Field
                                        name="shippingAddress"
                                        type="text"
                                        component={SelectAddress}
                                        label={c.t('Shipping Address')}
                                        placeholder={c.t('Please choose your shipping address')}
                                        account_id= {acct._id}
                                        addresses={acct.address_id}
                                        onChange={(v)=>setFieldValue('shippingAddress', v._id)}
                                        allowAddAddress={true}
                                        onAddressUpdate={()=>refetch()}
                                        multiSelect={false}
                                        isLoading={networkStatus===4}
                                        err={errors['shippingAddress']}
                                        defaultShippingAddress_id={get(acct, 'defaultShippingAddress_id._id',null)}
                                    />
                                    <ContainerSelectionList
                                        containerList={containers}
                                        SKUInfo={SKU}
                                        updateSelected={a=> {
                                            this.recalcPrice({selected: a, containers: containers, priceList: priceList, setFieldValue: setFieldValue})
                                            setFieldValue('containerList_id', a, false)
                                        }}
                                        selected={values['containerList_id']}
                                    />
                                    <div>
                                        <p>Total base: {values['base']}</p>
                                        <p>Total perPiece: {values['perPiece']}</p>
                                        <p>Total amount: {values['base']+values['perPiece']}</p>
                                    </div>
                                    <Field
                                        name="cardId"
                                        type="text"
                                        component={SelectCreditCard}
                                        label={c.t('Credit card for payment')}
                                        placeholder={c.t('Please choose your credit card')}
                                        account={acct}
                                        onChange={(v)=>setFieldValue('card_id', v.cardId)}
                                        allowAddCard={true}
                                        onAddCard={()=>refetch()}
                                        multiSelect={false}
                                        isLoading={networkStatus===4}
                                        err={errors['cardId']}
                                    />
                                    <FormErr>{status}</FormErr>
                                    <FieldRow>
                                        <FormButton
                                            type="submit"
                                            disabled={isSubmitting || !isEmpty(pickBy(errors)) || (values.totalAmt <= 0) }
                                        >
                                            { c.t('Submit')}
                                        </FormButton>
                                        
                                    </FieldRow>
                                    
                                </FormikForm>
                            )}
                            </Formik>
                        )}
                        </Mutation>
                    )
                }}</Query>
            </ApolloProvider>
    )}    
}

export default AddPickUpOrderForm


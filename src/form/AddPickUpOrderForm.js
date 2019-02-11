import React from "react"
import { getPickUpOrderInfo, addPickUpOrderDraft } from '../gql/query.js'

import { Formik, Field} from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FieldRow } from '../component/FormikForm.js'

import SelectAddress from '../component/SelectAddress.js'
import ContainerList from '../component/ContainerList.js'

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

                    console.log(data)
                    const acct = data.getAccountById
                    const containers = data.getPickUpContainersByAccount.containers
                    const SKU = data.getPickUpContainersByAccount.SKU
                    const priceList = data.getPickUpContainersByAccount.priceList
                    return(
                        <Mutation mutation={addPickUpOrderDraft} errorPolicy="all">
                        {(mutate, {loading: mutateLoading, err: mutateErr})=>(
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    pickUpDate: moment().add(1, 'd').hour(9),
									billingAddress: get(acct, 'defaultBillingAddress_id._id',null),
									shippingAddress: get(acct, 'defaultShippingAddress_id._id',null),
									requestDatetime: moment().add(1, 'd'),
									containerList: ['5c516ab49d02c45c7131c941']
                                }}
                                validate={ (values)=>{
                                    //need to charge minimum
                                    return {}
                                }}
                                onSubmit={async (values, actions) => {
                                    console.log("submitted")
                                    actions.setSubmitting(false)
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
                                        name="billingAddress"
                                        type="text"
                                        component={SelectAddress}
                                        label={c.t('Billing Address')}
                                        placeholder={c.t('Please choose your billing address')}
                                        account_id= {acct._id}
                                        addresses={acct.address_id}
                                        onChange={(v)=>setFieldValue('billingAddress', v._id)}
                                        allowAddAddress={true}
                                        onAddressUpdate={()=>refetch()}
                                        multiSelect={false}
                                        isLoading={networkStatus===4}
                                        err={errors['billingAddress']}
                                        defaultBillingAddress_id={get(acct, 'defaultBillingAddress_id._id',null)}
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
                                    <ContainerList
                                        containerList={containers}
                                        SKUInfo={SKU}
                                        updateSelected={a=> {
                                            this.recalcPrice({selected: a, containers: containers, priceList: priceList, setFieldValue: setFieldValue})
                                            setFieldValue('containerList', a, false)
                                        }}

                                        selected={values['containerList']}
                                    />
                                    <div>
                                        <p>Total base: {values['base']}</p>
                                        <p>Total perPiece: {values['perPiece']}</p>
                                        <p>Total amount: {values['base']+values['perPiece']}</p>
                                        
                                    </div>
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


import React from "react"
import { getPickUpOrderInfo, addPickUpOrderDraft } from '../gql/query.js'

import { Formik, Field, FieldArray } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FieldRow } from '../component/FormikForm.js'

import SelectAddress from '../component/SelectAddress.js'
import ContainerList from '../component/ContainerList.js'

import { ApolloProvider, Query, Mutation } from "react-apollo"
import {BigLoadingScreen} from '../component/Loading.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import parseApolloErr from '../util/parseErr.js'

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
        this.recalcPrice = this.recalcPrice.bind(this)
        this.state = {
            base: 0,
            perPiece: 0
        }
    }

    recalcPrice = ({a, SKU, priceList}) => {
        this.setState({base: 5, perPiece: 5})
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
									billingAddress: get(acct, 'defaultBillingAddress_id._id',null),
									shippingAddress: get(acct, 'defaultShippingAddress_id._id',null),
									requestDatetime: moment().add(1, 'd'),
									containerList: []
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
                                            setFieldValue('containerList', a)
                                            this.recalcPrice({selected: a, SKU: SKU, priceList: priceList})
                                        }}

                                        selected={values['containerList']}
                                    />
                                    <p>Total base: {this.state.base}</p>
                                    <p>Total perPiece: {this.state.perPiece}</p>
                                    <p>Total amount: {this.state.base+this.state.perPiece}</p>
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


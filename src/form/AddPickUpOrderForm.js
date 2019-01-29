import React from "react"
import { getPickUpOrderInfo, addPickUpOrderDraft } from '../gql/query.js'

import { Formik, Field, FieldArray } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FieldRow } from '../component/FormikForm.js'

import { ApolloProvider, Query, Mutation } from "react-apollo"
import {BigLoadingScreen} from '../component/Loading.js'

import parseApolloErr from '../util/parseErr.js'

import merge from 'lodash/merge'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

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
    }
    
    render(){ 
        const g = this.props.login
        const c = this.props.i18n

        return (
            <ApolloProvider client={g.getGqlClient()}>
                <Query query={getPickUpOrderInfo} variables={{account_id: this.props.account_id}}>
                {({ loading: queryLoading, error: queryErr, data, refetch }) => {
                    if (queryLoading ) return( <BigLoadingScreen text={'Getting your best price...'}/> )

                    if (queryErr) {
						console.log(queryErr)
                        return (<p>Error :(</p>)
                    }

					console.log(data)
                    return(
                        <Mutation mutation={addPickUpOrderDraft} errorPolicy="all">
                        {(mutate, {loading: mutateLoading, err: mutateErr})=>(
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
									billingAddress_id: null,
									shippingAddress_id: null,
									requestDatetime: null,
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
                                    <p>Total amount: {values.totalAmt}</p>
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
import React from 'react'
import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FormTag} from '../component/FormikForm.js'
import get from 'lodash/get'
import styled from "styled-components"

import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import { ApolloProvider, Mutation } from 'react-apollo'
import { updateAccount } from '../gql/query.js'

import parseApolloErr from '../util/parseErr.js'

import SelectAddress from "../component/SelectAddress"
import SelectCreditCard from "../component/SelectCreditCard"

class RODetailsForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showEditAddress: false }
	}

	handleEditAddress = () => {
		this.setState({ showEditAddress: !this.state.showEditAddress })
	}

    validate(v) {
        const validateFunc = {
            _id: ({name}) => undefined,
            lastUpdate: () => undefined
        }
        const keyArr = Object.keys(v)
        let err = {}
        for (let i=0; i<keyArr.length; i++) {
            const f = keyArr[i]
            const e = validateFunc[keyArr[i]](v)
            err[f] = e
        }
        return omitBy(err, isUndefined)
    }

	render() {
        const g = this.props.login
        const c = this.props.i18n
        const RO = this.props.RO
        const readonly = this.props.mode==='view'

        let role = 'viewer'
        if (g.state.myself.accountOwn_id.find(v=>v._id===RO.account_id._id)) { role='owner'}
        if (g.state.myself.accountManage_id.find(v=>v._id===RO.account_id._id)) { role='manager'}

        console.log('role=', role)

		return (
            <ApolloProvider client={g.getGqlClient()}>
                <Mutation mutation={updateAccount} errorPolicy="all">
                {(mutate, {loading, err})=>(
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            _id: RO._id,
                            lastUpdate: c.moment(RO.updateDateTime).calendar()
                        }}

                        validate={this.validate}
                        onSubmit={async(values, actions) => {
                            actions.setStatus('')
                            
                            //submit to server
                            console.log('validate ok, now submit')
                            try {
                                const vars = {
                                }

                                console.log('vars=', vars)
                                const d = await mutate({variables: vars})
                                console.log('server return', d)
                                
                            } catch(e) { 
                                console.log('submit err', e)
                                const errStack = parseApolloErr(e, c.t)
                                console.log('errStack=', errStack)
                                for (let i=0; i<errStack.length; i++) {
                                    if (errStack[i].key) { 
                                        console.log('err key =', errStack[i].key)
                                        
                                        actions.setFieldError(errStack[i].key, errStack[i].message)
                                    }
                                    else {
                                        actions.setStatus(errStack[i].message)
                                    }
                                }
                                actions.setSubmitting(false)
                            }
                        }}
                    >
                    {({ values, status, setFieldValue, errors, dirty, isSubmitting }) => (
                        <FormikForm>
                            <Field
                                name="_id"
                                type="text"
                                component={TextField}
                                label={'ID'}
                                err={errors.name}
                                value={values._id}
                                placeholder="ID"
                                disabled={readonly && (role==='owner')}
                                ignoreTouch={true}
                            />
                            <FormButton
                                type="submit"
                                disabled={!dirty || isSubmitting || readonly}
                            >
                                Submit
                            </FormButton>
                            <FormErr>{status && status.form}</FormErr>

                        </FormikForm>
                    )}
                    </Formik>
                )}
                </Mutation>
            </ApolloProvider>
        )
	}
}

export default RODetailsForm
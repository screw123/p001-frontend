import React from "react"

import { Formik, Field } from 'formik'
import FormikForm, { MultiSelect, FormButton, FormErr } from '../component/FormikForm.js'


import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import Background from '../component/Background.js'

import UserProfileForm from '../form/UserProfileForm.js'

import GqlApi from '../stateContainer/GqlApi.js'

class TestPage extends React.Component {
    constructor(props) {
        super(props)
        this.state={showResetPassword: false}
    }

    render() { return(
    	<Background>
        {/* <Formik
            initialValues={{
                test: []
            }}
            validate={ (values) => {} }
            onSubmit={ console.log('submitted') }
        >
        {({ errors, isSubmitting, dirty, touched, values, status, initialValues }) => (
            <div>
                <FormikForm>
                    <Field
                        name="test"
                        type="text"
                        label="Testing~!!"
                        component={MultiSelect}
                        value={values.test}
                        multiSelect={true}
                        options={[
                        	{value: "test1", label: "haha"},
                        	{value: "test2", label: "haha2"},
                        	{value: "test3", label: "haha3"},
                        	{value: "test4", label: "haha4"}
                        ]}
                        
                    />
                    <FormErr>{status}</FormErr>
                    <FormButton
                        type="submit"
                        disabled={isSubmitting || !isEmpty(pickBy(errors)) || !dirty}
                    >
                        {'Submit'}
                    </FormButton>
                </FormikForm>
                
            </div>
        )}
        </Formik> */}
        <UserProfileForm user={ GqlApi.state.myself } />
        </Background>
     )}
}

export default TestPage
import React from "react"
import styled from 'styled-components'
import { Formik, Field } from 'formik'
import isMobilePhone from 'validator/lib/isMobilePhone'
import FormikForm, { TextField, FormButton, FormErr, FormIcon, CheckBox2, MultiSelect, DropDown} from '../component/FormikForm.js'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import {
	Text,
} from '../component/BasicComponents.js'

export const ClickableText = styled.span`
	display: block;
	font-weight: 600;
	cursor: pointer;
	font-size: 1rem;
	line-height: 1.5rem;
	padding: 0 0.2rem 0 0.2rem;
	margin: 0.3rem 0 0.5rem;
	text-align: center;
	color: #E61D6E;
	@media (max-width: 768px) {
		line-height: 1.1rem;
	}
`

class SignUpForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state={
            showPw: false,
            showTC: false,
            newAddress: false
        }
        this.toggleShowPw = this.toggleShowPw.bind(this)
        this.toggleShowTC = this.toggleShowTC.bind(this)
        this.validate = this.validate.bind(this)
        this.addNewAddress = this.addNewAddress.bind(this);
    }
    
    toggleShowPw() {
        if (this.state.showPw===false) { this.setState({showPw: true}) }
        else { this.setState({showPw: false})}
    }
    
    toggleShowTC() {
        if (this.state.showTC===false) { this.setState({showTC: true}) }
        else { this.setState({showTC: false})}
    }
    
    validate(v) {
        const validateFunc = {
            fullName: ({fullName}) => (fullName.length>0)? undefined : 'Please enter your Full Name',
            phoneNUmber: ({phoneNUmber}) => isMobilePhone(phoneNUmber, 'zh-HK')? undefined : 'Please enter Hong Kong mobile phone number',
            fullNaddressame: ({address}) => (address.length>0)? undefined : 'Please enter your Full Name',
            dropOffDate: ({dropOffDate}) => (dropOffDate.length>0)? undefined : 'Please enter your Full Name',
            specialInstructionss: ({specialInstructionss}) => (specialInstructionss.length>0)? undefined : 'Please enter your Full Name',
            region: ({region}) => (region.length>0)? undefined : 'Please enter region',
            district: ({district}) => (district.length>0)? undefined : 'Please enter district',
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
    
    addNewAddress() {
        this.setState({newAddress: true})
    }
    
    
    render() {
        const g = this.props.login
        const c = this.props.i18n
        return(
            // <ApolloProvider client={g.getGqlClientPublic()}>
            //     <Mutation mutation={addUser} errorPolicy="all">
            //     {(mutate, {loading, err})=>(
                <div>
                    <Formik
                        initialValues={{
                            email:'',
                            password:'',
                            fullName: '',
                            address: '',
                            dropOffDate: '',
                            specialInstructionss: '',
                            region: '',
                            district: ''
                        }}
                        validate={this.validate}
                        onSubmit={()=> {console.log('submit')}}
                        
                    >
                    {({ errors, setValues, isSubmitting, values, status }) => {
                    return (
                        <FormikForm>
                            <Text color='#787F84' align='left' width="100%" fontWeight="bold">
                                Full Name
                            </Text>
                            <Field
                                name="fullName"
                                type="text"
                                component={TextField}
                                label={'Full Name'}
                                err={errors.fullName}
                                value={values.fullName}
                                placeholder={'Full Name'}
                            />
                            <Field
                                name="phoneNumber"
                                type="text"
                                component={TextField}
                                label={'Phone Number'}
                                value={values.phoneNumber}
                                err={errors.phoneNumber}
                                placeholder={'Phone Number'}
                            />

                            <Text color='#787F84' align='left' width="100%" fontWeight="bold">
                                Select your Address
                            </Text>
                            <Field
                                name="address"
                                component={DropDown}
                                label={'Select your Address'}
                                value={values.address}
                                err={errors.address}
                                valueList={['dasda','adsada']}
                                placeholder={'Select Address'}
                            />

                            {this.state.newAddress &&
                                <Field
                                    name="region"
                                    component={TextField}
                                    label={'Select Region'}
                                    value={values.region}
                                    err={errors.region}
                                    valueList={['dasda','adsada']}
                                    placeholder={'Select Region'}
                                />
                            }
                            
                            {this.state.newAddress &&
                                <Field
                                    name="district"
                                    component={TextField}
                                    label={'Select District'}
                                    value={values.district}
                                    err={errors.district}
                                    valueList={['dasda','adsada']}
                                    placeholder={'Select District'}
                                />
                            }

                            {!this.state.newAddress &&
                                <ClickableText color="#E61D6E" align="center" display="block" onClick={this.addNewAddress}>
                                    Add New Address
                                </ClickableText>
                            }
                            <Text color='#787F84' align='left' width="100%" fontWeight="bold">
                               Drop-off of boxes
                            </Text>

                            <Field
                                name="dropOffDate"
                                component={DropDown}
                                label={'Drop-off of boxes'}
                                value={values.dropOffDate}
                                err={errors.dropOffDate}
                                valueList={['dasda','adsada']}
                                placeholder={'Choose'}
                            />

                            <Text color='#787F84' align='left' width="100%" fontWeight="bold">
                                Special Instructions
                            </Text>
                            <Field
                                name="specialInstructionss"
                                type="text"
                                component={TextField}
                                label={'Special Instructions'}
                                err={errors.specialInstructionss}
                                value={values.specialInstructionss}
                                placeholder={'Glss door, red house'}
                            />
                            
                            <FormErr>{status && status.form}</FormErr>
                            
                        </FormikForm>
                    )}}
                    </Formik>
                </div>
                // )}
            //     </Mutation>
            // </ApolloProvider>
        )
    }
    
}

export default SignUpForm
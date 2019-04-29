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

const GridContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const GridColumn = styled.div`
    width: 100%;
    margin: ${props => props.margin ? props.margin : '0'};
    @media screen and (min-width: 768px) {
        width: calc(50% - 0.8rem);
    }
`

const Col = styled.div`
    width: calc(100%);
`

class SignUpForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state={
            showPw: false,
            showTC: false,
            newAddress: false,

        }
        this.toggleShowPw = this.toggleShowPw.bind(this)
        this.toggleShowTC = this.toggleShowTC.bind(this)
        this.validate = this.validate.bind(this)
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
        }
        const keyArr = Object.keys(v)
        let err = {}
        for (let i=0; i<keyArr.length; i++) {
            const f = keyArr[i]
           // const e = validateFunc[keyArr[i]](v)
            //err[f] = e
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
                        }}
                        validate={this.validate}
                        onSubmit={()=> {console.log('submit')}}
                        
                    >
                    {({ errors, setValues, isSubmitting, values, status }) => {
                    return (
                        <FormikForm>

                            <label>
                              <input
                                name="isGoing"
                                type="checkbox"
                                checked={this.state.isGoing}
                                onChange={this.handleInputChange} />
                                <img width="25%" src="images/visa.svg" alt=""/>
                            </label>

                            <label>
                              <input
                                name="isGoing"
                                type="checkbox"
                                checked={this.state.isGoing}
                                onChange={this.handleInputChange} />
                                <img width="25%" src="images/paypal.svg" alt=""/>
                            </label>

                            <Field
                                name="CardNumber"
                                type="text"
                                component={TextField}
                                label={'Card Number'}
                                err={errors.CardNumber}
                                value={values.CardNumber}
                                placeholder={'Card Number'}
                            />
                            <GridContainer>
                                <GridColumn>
                                    <Col>
                                        <Field
                                            name="Expiration"
                                            type="text"
                                            component={TextField}
                                            label={'Expiration'}
                                            value={values.Expiration}
                                            err={errors.Expiration}
                                            placeholder={'Expiration'}
                                            className="card-input"
                                        />
                                    </Col>
                                </GridColumn>
                                <GridColumn>
                                    <Col>
                                        <Field
                                            name="CVC"
                                            type="text"
                                            component={TextField}
                                            label={'CVC'}
                                            value={values.CVC}
                                            err={errors.CVC}
                                            placeholder={'CVC'}
                                            className="card-input"
                                        />
                                    </Col>
                                </GridColumn>
                            </GridContainer>

                            
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
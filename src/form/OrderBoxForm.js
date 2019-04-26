import React from "react"
import moment from "moment";
import styled from 'styled-components'
import { Formik, Field } from 'formik'
import isMobilePhone from 'validator/lib/isMobilePhone'
import FormikForm, { TextField, FormButton, FormErr, FormIcon, CheckBox2, MultiSelect, DropDown} from '../component/FormikForm.js'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import DatePicker from '../component/CustomDatePicker';
import PowerModal from '../component/PowerModal'


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
            newAddress: false,
            currentAddress: [
                {
                    name: 'Default Address',
                    value: 0
                },
                {
                    name: 'Simple Address 1',
                    value: 'Address1'
                },
                {
                    name: 'Simple Address 2',
                    value: 'Address2'
                },
                {
                    name: 'Simple Address 3',
                    value: 'Address3'
                }
            ],
            regions: [
                {
                    name: 'Select Region',
                    value: 0
                },
                {
                    name: 'Region 1',
                    value: 'Region1'
                },
                {
                    name: 'Region 2',
                    value: 'Region2'
                },
                {
                    name: 'Region 3',
                    value: 'Region3'
                }
            ],
            districts: [
                {
                    name: 'Select District',
                    value: 0
                },
                {
                    name: 'District 1',
                    value: 'District1'
                },
                {
                    name: 'District 2',
                    value: 'District2'
                },
                {
                    name: 'District 3',
                    value: 'District3'
                }
            ],
            isShowing: false,
            deliveryDate: ''
        }
        this.toggleShowPw = this.toggleShowPw.bind(this)
        this.toggleShowTC = this.toggleShowTC.bind(this)
        this.validate = this.validate.bind(this)
        this.addNewAddress = this.addNewAddress.bind(this);
        this.setDelivery = this.setDelivery.bind(this);
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
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
            address: ({address}) => (address.length>0)? undefined : 'Please enter your Full Name',
            dropOffDate: ({dropOffDate}) => (dropOffDate.length>0)? undefined : 'Please enter your Full Name',
            specialInstructionss: ({specialInstructionss}) => (specialInstructionss.length>0)? undefined : 'Please enter your Full Name',
            region: ({region}) => (region.length>0)? undefined : 'Please enter region',
            district: ({district}) => (district.length>0)? undefined : 'Please enter district',
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
    
    setDelivery(value) {
        this.setState({deliveryDate: value})
    }
    
    render() {
        console.log(this.state)
        const g = this.props.login
        const c = this.props.i18n
        const delivery = moment(this.state.deliveryDate).format("YYYY-MM-DD HH:mm");

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
                            date: '',
                            specialInstructionss: '',
                            region: '',
                            district: '',
                            deliveryDate: ''
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
                                valueList={this.state.currentAddress}
                                placeholder={'Select Address'}
                            />

                            {this.state.newAddress &&
                                <Field
                                    name="region"
                                    component={DropDown}
                                    label={'Select Region'}
                                    value={values.region}
                                    err={errors.region}
                                    valueList={this.state.regions}
                                />
                            }
                            
                            {this.state.newAddress &&
                                <Field
                                    name="district"
                                    component={DropDown}
                                    label={'Select District'}
                                    value={values.district}
                                    err={errors.district}
                                    valueList={this.state.districts}
                                    rightIcon={'images/ico-box.svg'}
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
                                valueList={[{value:'dasda', name:'test'}]}
                                placeholder={'Choose'}
                            />

                            <Text color='#787F84' align='left' width="100%" fontWeight="bold">
                                Pick-up of boxes for storage
                            </Text>

                            <Field
                                name="date"
                                type="text"
                                component={TextField}
                                label={'Choose a Date and Time'}
                                value={values.date}
                                err={errors.date}
                                placeholder={this.state.deliveryDate ? delivery : 'Choose a Date and Time'}

                                onClick={this.openModalHandler}
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
                    { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
                    <PowerModal
                        className="modal-datepicker"
                        show={this.state.isShowing}
                        close={this.closeModalHandler}
                        header={'Modal'}
                        BtnConfirm={'Confirm'}
                        BtnClose={'Add more Items'}
                        Action = {this._next}
                        Btn = {false}
                        SmSize = {true}
                    >
                        <DatePicker
                            setDeliveryDateForm={this.setDelivery}
                            showTimeslot={true}
                            timeslot={[
                                { label: "Morning: 9am-1pm", value: 9 },
                                { label: "Afternoon: 1pm-6pm", value: 13 },
                                { label: "Night: 6pm-10pm", value: 18 }
                            ]}
                        />
                    </PowerModal>

                   

                </div>
                // )}
            //     </Mutation>
            // </ApolloProvider>
        )
    }
    
}

export default SignUpForm
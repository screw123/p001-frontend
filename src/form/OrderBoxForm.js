import React from "react"
import moment from "moment";
import styled from 'styled-components'
import { Formik, Field } from 'formik'
import isMobilePhone from 'validator/lib/isMobilePhone'
import FormikForm, { TextField, FormErr, DropDown} from '../component/FormikForm.js'
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

const Toggle = styled.div`
*,*:before,*:after {
  transition:.25s ease-in-out;
}

.checkbox-label {
  display:block;
  background:#f3f3f3;
  height:30px;
  width:60px;
  border-radius:50px;
  margin:15px 0;
  position:relative;
  box-shadow:0 0 0 2px #dddddd;
  .on {
    display:block;
    position:absolute;
    z-index:0;
    left:0;
    opacity:1;
    min-width:300px;
    line-height:30px;
    opacity:0;
    color:$green;
  }
  .off {
    display:block;
    position:absolute;
    z-index:0;
    right:100px;
    text-align:right;
    opacity:1;
    min-width:300px;
    line-height:30px;
    opacity:1;
    color:#bbbbbb;
  }
  &:before {
    content:'';
    display:block;
    position:absolute;
    top:0;
    left:0;
    border-radius:50px;
    height:30px;
    width:30px;
    background:white;
    box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px #dddddd;
  }
}

.checkbox {
  position:absolute;
  left:-5000px;
  &:checked {
    + .checkbox-label {
      background:rgba(19,191,17,1);
      box-shadow:0 0 0 2px rgba(19,191,17,1);
      .on {
        left:75px;
        opacity:1;
      }
      .off {
        right:0px;
        opacity:0;
      }
      &:before {
        left:30px;
        box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px rgba(19,191,17,1);
      }
    }
  }
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
            showDropCalendar: false,
            showPickCalendar: false,
            deliveryDate: {
                drop: '',
                pick: ''
            },
            customTime: ''
        }
        this.toggleShowPw = this.toggleShowPw.bind(this)
        this.toggleShowTC = this.toggleShowTC.bind(this)
        this.validate = this.validate.bind(this)
        this.addNewAddress = this.addNewAddress.bind(this);
        this.setDelivery = this.setDelivery.bind(this);
    }

    openModalHandler(id) {
        if(id === 'drop') {
            this.setState({
                showDropCalendar: true
            });
        }
        if(id === 'pick') {
            this.setState({
                showPickCalendar: true
            });
        }
    }

    closeModalHandler(id) {
        if(id === 'drop') {
            this.setState({
                showDropCalendar: false
            });
        }
        if(id === 'pick') {
            this.setState({
                showPickCalendar: false
            })
        }
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
    
    setDelivery(value, id) {
        this.setState({
            deliveryDate: Object.assign({}, this.state.deliveryDate, {
                [id]: value
            })
        })
    }
    
    render() {
        console.log(this.state)
        const g = this.props.login
        const c = this.props.i18n
        const deliveryDrop = moment(this.state.deliveryDate.drop).format("YYYY-MM-DD HH:mm");
        const deliveryPick = moment(this.state.deliveryDate.pick).format("YYYY-MM-DD HH:mm");

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
                            pickUpDate: '',
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
                                name="date"
                                type="text"
                                component={TextField}
                                label={'Choose a Date and Time'}
                                value={values.dropOffDate}
                                err={errors.dropOffDate}
                                placeholder={this.state.deliveryDate.drop ? deliveryDrop : 'Choose a Date and Time'}

                                onClick={() => this.openModalHandler('drop')}
                            />

                            <Text color='#787F84' align='left' width="100%" fontWeight="bold">
                                Pick-up of boxes for storage
                            </Text>
                            <Toggle>
                                <input class="checkbox" id="checkbox1" type="checkbox"/>
                                <label for="checkbox1" class="checkbox-label">
                                  <span class="on">Pick-up Right Away</span>
                                </label>
                            </Toggle>


                            <Field
                                name="date"
                                type="text"
                                component={TextField}
                                label={'Choose a Date and Time'}
                                value={values.pickUpfDate}
                                err={errors.pickUpfDate}
                                placeholder={this.state.deliveryDate.pick ? deliveryPick : 'Choose a Date and Time'}

                                onClick={() => this.openModalHandler('pick')}
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
                    {this.state.showDropCalendar &&
                        <PowerModal
                            className="modal modal-datepicker"
                            show={this.state.showDropCalendar}
                            close={() => this.closeModalHandler('drop')}
                            header={'Modal'}
                            BtnConfirm={'Confirm'}
                            BtnClose={'Add more Items'}
                            Action = {this._next}
                            Btn = {false}
                            SmSize = {true}
                        >
                            <DatePicker
                                id='drop'
                                setDeliveryDateForm={this.setDelivery}
                                showTimeslot={true}
                                // setCustomTime={this.state.setCustomTime}
                                timeslot={[
                                    { label: "Morning: 9am-1pm", value: 9 },
                                    { label: "Afternoon: 1pm-6pm", value: 13 },
                                    { label: "Night: 6pm-10pm", value: 18 },
                                    { label: "Custom Time", value: '' }
                                ]}
                            />
                        </PowerModal>
                    }

                    {this.state.showPickCalendar &&
                        <PowerModal
                            className="modal modal-datepicker"
                            show={this.state.showPickCalendar}
                            close={() => this.closeModalHandler('pick')}
                            header={'Modal'}
                            BtnConfirm={'Confirm'}
                            BtnClose={'Add more Items'}
                            Action = {this._next}
                            Btn = {false}
                            SmSize = {true}
                        >
                            <DatePicker
                                id='pick'
                                setDeliveryDateForm={this.setDelivery}
                                showTimeslot={true}
                                timeslot={[
                                    { label: "Morning: 9am-1pm", value: 9 },
                                    { label: "Afternoon: 1pm-6pm", value: 13 },
                                    { label: "Night: 6pm-10pm", value: 18 },
                                    { label: "Custom Time", value: '' }
                                ]}
                            />
                        </PowerModal>
                    }
                    

                </div>
                // )}
            //     </Mutation>
            // </ApolloProvider>
        )
    }
    
}

export default SignUpForm
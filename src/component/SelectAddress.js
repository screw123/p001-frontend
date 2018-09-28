//For choosing a new address.
//It make use of "MultiSelect" component for Formik.

import React from 'react'
import { Formik, Field} from 'formik'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LocaleApi, {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'
import AddNewAddressForm from '../form/AddNewAddressForm.js'
import Modal from '../component/Modal.js'
import FormikForm, { MultiSelect, TextField, FormButton, FormErr, FormIcon, RadioButtonGroup, RadioButton, CheckBox, InputGroup, DropDown } from '../component/FormikForm.js'
import { I18n } from 'react-i18next'

const AddressDisplay = ({address, key1, selected, ...props}) => {
    console.log('addressDisplay', address, key1, ...props)
    return (
        <AddressBlock key={key1} selected={selected} {...props} >
            <AddressLine>{address.legalName||'DEFAULT'}</AddressLine>
            <AddressLine>{address.streetAddress||'N/A'}</AddressLine>
            <AddressLine>{address.addressRegion1||'N/A'}</AddressLine>
            <AddressLine>{address.addressRegion2||'N/A'}</AddressLine>
            <AddressLine>{address.addressCountry||'N/A'}</AddressLine>
        </AddressBlock>
    )
}

const AddressLine = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const AddressBlock = styled.div`
    border: 0.1em solid #999999;
    border-radius: 0.25em;
    width: 150px;
    max-width: 150px;
    display: block;
    margin: 0.25em;
    cursor: pointer;
    ${({selected}) => selected? `background-color: rgba(255, 255, 255, 0.5);` : ``}
`

const AddressGroup = styled.div`
    display: flex;
`

class SelectAddress extends React.Component{
    /* props =
    onChange(required): function, return addressList number;
    addressLine(required): array of addresses
    defaultSelected(required): id of selected address
    */
    constructor(props) {
        super(props)
        this.state = {showAddNewAddressModal: false}
        this.showAddNewAddressModal = this.showAddNewAddressModal.bind(this)
    }

    showAddNewAddressModal() { this.setState({showAddNewAddressModal: true}) }

    render(){ 
        console.log("address list "+this.props.addressLine.streetAddress);
        return (
        <LocaleApiSubscriber>
        {(c)=>(
            <I18n>
            {(t)=>(
                <Formik>
                    <FormikForm>
                        <button onClick={this.showAddNewAddressModal}>Add New Address</button>
                        {this.state.showAddNewAddressModal &&
                        <Modal
                            show={this.state.showAddNewAddressModal}
                            component={<AddNewAddressForm 
                                    account_id={this.props.account_id} 
                                    addressItems={this.props.addressLine}
                                />}
                            title={c.t('Add New Address')}
                            footerButtons={[

                            ]}
                        />
                    }
                        <Field
                            name="billingAddress"
                            type="text"
                            component={MultiSelect}
                            label={t('Select your address')}
                            //value={values.value}
                            MultiSelect = {true}
                            options={
                                [{value:"KOWLOON", label:"KOWLOON"},
                                {value:"HONGKONG ISLAND", label:"HONGKONG ISLAND"},
                                {value:"NEW TERRITORIES", label:"NEW TERRITORIES"},
                                {value:"LANTAU", label:"LANTAU"}]
                        }
                        />
                    </FormikForm>
                </Formik>
            )}
            </I18n>
             
            
            // <AddressGroup>
            //     {this.props.addressLine && this.props.addressLine.map((v)=>{ 
            //         return <AddressDisplay
            //             address={v}
            //             key1={v._id}
            //             id={v._id}
            //             selected={(v._id===this.props.selected)}
            //             onClick={(e)=>this.props.onChange(e.target.parentNode.id)}
            //         />
                    
            //     }) }
            //     <AddressBlock onClick={this.showAddNewAddressModal}>
            //         <FontAwesomeIcon icon="plus-circle" size="3x" />
            //         <div>{c.t('Add New Address')}</div>
            //     </AddressBlock>
            //     {this.state.showAddNewAddressModal &&
            //         <Modal
            //             show={this.state.showAddNewAddressModal}
            //             component={<AddNewAddressForm 
            //                     account_id={this.props.account_id} 
            //                     addressItems={this.props.addressLine}
            //                 />}
            //             title={c.t('Add New Address')}
            //             footerButtons={[

            //             ]}
            //         />
            //     }
            // </AddressGroup>
        )}
        </LocaleApiSubscriber>
    )}
}

export default SelectAddress
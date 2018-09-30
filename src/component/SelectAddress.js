//For choosing a new address.
//It make use of "MultiSelect" component for Formik.
//https://github.com/screw123/p001-frontend/issues/16

import React from 'react'
import styled from 'styled-components'
import { FieldLabel } from './FormikForm.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'
import AddNewAddressForm from '../form/AddNewAddressForm.js'
import Modal from '../component/Modal.js'
import { MultiSelect } from '../component/FormikForm.js'

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

const AddAddressButton = styled.button`

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
        this.toggleAddNewAddressModal = this.toggleAddNewAddressModal.bind(this)
    }

    toggleAddNewAddressModal = () => {
        console.log('toggling')
        this.setState(prevState=>({showAddNewAddressModal: (prevState.showAddNewAddressModal? false: true) }))
    }

    render(){
        const options = this.props.addresses.map((v)=>{
            return Object.assign({value: v._id, label: v.streetAddress}, v)
        })

        return ( 
        <LocaleApiSubscriber>
        {(c)=>{
            if (this.props.hidden) {return null}
            else { return(
                <div className={this.props.classNames}>
                    <FieldLabel>{this.props.label}</FieldLabel>
                    {this.props.allowAddAddress && 
                        <AddAddressButton onClick={this.toggleAddNewAddressModal} disabled={this.props.disabled}>
                            <FontAwesomeIcon icon='plus-circle'/>
                            {c.t('Add New Address')}
                        </AddAddressButton> 
                    }
                    <MultiSelect
                        field={this.props.field}
                        form={this.props.form}
                        options={options}
                        multiSelect={this.props.multiSelect}
                        isLoading={this.props.isLoading}
                        disabled={this.props.disabled}
                        onChange={this.props.onChange}
                    />
                    <Modal
                        show={this.state.showAddNewAddressModal}
                        component={<AddNewAddressForm
                            account_id={this.props.account_id}
                            onSubmitSuccess={(address)=> {
                                console.log('Modal onSubmitSuccess')
                                this.toggleAddNewAddressModal
                                this.props.onAddNewAddress(address)
                            }}
                        />}
                        closeModal={this.toggleAddNewAddressModal}
                        title={c.t('Add New Address')}
                    />
                </div>
            )}
        }}
        </LocaleApiSubscriber>
    )}
}

export default SelectAddress

/*
<AddressGroup>
                {this.props.addressLine && this.props.addressLine.map((v)=>{ 
                    return <AddressDisplay
                        address={v}
                        key1={v._id}
                        id={v._id}
                        selected={(v._id===this.props.selected)}
                        onClick={(e)=>this.props.onChange(e.target.parentNode.id)}
                    />
=======
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

                        ]}
                    />
                }
            </AddressGroup>
            //             ]}
            //         />
            //     }
            // </AddressGroup>
        )}
        </LocaleApiSubscriber>
    )}
}

            */
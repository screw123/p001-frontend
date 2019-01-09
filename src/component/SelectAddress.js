//For choosing a new address.
//It make use of "MultiSelect" component for Formik.
//https://github.com/screw123/p001-frontend/issues/16

import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'
import EditAddressForm from '../form/EditAddressForm.js'
import Modal from '../component/Modal.js'
import { MultiSelect } from '../component/FormikForm.js'
import { FieldDiv, FieldLabel, ErrorLabel, FormButton } from './Formik-Basic.js'
import {Tag} from './BasicComponents.js'

export const AddressDisplay = ({data, key, selected, onClick, disabled, innerProps, ...props}) => {
    return (
        <LocaleApiSubscriber>
        {c=>(
            <AddressBlock key={key} selected={selected} onClick={onClick} disabled={disabled} {...innerProps}>
                <AddressLine>
                    {data.legalName||c.t('DEFAULT')}
                    {data.defaultBillingAddress && <Tag float='right'>{c.t('Default Billing')}</Tag>}
                    {data.defaultShippingAddress && <Tag float='right'>{c.t('Default Shipping')}</Tag>}
                </AddressLine>
                <AddressLine>{data.streetAddress||'N/A'}</AddressLine>
                <AddressLine>{data.addressRegion1||undefined}</AddressLine>
                <AddressLine>{data.addressRegion2||undefined}</AddressLine>
                <AddressLine>{data.addressCountry||'N/A'}</AddressLine>
                <AddressLine>{data.telephone||undefined}</AddressLine>
            </AddressBlock>
        )}
        </LocaleApiSubscriber>
        
    )
}

const AddressLine = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const AddressBlock = styled.div`
    border: 0.1em solid ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `White`};
    border-radius: 0.25em;
    display: block;
    font-size: 0.7em;
    padding: 0.5em;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `Black`};
    ${({selected}) => selected? `background-color: rgba(255, 64, 112, 0.2);` : ``}
`

const AddressMultiValueLabelDiv = styled.div`
    font-size: 0.7em;
`

const AddressMultiValueLabel = ({data, innerProps}) => {
    let a = (data.legalName||'DEFAULT') + ': ' + (data.streetAddress.substring(0,9)) + '...' + (data.addressCountry||'N/A') + (' / Tel: ' + data.telephone)
    return (<AddressMultiValueLabelDiv>{a}</AddressMultiValueLabelDiv>)
}


class SelectAddress extends React.Component{
    /* props =
    onAddressUpdate(required): function, return addressList number;
    addressLine(required): array of addresses
    defaultSelected(required): id of selected address
    hidden: boolean

    */
    constructor(props) {
        super(props)
        this.state = {
            showEditAddressModal: false,
            editMode: 'add'
        }
        this.toggleAddNewAddressModal = this.toggleAddNewAddressModal.bind(this)
        this.toggleEditAddressModal = this.toggleEditAddressModal.bind(this)
    }

    toggleAddNewAddressModal = () => {
        this.setState(prevState=>({
            showEditAddressModal: (prevState.showEditAddressModal? false: true),
            editMode: 'add'
        }))
    }

    toggleEditAddressModal = () => {
        this.setState(prevState=>({
            showEditAddressModal: (prevState.showEditAddressModal? false: true),
            editMode: 'edit'
        }))
    }

    render(){
        const options = this.props.addresses.map((v)=>{
            let a = (v.legalName||'DEFAULT') + ': ' + (v.streetAddress) + ', ' + (v.addressRegion1) + (v.addressRegion2) + (v.addressCountry||'N/A') + (' / Tel: ' + v.telephone)

            let insertVars = {value: v._id, label: a}

            if (this.props.defaultShippingAddress_id===v._id) {
                insertVars['defaultShippingAddress'] = true
            }
            if (this.props.defaultBillingAddress_id===v._id) {
                insertVars['defaultBillingAddress'] = true
            }
            
            return Object.assign(insertVars, v)
        })

        return ( 
        <LocaleApiSubscriber>
        {(c)=>{
            if (this.props.hidden) {return null}
            else { return(
                <FieldDiv className={this.props.classNames}>
                    <FieldLabel>{this.props.label}</FieldLabel>

                    {this.props.allowAddAddress && 
                        <FormButton onClick={e=>{
                            e.preventDefault()
                            this.toggleAddNewAddressModal()
                        }} disabled={this.props.disabled}>
                            <FontAwesomeIcon icon='plus-circle'/>
                            {c.t('Add New Address')}
                        </FormButton> 
                    }

                    {this.props.allowEditAddress && this.props.field.value &&
                        <FormButton onClick={e=>{
                            e.preventDefault()
                            this.toggleEditAddressModal()
                        }} disabled={this.props.disabled}>
                            <FontAwesomeIcon icon='edit'/>
                            {c.t('Edit Address')}
                        </FormButton> 
                    }

                    <MultiSelect
                        field={this.props.field}
                        form={this.props.form}
                        options={options}
                        multiSelect={this.props.multiSelect}
                        placeholder={this.props.placeholder}
                        isLoading={this.props.isLoading}
                        disabled={this.props.disabled}
                        backspaceRemovesValue={false}
                        customOption={AddressDisplay}
                        customMultiValueLabel={AddressMultiValueLabel}
                    />
                    {this.state.showEditAddressModal &&
                        <Modal
                            show={this.state.showEditAddressModal}
                            component={
                                <EditAddressForm
                                    account_id={this.props.account_id}
                                    mode={this.state.editMode}
                                    address={options.find(v=> v._id===this.props.field.value )}
                                    onSubmitSuccess={(address)=> {
                                        this.toggleAddNewAddressModal()
                                        this.props.onAddressUpdate(address)
                                    }}
                                />
                            }
                            closeModal={this.toggleAddNewAddressModal}
                            title={c.t( this.state.editMode==='add' ? 'Add New Address':'Edit Address')}
                        />
                    }
                    {this.props.err && <ErrorLabel>{c.t(this.props.err)}</ErrorLabel>}
                </FieldDiv>
            )}
        }}
        </LocaleApiSubscriber>
    )}
}

export default SelectAddress
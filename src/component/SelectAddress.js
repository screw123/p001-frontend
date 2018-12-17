//For choosing a new address.
//It make use of "MultiSelect" component for Formik.
//https://github.com/screw123/p001-frontend/issues/16

import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'
import AddNewAddressForm from '../form/AddNewAddressForm.js'
import Modal from '../component/Modal.js'
import { MultiSelect } from '../component/FormikForm.js'
import { FieldLabel, ErrorLabel } from './Formik-Basic.js'

const AddressDisplay = ({data, key, selected, onClick, disabled, innerProps, ...props}) => {
    return (
        <AddressBlock key={key} selected={selected} onClick={onClick} disabled={disabled} {...innerProps}>
            <AddressLine>{data.legalName||'DEFAULT'}</AddressLine>
            <AddressLine>{data.streetAddress||'N/A'}</AddressLine>
            <AddressLine>{data.addressRegion1||undefined}</AddressLine>
            <AddressLine>{data.addressRegion2||undefined}</AddressLine>
            <AddressLine>{data.addressCountry||'N/A'}</AddressLine>
            <AddressLine>{data.telephone||undefined}</AddressLine>
        </AddressBlock>
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

export const AddAddressButton = styled.button`

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
    onChange(required): function, return addressList number;
    addressLine(required): array of addresses
    defaultSelected(required): id of selected address
    hidden: boolean

    */
    constructor(props) {
        super(props)
        this.state = {showAddNewAddressModal: false}
        this.toggleAddNewAddressModal = this.toggleAddNewAddressModal.bind(this)
    }

    toggleAddNewAddressModal = () => {
        this.setState(prevState=>({showAddNewAddressModal: (prevState.showAddNewAddressModal? false: true) }))
    }

    render(){
        const options = this.props.addresses.map((v)=>{
            let a = (v.legalName||'DEFAULT') + ': ' + (v.streetAddress) + ', ' + (v.addressRegion1) + (v.addressRegion2) + (v.addressCountry||'N/A') + (' / Tel: ' + v.telephone)
            return Object.assign({value: v._id, label: a}, v)
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
                        placeholder={this.props.placeholder}
                        isLoading={this.props.isLoading}
                        disabled={this.props.disabled}
                        customOption={AddressDisplay}
                        customMultiValueLabel={AddressMultiValueLabel}
                    />
                    {this.props.allowAddAddress &&
                        <Modal
                            show={this.state.showAddNewAddressModal}
                            component={<AddNewAddressForm
                                account_id={this.props.account_id}
                                onSubmitSuccess={(address)=> {
                                    this.toggleAddNewAddressModal()
                                    this.props.onAddNewAddress(address)
                                }}
                            />}
                            closeModal={this.toggleAddNewAddressModal}
                            title={c.t('Add New Address')}
                        />
                    }
                    {this.props.err && <ErrorLabel>{c.t(this.props.err)}</ErrorLabel>}
                </div>
            )}
        }}
        </LocaleApiSubscriber>
    )}
}

export default SelectAddress
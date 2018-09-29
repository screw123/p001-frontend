//For choosing a new address.
//It make use of "MultiSelect" component for Formik.

import React from 'react'
import { Form } from 'formik'
import styled from 'styled-components'
import { FieldLabel } from './FormikForm.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LocaleApi, {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'
import AddNewAddressForm from '../form/AddNewAddressForm.js'
import Modal from '../component/Modal.js'
import { MultiSelect } from './Formik-MultiSelect.js';
import { FormButton } from './Formik-Basic.js';

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
        const options = this.props.addresses.map((v)=>{
            return Object.assign({value: v._id, label: v.streetAddress}, v)
        })

        return ( 
        <LocaleApiSubscriber>
        {(c)=>(
            //implement here: disabled, classNames, label, hidden
            <div>
                <FieldLabel>{this.props.label}</FieldLabel>
                <FormButton onClick={this.showAddNewAddressModal}>Add New Address</FormButton>
                <MultiSelect
                    field={this.props.field}
                    form={this.props.form}
                    options={options}
                    multiSelect={this.props.multiSelect}
                    isLoading={this.props.isLoading}
                />
                <Modal
                    show={this.state.showAddNewAddressModal}
                    component={<AddNewAddressForm account_id={this.props.account_id}/>}
                    title={c.t('Add New Address')}
                />
            </div>
            
        )}
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
                    
                }) }
                <AddressBlock onClick={this.showAddNewAddressModal}>
                    <FontAwesomeIcon icon="plus-circle" size="3x" />
                    <div>{c.t('Add New Address')}</div>
                </AddressBlock>
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
            </AddressGroup>

            */
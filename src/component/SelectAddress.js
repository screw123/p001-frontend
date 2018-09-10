import React from 'react'
import { Form } from 'formik'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    max-width: 150px;
    display: block;
    margin: 0.25em;
    cursor: pointer;
    ${({selected}) => selected? `background-color: rgba(255, 255, 255, 0.5);` : ``}
`

const AddressGroup = styled.div`
    display: flex;
`

const handleSelect = (e, handle) => {
    handle(e)
    console.log('selected, ',handle,e)
}

const SelectAddress = (props) => {
    /* props =
    onChange(required): function, return addressList number;
    addressLine(required): array of addresses
    defaultSelected(required): id of selected address
    */
    console.log(props)
    return (
        <AddressGroup>
            {props.addressLine && props.addressLine.map((v)=>{ 
                return <AddressDisplay
                    address={v}
                    key1={v._id}
                    id={v._id}
                    selected={(v._id===props.selected)}
                    onClick={(e)=>handleSelect(e.target.parentNode.id, props.onChange)}
                />
                
            }) }
        </AddressGroup>
    )
}

export default SelectAddress
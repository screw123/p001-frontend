import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Error = styled.p`
    color: red;
    font-size: 1em;
`

const  SystemError = (props) => {
    return <Error>{props.message}</Error>;
}

SystemError.propTypes = {
    message: PropTypes.string.isRequired
}

export default SystemError;
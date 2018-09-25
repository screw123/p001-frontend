import React from 'react'
import PropTypes from 'prop-types';

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
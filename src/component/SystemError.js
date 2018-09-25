import React from 'react'
import PropTypes from 'prop-types';

const  SE = (props) => {
    return <p> {props.message} </p>;
}

SE.propTypes = {
    message: PropTypes.string.isRequired
}

export default SE;
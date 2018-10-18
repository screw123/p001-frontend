import React from "react"

import { Formik, Field } from 'formik'
import FormikForm, { MultiSelect, FormButton, FormErr } from '../component/FormikForm.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import Background from '../component/Background.js'

import UserProfileForm from '../form/UserProfileForm.js'

import GqlApi from '../stateContainer/GqlApi.js'
import InfoList from "../component/InfoList.js";
import Gallery from "../component/Gallery.js"

const data = [
    {_id: 1, name: "Nemo 1", URL: "http://lorempicsum.com/nemo/500/500/1", URL_thumbnail: "http://lorempicsum.com/nemo/200/200/1"},
    {_id: 2, name: "Nemo 2", URL: "http://lorempicsum.com/nemo/500/500/2", URL_thumbnail: "http://lorempicsum.com/nemo/200/200/2"},
    {_id: 3, name: "Nemo 3", URL: "http://lorempicsum.com/nemo/500/500/3", URL_thumbnail: "http://lorempicsum.com/nemo/200/200/3"},
    {_id: 4, name: "Nemo 4", URL: "http://lorempicsum.com/nemo/500/500/4", URL_thumbnail: "http://lorempicsum.com/nemo/200/200/4"},
    {_id: 5, name: "Nemo 5", URL: "http://lorempicsum.com/nemo/500/500/5", URL_thumbnail: "http://lorempicsum.com/nemo/200/200/5"},
    {_id: 6, name: "Nemo 6", URL: "http://lorempicsum.com/nemo/500/500/6", URL_thumbnail: "http://lorempicsum.com/nemo/200/200/6"},
    {_id: 7, name: "Nemo 7", URL: "http://lorempicsum.com/nemo/500/500/7", URL_thumbnail: "http://lorempicsum.com/nemo/200/200/7"},
    {_id: 8, name: "Nemo 8", URL: "http://lorempicsum.com/nemo/500/500/8", URL_thumbnail: "http://lorempicsum.com/nemo/200/200/8"},
    {_id: 9, name: "Nemo 9", URL: "http://lorempicsum.com/nemo/500/500/9", URL_thumbnail: "http://lorempicsum.com/nemo/200/200/9"},
]

const props = {
    headerText: "Header",
    headerIconLeft: "Header Left",
    headerIconRight: "Header Right",
    data: data,
    imageSize: 200
}


class TestPage extends React.Component {
    constructor(props) {
        super(props)
        this.state={showResetPassword: false}
    }


    render() { return(
    	<Background>
            {/* <UserProfileForm user={ GqlApi.state.myself } /> */}
            <Gallery {...props}/>
        </Background>
     )}
}

export default TestPage
import React from "react"

import EditAccountForm from '../form/EditAccountForm.js'


import Background from '../component/BasicComponents.js'

class EditAccountPage extends React.Component {
    
    render() {
        return (
			<Background>
				<h1>User Activation</h1>
				<EditAccountForm account_id={this.props.match.account_id} />
			</Background>
        )
    }
}

export default EditAccountPage
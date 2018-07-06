const parseApolloErr = (err, t) => {
    let errStack = []
    if (err.graphQLErrors) {
        for (let i=0;i<err.graphQLErrors.length;i++) {
            let errObj = {}
            errObj['type'] = err.graphQLErrors[i].message
            errObj['key'] = Object.keys(err.graphQLErrors[i].data)[0]
            switch(errObj.type) {
                case 'INVALID': 
                    errObj['message'] = t(errObj['key']) + t('cannot be') + err.graphQLErrors[i].data[errObj['key']]
                    break
                case 'USER_ALREADY_ACTIVATED':
                    errObj['message'] = t('Your user login is already activated, redirecting to login page...')
                    break
                case 'SUSPENDED':
                    errObj['message'] = t('Your login/account is not activated.  If you have already activated your account, please contact our support team.')
                    break
                case 'NOT_AUTHORIZED':
                    errObj['message'] = t('Not authorized')
                    break
                default:
                    errObj['message'] = t(errObj['key']) + t('cannot be') + err.graphQLErrors[i].data[errObj['key']]
            }
            errStack.push(errObj)
        }
    }
    if (err.NetworkError) {
        let errObj = {}
        errObj['type'] = 'NETWORK'
        errObj['message'] = 'Network error: ' + err.NetworkError
        errStack.push(errObj)
    }
    return errStack
}


export default parseApolloErr
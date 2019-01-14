import { Link } from "react-router-dom"
import React from "react"

const parseApolloErr = (err, t) => {
    let errStack = []
    if (err.graphQLErrors) {
        for (let i=0;i<err.graphQLErrors.length;i++) {
            let errObj = {}
            console.log('parseApolloErr, err=', err.graphQLErrors[i])
            errObj['type'] = err.graphQLErrors[i].message
            errObj['key'] = (typeof err.graphQLErrors[i].data==='string') ? undefined : Object.keys(err.graphQLErrors[i].data)[0]
            switch(errObj.type) {
                case 'INVALID': 
                    errObj['message'] = t(errObj['key']) +' '+ t('cannot be') + ' '+ err.graphQLErrors[i].data[errObj['key']]
                    break
                case 'NOT_FOUND':
                    errObj['message'] = t('We cannot find') + ' ' + t(errObj['key']) + ' '+ err.graphQLErrors[i].data[errObj['key']] + '.'
                    break
                case 'KEY_EXIST':
                    errObj['message'] = t(errObj['key']) +' '+ err.graphQLErrors[i].data[errObj['key']] + ' ' + t('already exists')
                    if (['email', 'mobilePhone'].includes(errObj['key'])) {
                        errObj['message'] = [(errObj['message'] + ', '), (<Link to='/login' key='login'>{t('Do you want to login instead?')}</Link>)]
                    }
                    else {
                        errObj['message'] = errObj['message'] + ', ' + t('please choose another combination')
                    }
                    break
                case 'WRONG_STATUS':
                    errObj['message'] = t(errObj['key']) +' '+ t('has a wrong status')
                    break
                case 'USER_ALREADY_ACTIVATED':
                    errObj['message'] = t('Your user login is already activated, redirecting to login page...')
                    break
                case 'SPECIAL':
                    errObj['message'] = t(err.graphQLErrors[i].data.errmsg)
                    break
                case 'SUSPENDED':
                    errObj['message'] = t('Your login/account is not activated.  If you have already activated your account, please contact our support team.')
                    break
                case 'EXPIRED':
                    errObj['message'] = t('Your') + ' ' + t(errObj['key']) + ' ' + t('has expired') + '.'
                    break
                case 'NOT_AUTHORIZED':
                    errObj['message'] = t('Not authorized')
                    break
                case 'PASSWORD_TOO_SIMPLE':
                    errObj['message'] = t('Need at least 8 characters, with both uppercase and lowercase')
                    break
                case 'PASSWORD_NOT_MATCH':
                    errObj['message'] = t('Wrong password.  Please check your input and try again')
                    break
                case 'CANNOT_DISABLE_LAST_ONE':
                    errObj['message'] = t('This is the last item, you cannot disable it', {object: t(errObj['key']) })
                    break
                case 'NO_PAYMENT_INFO':
                    errObj['message'] = t('NO_PAYMENT_INFO')
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
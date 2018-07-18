import gql from 'graphql-tag'

export const getMyself = gql`{
    getMyself {
        _id
        firstName
        lastName
        email
        mobilePhone
        accountOwn_id {
            name
            accountType
            priceList
            balance
            manager_id {
                _id
            }
            viewer_id {
                _id
            }
            address_id {
                addressType
                legalName
                addressCountry
                addressRegion
                streetAddress
                telephone
                isActive
                account_id  {
                    _id
                }
            }
            defaultBillingAddress_id {
                addressType
                legalName
                addressCountry
                addressRegion
                streetAddress
                telephone
                isActive
                account_id  {
                    _id
                }
            }
            defaultShippingAddress_id {
                addressType
                legalName
                addressCountry
                addressRegion
                streetAddress
                telephone
                isActive
                account_id  {
                    _id
                }
            }
            isActive
        }
        accountView_id {
            name
            accountType
            priceList
            balance
            manager_id {
                _id
            }
            viewer_id {
                _id
            }
            address_id {
                addressType
                legalName
                addressCountry
                addressRegion
                streetAddress
                telephone
                isActive
                account_id  {
                    _id
                }
            }
            defaultBillingAddress_id {
                addressType
                legalName
                addressCountry
                addressRegion
                streetAddress
                telephone
                isActive
                account_id  {
                    _id
                }
            }
            defaultShippingAddress_id {
                addressType
                legalName
                addressCountry
                addressRegion
                streetAddress
                telephone
                isActive
                account_id  {
                    _id
                }
            }
            isActive
        }
        accountManage_id {
            name
            accountType
            priceList
            balance
            manager_id {
                _id
            }
            viewer_id {
                _id
            }
            address_id {
                addressType
                legalName
                addressCountry
                addressRegion
                streetAddress
                telephone
                isActive
                account_id  {
                    _id
                }
            }
            defaultBillingAddress_id {
                addressType
                legalName
                addressCountry
                addressRegion
                streetAddress
                telephone
                isActive
                account_id  {
                    _id
                }
            }
            defaultShippingAddress_id {
                addressType
                legalName
                addressCountry
                addressRegion
                streetAddress
                telephone
                isActive
                account_id  {
                    _id
                }
            }
            isActive
        }
        
    }
}`

export const getMyAccount = gql`{
    getMyAccount {
        _id
        name
        balance
        isActive
        defaultBillingAddress_id {
            addressType
            legalName
            addressCountry
            addressRegion
            streetAddress
            telephone
        }
        defaultShippingAddress_id {
            addressType
            legalName
            addressCountry
            addressRegion
            streetAddress
            telephone
        }
    }
}`

export const addUser = gql`
    mutation ($firstName: String!, $lastName: String!, $email: String!, $mobilePhone: String!, $password: String! $verifyBySMS: Boolean!, $language: String!) {
        addUser(
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            mobilePhone: $mobilePhone,
            password: $password,
            createThru: "WebClient"
            verifyBySMS: $verifyBySMS,
            language: $language
        ) {
            _id
            verifyDeadline
        }
    }
`

export const verifyUser = gql`
    mutation ($_id: String!, $verificationPIN: String!) {
        verifyUser(
            _id: $_id,
            verificationPIN: $verificationPIN
        ) {
            _id
            isActive
        }
    }
`

export const resendVerification = gql`
    mutation ($_id: String!, $verifyBySMS: Boolean!) {
        verifyUser(
            _id: $_id,
            verifyBySMS: $verifyBySMS
        ) {
            _id
            verifyDeadline
        }
    }
`

export default getMyself
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
            balance
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
    mutation ($firstName: String!, $lastName: String!, $email: String!, $mobilePhone: String!, $password: String! $verifyBySMS: Boolean!, $language: Language!) {
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

export const verifyNewUser = gql`
    mutation ($_id: String!, $verificationPIN: String!) {
        verifyNewUser(
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
        resendVerification(
            _id: $_id,
            verifyBySMS: $verifyBySMS
        ) {
            _id
            verifyDeadline
        }
    }
`

export const resetPassword = gql`
    mutation ($login: String!) {
        resetPassword(
            login: $login,
        ) {
            _id
            verifyBySMS
        }
    }
`

export const getPriceListByAccount = gql`
    query ($account_id: String!){
        getPriceListByAccount(account_id: $account_id) {
            _id
            code
            SKU_id {
                _id
                SKUType
                shortCode
                name
                longDesc
                iconPicURL
                smallPicURL
                largePicURL
                lengthM
                widthM
                heightM
            }
            rentMode
            rent
            duration
            ship_in_base
            ship_in_perPiece
            ship_out_base
            ship_out_perPiece
            ship_first_base
            ship_first_perPiece
            ship_last_base
            ship_last_perPiece
        }
    }`

export const addQuotation = gql`
    mutation ($account_id: String!, $quotationLines: [quotationLines!]!) {
        addQuotation(account_id: $account_id, quotationLines: $quotationLines) {
            _id
            version
            status
            quotationDetails {
                priceList_id {
                    _id
                }
                SKU_id {
                    _id
                }
                qty
                rentMode
                duration
            }
            account_id {
                _id
            }
            originalPrice
            discountedPrice
            updateDateTime
        }
    }`

export default getMyself
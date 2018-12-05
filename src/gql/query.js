import gql from 'graphql-tag'

export const getMyself = gql`{
    getMyself {
        _id
        firstName
        lastName
        email
        mobilePhone
        accountOwn_id {
            _id
            name
            accountType
            balance
            isActive
        }
        accountManage_id {
            _id
            name
            accountType
            balance
            isActive
        }
        accountView_id {
            _id
            name
            accountType
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
        address_id {
            _id
            addressType
            legalName
            addressCountry
            addressRegion1
            addressRegion2
            streetAddress
            telephone
        }
        defaultBillingAddress_id {
            _id
        }
        defaultShippingAddress_id {
            _id
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
    query ($account_id: String){
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

export const getPriceListByCode = gql`
    query ($code: String, $account_id: String){
        getPriceListByCode(code: $code, account_id: $account_id) {
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
    mutation ($account_id: String!, $quotationLines: [quotationLines!]!, $couponCode: String) {
        addQuotation(account_id: $account_id, quotationLines: $quotationLines, couponCode: $couponCode) {
            _id
            version
            status
            quotationDetails {
                priceList_id {
                    _id
                }
                SKU_id {
                    _id
                    name
                    iconPicURL
                    lengthM
                    widthM
                    heightM
                }
                qty
                rentMode
                duration
                rent_unitPrice
                rent_lineTotal
                remarks
            }
            account_id {
                _id
            }
            totalPrice
        }
    }`

export const getAccountById = gql`
    query ($account_id: String!){
        getAccountById(_id: $account_id) {
            _id
            name
            address_id {
                _id
                addressType
                legalName
                streetAddress
                addressRegion1
                addressRegion2
                addressCountry
                telephone
            }
            defaultBillingAddress_id {
                _id
            }
            defaultShippingAddress_id {
                _id
            }
            stripeCustomerObject
        }
    }
`

export const getQuotationById = gql`
    query ($quotation_id: String!){
        getQuotationById(_id: $quotation_id) {
            _id
            status
            quotationDetails {
                priceList_id {
                    _id
                }
                SKU_id {
                    _id
                    name
                    iconPicURL
                    lengthM
                    widthM
                    heightM
                }
                qty
                rentMode
                duration
                rent_unitPrice
                rent_lineTotal
                remarks
            }
            account_id {
                _id
                name
            }
            totalPrice
        }
    }`

export const getQuotationAndAccountById = gql`
    query ($account_id: String, $quotation_id: String){
        getAccountById(_id: $account_id) {
            _id
            name
            address_id {
                _id
                addressType
                legalName
                streetAddress
                addressRegion1
                addressRegion2
                addressCountry
                telephone
            }
            defaultBillingAddress_id {
                _id
                legalName
            }
            defaultShippingAddress_id {
                _id
                legalName
            }
            stripeCustomerObject
        }
        getQuotationById(_id: $quotation_id) {
            _id
            status
            quotationDetails {
                priceList_id {
                    _id
                }
                SKU_id {
                    _id
                    name
                    iconPicURL
                    lengthM
                    widthM
                    heightM
                }
                qty
                rentMode
                duration
                rent_unitPrice
                rent_lineTotal
                remarks
            }
            account_id {
                _id
                name
            }
            totalPrice
        }
    }
`

export const addRentalOrder = gql`
    mutation ($quotation_id: String!, $account_id: String!, $billingAddress_id: String!) {
        addRentalOrderFromQuotation(quotation_id: $quotation_id, account_id: $account_id, billingAddress_id: $billingAddress_id) {
            _id
        }
    }`

export const addAddress = gql`
    mutation (
        $addressType: String!,
        $account_id: String!,
        $legalName: String!,
        $addressCountry: String!,
        $addressRegion1: String!,
        $addressRegion2: String!,
        $streetAddress: String!,
        $telephone: String!
    ) {
        addAddress(
            addressType: $addressType,
            account_id: $account_id,
            legalName: $legalName,
            addressCountry: $addressCountry,
            addressRegion1: $addressRegion1,
            addressRegion2: $addressRegion2,
            streetAddress: $streetAddress,
            telephone: $telephone
        ) {
            _id
            legalName
            addressCountry
            addressRegion1
            addressRegion2
            streetAddress
            telephone
            isActive
            account_id {
                _id
            }
        }
    }`

    // Initial updateAddress, Fix this
    export const updateAddress = gql`
    mutation (
        $_id: String!,
        $legalName: String!,
        $addressCountry: String!,
        $addressRegion1: String!,
        $addressRegion2: String!,
        $streetAddress: String!,
        $telephone: String!,
        $isActive: Boolean
    ) {
        updateAddress(
            _id: $_id,
            legalName: $legalName,
            addressCountry: $addressCountry,
            addressRegion1: $addressRegion1,
            addressRegion2: $addressRegion2,
            streetAddress: $streetAddress,
            telephone: $telephone,
            isActive: $isActive
        ) {
            _id
            legalName
            addressCountry
            addressRegion1
            addressRegion2
            streetAddress
            telephone
            isActive
            account_id {
                _id
            }
        }
    }`

export const updateUserDetails = gql`
    mutation (
        $firstName: String,
        $lastName: String,
        $existingPassword: String,
        $newPassword: String
    ) {
        updateUserDetails(firstName: $firstName, lastName: $lastName, existingPassword: $existingPassword, newPassword: $newPassword) {
            _id
            firstName
            lastName
            email
            mobilePhone
            accountOwn_id {
                _id
                name
                accountType
                balance
                isActive
            }
            accountManage_id {
                _id
                name
                accountType
                balance
                isActive
            }
            accountView_id {
                _id
                name
                accountType
                isActive
            }
        }
    }
`

export const addStripeCustomer = gql`
    mutation (
        $token: String!,
        $account_id: String!
    ) {
        addStripeCustomer(token: $token, account_id: $account_id) {
            _id
            stripeCustomerObject
        }
    }
`

export default {}
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
            accountType
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
            updateDateTime
        }
    }
`

export const getStripeCusObj = gql`
    query ($account_id: String!){
        getAccountById(_id: $account_id) {
            _id
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
            createDateTime
            updateDateTime
        }
    }
`

export const addRentalOrder = gql`
    mutation ($quotation_id: String!, $account_id: String!, $billingAddress_id: String!, $cardId: String!) {
        addRentalOrderFromQuotation(quotation_id: $quotation_id, account_id: $account_id, billingAddress_id: $billingAddress_id, cardId: $cardId) {
            _id
        }
    }`

export const addAddress = gql`
    mutation (
        $account_id: String!,
        $legalName: String!,
        $addressCountry: String!,
        $addressRegion1: String!,
        $addressRegion2: String!,
        $streetAddress: String!,
        $telephone: String!,
        $setDefaultBilling: Boolean,
        $setDefaultShipping: Boolean
    ) {
        addAddress(
            addressType: $addressType,
            account_id: $account_id,
            legalName: $legalName,
            addressCountry: $addressCountry,
            addressRegion1: $addressRegion1,
            addressRegion2: $addressRegion2,
            streetAddress: $streetAddress,
            telephone: $telephone,
            setDefaultBilling: $setDefaultBilling,
            setDefaultShipping: $setDefaultShipping
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
        $account_id: String!,
        $legalName: String,
        $addressCountry: String,
        $addressRegion1: String,
        $addressRegion2: String,
        $streetAddress: String,
        $telephone: String,
        $isActive: Boolean,
        $setDefaultBilling: Boolean,
        $setDefaultShipping: Boolean
    ) {
        updateAddress(
            _id: $_id,
            account_id: $account_id,
            legalName: $legalName,
            addressCountry: $addressCountry,
            addressRegion1: $addressRegion1,
            addressRegion2: $addressRegion2,
            streetAddress: $streetAddress,
            telephone: $telephone,
            isActive: $isActive,
            setDefaultBilling: $setDefaultBilling,
            setDefaultShipping: $setDefaultShipping
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

export const addStripeSource = gql`
    mutation (
        $token: String!,
        $account_id: String!
    ) {
        addStripeSource(token: $token, account_id: $account_id) {
            _id
            stripeCustomerObject
        }
    }
`

export const removeStripeSource = gql`
    mutation (
        $token: String!,
        $account_id: String!
    ) {
        removeStripeSource(token: $token, account_id: $account_id) {
            _id
            stripeCustomerObject
        }
    }
`

export const updateAccount = gql`
    mutation (
        $account_id: String!,
        $name: String
    ) {
        updateAccount(_id: $account_id, name: $name) {
            _id
            name
            accountType
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
            updateDateTime
        }
    }

`

export const getRecentROListByUser = gql`
query getRecentROListByUser {
    getRecentROListByUser {
        _id
        status
        account_id {
            _id
        }
        createDateTime
        updateDateTime
        createBy_id {
            _id
        }
        totalAmt
        billedAmt
        paidAmt
        docLines {
            SKU_id {
                name
                iconPicURL
            }
            qty
        }
    }
}`

export const getROById = gql`
    query getROById (
        $RO_id: String!
    ) {
        getROById (RO_id: $RO_id) {
            _id
            status
            account_id {
                _id
            }
            createDateTime
            updateDateTime
            createBy_id {
                _id
            }
            billingAddress {
                legalName
                streetAddress
                addressRegion1
                addressRegion2
                addressCountry
                telephone
            }
            totalAmt
            billedAmt
            paidAmt
            docLines {
                SKU_id {
                    iconPicURL
                }
                SKUName
                rentMode
                duration
                qty
                rent_unitPrice
                rent_lineTotal
                remarks
            }
            docEvent_id {
                docEventType
                msg
                userName
                createDateTime
            }
        }
    }`

export const getPickUpOrderInfo = gql`
    query ($account_id: String!){
        getAccountById(_id: $account_id) {
            _id
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
        getPickUpContainersByAccount(account_id: $account_id) {
            containers {
                _id
                printId
                userDefinedName
                containerType_id {
                    _id
                }
                priceList_id {
                    _id
                }
            }
            SKU {
                _id
                shortCode
                name
                iconPicURL
            }
            priceList {
                _id
                ship_in_base
                ship_in_perPiece
            }
        }
    }
`

export const addPickUpOrder = gql`
    mutation (
        $account_id: String!,
        $pickUpDate: GraphQLDateTime!,
        $shippingAddress_id: String!,
        $containerList_id: [String!]!,
        $cardId: String!,
        $estTotal: Float
    ){
        addPickUpOrder(account_id: $account_id, pickUpDate: $pickUpDate, shippingAddress_id: $shippingAddress_id, containerList_id: $containerList_id, cardId: $cardId, estTotal: $estTotal) {
            _id
        }
    }
`

export const getDeliveryOrderInfo = gql`
    query ($account_id: String!){
        getAccountById(_id: $account_id) {
            _id
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
        getDeliveryContainersByAccount(account_id: $account_id) {
            containers {
                _id
                printId
                userDefinedName
                containerType_id {
                    _id
                }
                priceList_id {
                    _id
                }
                status
            }
            SKU {
                _id
                shortCode
                name
                iconPicURL
            }
            priceList {
                _id
                ship_out_base
                ship_out_perPiece
                ship_first_base
                ship_first_perPiece
            }
        }
    }
`

export const addDeliveryOrder = gql`
    mutation (
        $account_id: String!,
        $deliveryDate: GraphQLDateTime!,
        $shippingAddress_id: String!,
        $containerList_id: [String!]!,
        $cardId: String!,
        $estTotal: Float
    ){
        addDeliveryOrder(account_id: $account_id, deliveryDate: $deliveryDate, shippingAddress_id: $shippingAddress_id, containerList_id: $containerList_id, cardId: $cardId, estTotal: $estTotal) {
            _id
        }
    }
`

export const getRecentPUODOListByUser = gql`
query getRecentPUODOListByUser {
    getRecentPUOListByUser {
        _id
        status
        account_id {
            _id
        }
        createDateTime
        updateDateTime
        createBy_id {
            _id
        }
        totalAmt
        billedAmt
        paidAmt
        docLines {
            SKU_id {
                name
                iconPicURL
                
            }
            container_id {
                _id
            }
            container_printId
        }
        shippingAddress {
            legalName
            addressCountry
            addressRegion1
            addressRegion2
            streetAddress
            telephone
        }
        requestDatetime
        fulfillDatetime
    }
    getRecentDOListByUser {
        _id
        status
        account_id {
            _id
        }
        createDateTime
        updateDateTime
        createBy_id {
            _id
        }
        totalAmt
        billedAmt
        paidAmt
        docLines {
            SKU_id {
                name
                iconPicURL
                
            }
            container_id {
                _id
            }
            container_printId
        }
        shippingAddress {
            legalName
            addressCountry
            addressRegion1
            addressRegion2
            streetAddress
            telephone
        }
        requestDatetime
        fulfillDatetime
    }
}`

export const getPUOById = gql`
    query getPUOById (
        $PUO_id: String!
    ) {
        getPUOById (PUO_id: $PUO_id) {
            _id
            status
            account_id {
                _id
            }
            createDateTime
            updateDateTime
            createBy_id {
                _id
            }
            billingAddress {
                legalName
                streetAddress
                addressRegion1
                addressRegion2
                addressCountry
                telephone
            }
            shippingAddress {
                legalName
                streetAddress
                addressRegion1
                addressRegion2
                addressCountry
                telephone
            }
            totalAmt
            billedAmt
            paidAmt
            docLines {
                SKU_id {
                    iconPicURL
                }
                SKUName
                container_id {
                    _id
                }
                container_printId
                remarks
            }
            docEvent_id {
                docEventType
                msg
                userName
                createDateTime
            }
        }
    }`

export const getDOById = gql`
    query getDOById (
        $DO_id: String!
    ) {
        getDOById (DO_id: $DO_id) {
            _id
            status
            account_id {
                _id
            }
            createDateTime
            updateDateTime
            createBy_id {
                _id
            }
            billingAddress {
                legalName
                streetAddress
                addressRegion1
                addressRegion2
                addressCountry
                telephone
            }
            shippingAddress {
                legalName
                streetAddress
                addressRegion1
                addressRegion2
                addressCountry
                telephone
            }
            totalAmt
            billedAmt
            paidAmt
            docLines {
                SKU_id {
                    iconPicURL
                }
                SKUName
                container_id {
                    _id
                }
                container_printId
                remarks
            }
            docEvent_id {
                docEventType
                msg
                userName
                createDateTime
            }
        }
    }`


export default {}
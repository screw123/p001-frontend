import gql from 'graphql-tag'

export const getMyselfRelated = gql`{
    getMyself {
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

export default getMyselfRelated
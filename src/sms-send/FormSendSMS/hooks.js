import { useDataQuery, useDataMutation } from '@dhis2/app-runtime'

export const usePhoneNumberAreaCode = () => useDataQuery({
    areacode: {
        resource: "systemSettings.json",
        params:{
            fields: "phoneNumberAreaCode"
        }

    }
})

export const USERS_IN_GROUP_QUERY = {
    ous: {
        resource: 'users.json',
        params: ({ids}) => ({
            paging: false,
            fields: "phoneNumber",
            filter: `userGroups.id:in:[${ids}]`
        })
    }
}

export const OU_PHONENUMBERS_QUERY = {
    ous: {
        resource: 'organisationUnits.json',
        params: ({ids}) => ({
            paging: false,
            fields: "phoneNumber",
            filter: `id:in:[${ids}]`
        })
    }
}

export const USERS_AT_ORGUNIT_PHONENUMBER_QUERY = {
    ous: {
        resource: 'users.json',
        params: ({ids}) => ({
            paging: false,
            fields: "phoneNumber",
            filter: `organisationUnits.id:in:[${ids}]`
        })
    }
}

export const useOrgunitPhoneNumbers = (ids)=>useDataQuery(OU_PHONENUMBERS_QUERY, {
    variables: {ids}
})

export const useUsersAtOrgUnitPhoneNumbers = (ids) => useDataQuery(USERS_AT_ORGUNIT_PHONENUMBER_QUERY,
    {lazy:true, variables: ids})

export const useUsersInGroupPhoneNumbers = (ids) => useDataQuery(USERS_IN_GROUP_QUERY, {
    lazy:true, variables: ids 
})

export const createOutBoundSMSFormVariables = ({
    message, 
    recipients
}) => ({
    message, 
    recipients
})

export const CREATE_OUTBOUND_SMS_MUTATION = {
    resource: 'sms/outbound',
    type: 'create',
    data: createOutBoundSMSFormVariables
}

export const useCreateOutboundSMSMutation = ({onComplete, onError})=> 
    useDataMutation(CREATE_OUTBOUND_SMS_MUTATION, {
    onComplete,
    onError
})
import { useDataQuery } from '@dhis2/app-runtime'

export const OU_GROUPS_QUERY = {
    userGroups: {
        resource: 'organisationUnitGroups',
        params: {
            paging: 'false',
        },
    },
}

export const useReadOrgUnitGroups = () => useDataQuery(OU_GROUPS_QUERY)
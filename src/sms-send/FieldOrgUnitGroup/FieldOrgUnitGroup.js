import { useDataQuery } from '@dhis2/app-runtime'
import {
    ReactFinalForm,
    hasValue,
    SingleSelectField,
    SingleSelectOption
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '../../locales/index.js'
import {useState} from 'react'
import { dataTest } from '../../shared/index.js'

export const OU_GROUPS_QUERY = {
    organisationUnitGroups: {
        resource: 'organisationUnitGroups',
        params: {
            paging: 'false',
        },
    },
}


export const useReadOrgUnitGroupsQuery = () => useDataQuery(OU_GROUPS_QUERY)

// const { Field } = ReactFinalForm

export const FieldOrgUnitGroup = ({
    groupChangeHandler
}) => {
    const [activeGroup, setActiveGroup] = useState("")
    
    const onGroupChange = (newVal) =>{
        console.log("new Group", newVal)
        setActiveGroup(newVal.selected)
        groupChangeHandler(newVal.selected)
        console.log("Active Group", activeGroup)
    }
    const { loading, error, data } = useReadOrgUnitGroupsQuery()
    if (loading) {
        return(<SingleSelectField
            dataTest={dataTest('smssend-ougroups')}
            name="ougroup"
            onChange={onGroupChange}
            selected={""}
        />);
    }

    if (error) {
        return(<SingleSelectField
            dataTest={dataTest('smssend-ougroups')}
            name="oulevel"
            onChange={onGroupChange}
            selected={""}
        />); 
    }
    console.log("GROUPS:", data)
    const { organisationUnitGroups } = data.organisationUnitGroups
    const options = organisationUnitGroups.map(({ id, displayName }) => ({
        label: displayName,
        value: id,
    }));
    // console.log("Our groups", options)
    
    return (
        <SingleSelectField
            dataTest={dataTest('smssend-ougroup')}
            name="ougroup"
            onChange={onGroupChange}
            selected={activeGroup}
            placeholder={i18n.t('Select group')}>
            {
                options.map(
                    (opt)=>{
                        return (
                    <SingleSelectOption key={opt.value} label={i18n.t(opt.label)} value={opt.value}/>
                    )}
                )
            }
        </SingleSelectField>);
}

FieldOrgUnitGroup.propTypes = {
    groupChangeHandler: PropTypes.func.isRequired,
}
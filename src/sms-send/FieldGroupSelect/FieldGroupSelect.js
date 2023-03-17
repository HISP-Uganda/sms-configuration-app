import {
    ReactFinalForm,
    hasValue,
    MultiSelectField,
    MultiSelectFieldFF,
    MultiSelectOption
} from '@dhis2/ui'
import React, {useState} from 'react'
import i18n from '../../locales/index.js'
import { PropTypes } from '@dhis2/prop-types'
import { dataTest, useReadUserGroupsQuery } from '../../shared/index.js'
// import {uniq} from 'lodash'

const { Field } = ReactFinalForm

export const FieldGroupSelect = ({
    setSelectedGroups
}) => {
    const [selected, setSelected] = useState([])

    const onChange = (obj) =>{
        setSelected(obj.selected)
        setSelectedGroups(obj.selected)
        
    }
    const { loading, error, data } = useReadUserGroupsQuery()
    if (loading) {
        return (<MultiSelectField 
            name={"groups"} dataTest={dataTest('smssend-fieldgroups')} 
            placeholder={"select groups"}
            onChange={onChange}
            selected={[]}
        >
        </MultiSelectField>);
    }

    if (error) {
        return (<MultiSelectField 
            name={"groups"} dataTest={dataTest('smssend-fieldgroups')} 
            placeholder={"select groups"}
            onChange={onChange}
            selected={[]}
        >
        </MultiSelectField>);
    }

    const { userGroups } = data.userGroups
    const options = userGroups.map(({ id, displayName }) => ({
        label: displayName,
        value: id,
    }));
    
    return(
        <MultiSelectField 
            name={"groups"} dataTest={dataTest('smssend-fieldgroups')} 
            placeholder={"select groups"}
            onChange={onChange}
            selected={selected}
        >
            {options.map((opt)=>(<MultiSelectOption label={opt.label} value={opt.value} key={opt.value}/>))}
        </MultiSelectField>
    )
}

FieldGroupSelect.propTypes = {
    setSelectedGroups: PropTypes.func.isRequired,
}
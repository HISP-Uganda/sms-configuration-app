import { useDataQuery } from '@dhis2/app-runtime'
import {
    // ReactFinalForm,
    // hasValue,
    SingleSelectField,
    SingleSelectOption
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'
import {useState} from 'react'

export const OU_LEVELS_QUERY = {
    organisationUnitLevels: {
        resource: 'organisationUnitLevels',
        params: {
            paging: false,
            fields: 'id,displayName,level'
        },
    },
}

export const useReadOrgUnitLevelsQuery = () => useDataQuery(OU_LEVELS_QUERY)

// const { Field } = ReactFinalForm

export const FieldOrgUnitLevels = ({
    levelChangeHandler
}) => {
    const [activeLevel, setActiveLevel] = useState("1")
    const onLevelChange = (newVal) =>{
        console.log("new Level", newVal)
        setActiveLevel(newVal.selected)
        levelChangeHandler(newVal.selected)
        console.log("Active Level", activeLevel)
    }
    const { loading, error, data } = useReadOrgUnitLevelsQuery()

    if (loading) {
        
        return(<SingleSelectField
            dataTest={dataTest('smssend-oulevel')}
            name="oulevel"
            onChange={onLevelChange}
            selected={""}
        />)
    }

    if (error) {
        
        return(
            <SingleSelectField
            dataTest={dataTest('smssend-oulevel')}
            name="oulevel"
            onChange={onLevelChange}
            selected={""}
            />
        )
    }

    const { organisationUnitLevels } = data.organisationUnitLevels
    const options = organisationUnitLevels.map(({ id, displayName, level }) => ({
        label: displayName,
        value: level,
        key: id
    }));
    
    return (<SingleSelectField
            dataTest={dataTest('smssend-oulevel')}
            name="oulevel"
            onChange={onLevelChange}
            selected={activeLevel}
            placeholder={i18n.t('Select level')}
            >
        {
            options.map(
                (opt)=>{
                    return (
                <SingleSelectOption key={opt.key} label={i18n.t(opt.label)} value={`${opt.value}`}/>
                )}
            )
        }
    </SingleSelectField>);
}

FieldOrgUnitLevels.propTypes = {
    levelChangeHandler: PropTypes.func.isRequired,
}
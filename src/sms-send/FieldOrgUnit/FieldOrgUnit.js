import {
    ReactFinalForm,
    hasValue,
    SingleSelectFieldFF,
    OrganisationUnitTree,
    Button,
    Table,
    TableBody,
    TableRow,
    TableCell,
    SingleSelect,
} from '@dhis2/ui'
import {difference, uniq, concat} from "lodash"
import { useDataQuery } from '@dhis2/app-runtime'
import { PropTypes } from '@dhis2/prop-types'
import React, {useEffect, useState} from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/utils/index.js'
import { FieldOrgUnitGroup } from '../FieldOrgUnitGroup'
import { FieldOrgUnitLevels } from '../FieldOrgUnitLevel'
const { Field } = ReactFinalForm
import styles from "./FieldOrgUnits.module.css"

export const OU_GROUPS_FILTER_QUERY = {
    paths: {
        resource: 'organisationUnits.json',
        params: ({ougroup}) => ({
            paging: false,
            fields: "path",
            filter: `organisationUnitGroups.id:eq:${ougroup}`
        })
    }
}

export const OU_LEVLE_PATHS_QUERY = {
    paths: {
        resource: 'organisationUnits.json',
        params: ({level}) => ({
            paging: false,
            fields: "path",
            level
        })
    }
}

export const ROOT_OU_QUERY = {
    organisationUnitGroups: {
        resource: 'organisationUnits',
        params: {
            level: 0,
            fields: "id,name"
        },
    },
}

export const useReadRootOrgUnit = () => useDataQuery(ROOT_OU_QUERY)

export const useReadOuPathsByLevel = (level) => useDataQuery(OU_LEVLE_PATHS_QUERY, {
    lazy:true, variables: {level}
})

export const useReadOuPathsByGroup = (ougroup) => useDataQuery(OU_GROUPS_FILTER_QUERY, {
    lazy:true, variables: {ougroup}
})

export const FIELD_ORGUNIT = 'orgUnit'


export const FieldOrgUnit = ({
    setSelectedPaths 
}) => {
    const [selected, setSelected] = useState([])
    const [selectedLevel, setSelectedLevel] = useState("1")
    const [selectedGroup, setSelectedGroup] = useState("")

    const {
        loading: loadingPaths, 
        data, error: errorLoadPaths, 
        refetch: refetchPaths
    } = useReadOuPathsByLevel(selectedLevel)

    const {
        loading: loadingPathsByGroup, 
        data: dataByGroups, error: errorFetchingPathsByGroup, 
        refetch: refetchPathsByGroup
    } = useReadOuPathsByGroup(selectedGroup)

    useEffect(()=>{
        refetchPaths({level: selectedLevel})
    }, [selected, selectedLevel]);

    useEffect(()=>{
        console.log("perhaps group and selected changed")
        refetchPathsByGroup({ougroup: selectedGroup})
    }, [selectedGroup])

    const onChange = (obj) => {
        setSelected(obj.selected)    
        // update selected paths in caller component.
        setSelectedPaths(
            obj.selected.map((p)=>{
                return p.split('/').pop()})
        ) 
    }

    const unSelectAll = () =>{
        console.log(selected)
        setSelected([])
    }
    
    
    const onClickSelectLevel = () =>{
        const paths = data?.paths?.organisationUnits
        // console.log("Select a level", selectedLevel, errorLoadPaths, loadingPaths)
    
        if(paths){
            const pathsToSelect = paths.map((p) => p.path)
            console.log(pathsToSelect)
            setSelected(uniq(concat(selected, pathsToSelect)))
        }
    }

    const unSelectAllAtLevel = () => {
        const paths = data?.paths?.organisationUnits
        if(paths){
            const pathsToUnSelect = paths.map((p) => p.path)
            setSelected(difference(selected, pathsToUnSelect))
        }
    }

    const onClickSelectInGroupButton = () =>{
        const paths = dataByGroups?.paths?.organisationUnits
        console.log(">>>>>>>>", paths, selectedGroup, errorFetchingPathsByGroup)
        if(paths){
            const pathsToSelect = paths.map((p) => p.path)
            console.log(pathsToSelect)
            setSelected(uniq(concat(selected, pathsToSelect)))
        }
    }

    const unSelectAllInGroup = () =>{
        const paths = dataByGroups?.paths?.organisationUnits
        // console.log(">>>>>>>>", paths, selectedGroup, errorFetchingPathsByGroup)
        if(paths){
            const pathsToUnSelect = paths.map((p) => p.path)
            console.log(pathsToUnSelect)
            setSelected(difference(selected, pathsToUnSelect))
        }
    }

    const onLevelChange = (newVal) => {
        setSelectedLevel(newVal)
    }

    const onGroupChange = (newGroup) => {
        setSelectedGroup(newGroup)
        console.log("new group is", newGroup);
    }

    return(<>
        
        <div className={styles.padded}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            {
                                
                                <Button  onClick={onClickSelectLevel}>
                                Select at Level
                                </Button>
                            }
                            
                        </TableCell>
                        <TableCell>
                        
                        <FieldOrgUnitLevels levelChangeHandler={onLevelChange}/>

                        </TableCell>

                        <TableCell>
                            <Button onClick={unSelectAllAtLevel}>
                                Unselect all at Level
                            </Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={unSelectAll}>
                                Unselect all
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Button  onClick={onClickSelectInGroupButton}>
                                Select in group
                            </Button>
                        </TableCell>

                        <TableCell>
                            <FieldOrgUnitGroup groupChangeHandler={onGroupChange}/>
                        </TableCell>

                        <TableCell>
                            <Button onClick={unSelectAllInGroup} >
                                Unselect all in group
                            </Button>
                        </TableCell>
                        <TableCell>
                            <Button  onClick={()=> {console.log("select children")}}>
                                Select Children
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            
        <Field
        dataTest={dataTest('smssend-fieldorgunit')}
        name={FIELD_ORGUNIT}
        roots={["akV6429SUqu"]}
        initiallyExpanded={["/akV6429SUqu"]}
        onChange={onChange} 
        selected={selected}
        singleSelection={false}
        label={i18n.t('Organisation Units')}
        component={OrganisationUnitTree}
        /> 
        </div>
    </>)
};

FieldOrgUnit.propTypes = {
    setSelectedPaths: PropTypes.func.isRequired,
}
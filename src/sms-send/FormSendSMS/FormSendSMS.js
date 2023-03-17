import { PropTypes } from '@dhis2/prop-types'
import { 
    Button, 
    ButtonStrip, 
    ReactFinalForm, 
    CircularLoader, 
    SingleSelectField, 
    SingleSelectOption, 
    AlertBar,
    NoticeBox,
    MultiSelectField,
    MultiSelectOption
} from '@dhis2/ui'
import React, {useState, useEffect, useContext} from 'react'
import i18n from '../../locales/index.js'
import { FormRow, dataTest, validatePhoneNumberList, AlertContext } from '../../shared/index.js'
import { FieldGroupSelect } from '../FieldGroupSelect/FieldGroupSelect.js'
import { FieldMessage } from '../FieldMessage/FieldMessage.js'
import { FieldOrgUnit } from '../FieldOrgUnit/FieldOrgUnit.js'
import { FieldRecipient } from '../FieldRecipient/FieldRecipient.js'
import codes from 'country-calling-code'
import { 
    useCreateOutboundSMSMutation,
    useOrgunitPhoneNumbers,
    usePhoneNumberAreaCode,
    useUsersAtOrgUnitPhoneNumbers,
    useUsersInGroupPhoneNumbers
 } from './hooks.js'

const { Form } = ReactFinalForm

const recipientType = [
    {label:i18n.t('Raw Phone Numbers'), value: "phoneNumbers"},
    {label:i18n.t('User Group'), value: "userGroup"},
    {label:i18n.t('User assigned to organisation unit'), value: "userAtOrgUnit"},
    {label:i18n.t('Organisation unit phone number'), value: "orgUnitPhoneNumber"},
]

export const FormSendSMS = ({ initialValues}) => {
    const [activeRecipientType, setActiveRecipientType] = useState('phoneNumbers')
    const [selectedIds, setSelectedIds] = useState([])
    const [selectedUserGroups, setSelectedUserGroups] = useState([])
    const [defaultCountryCode, setCountryCode] = useState('UG')
    const [defaultPhoneNumberAreaCode, setAreaCode] = useState(256)

    const { addAlert } = useContext(AlertContext)
    const [sendSMS] = useCreateOutboundSMSMutation({
        onComplete: ()=> addAlert({
            type: 'success',
            message: i18n.t('Success'),
            duration: 10,
        }),
        onError: (error)=>
            addAlert({
                type: 'critical',
                message: error.message,
            })
        
    })

    const {
        loading: loadingAreaCode, 
        data: phonesAreaCode, 
        // refetch:refetchPhoneNumberAreaCode,
        error: areaCodeError} = usePhoneNumberAreaCode()

    const {
            data: userGroupsPhoneNumbers,
            refetch: refetchUserGroupsPhoneNumbers
    } = useUsersInGroupPhoneNumbers(selectedUserGroups)

    const {
        data, 
        refetch:refetchOuPhones
    } = useOrgunitPhoneNumbers(selectedIds)

    const {
        // loading: loadingOuUserPhones,
        data: userAtOuPhones,
        refetch: refetchUsersAtOrgUnit
    } = useUsersAtOrgUnitPhoneNumbers(selectedIds)

    useEffect(()=>{
        if (activeRecipientType === 'userAtOrgUnit'){
            refetchUsersAtOrgUnit({ids:selectedIds})
        }
        if (activeRecipientType === 'orgUnitPhoneNumber'){
            refetchOuPhones({ids:selectedIds})
        }
        if (activeRecipientType === 'userGroup'){
            refetchUserGroupsPhoneNumbers({ids:selectedUserGroups})
        }     
    }, [selectedIds, selectedUserGroups])

    const onSubmit = (values) => {
        setAreaCode(phonesAreaCode?.areacode?.phoneNumber)
        const country = codes.filter(
            (c)=>{ return c.countryCodes.indexOf(defaultPhoneNumberAreaCode) !== -1})
        if (country.length > 0){
            setCountryCode(country[0].isoCode2)
        }

        console.log("COUNTRY CODE: ", defaultCountryCode)
        console.log("ACTIVE RECIPIENT TYPE: ", activeRecipientType)
        let recipientList = []
       
        if (activeRecipientType === 'phoneNumbers'){
            const numberList =  validatePhoneNumberList(
                values.recipient.split(' '), 
                defaultCountryCode)
            recipientList = recipientList.concat(numberList)
        }
        if(activeRecipientType === 'orgUnitPhoneNumber') {
            const ous = data?.ous?.organisationUnits
            if (ous.length > 0){
                const phones = ous.filter(
                    (p)=>Object.keys(p).length > 0).map((p)=>p.phoneNumber)
                const numberList =  validatePhoneNumberList(phones, defaultCountryCode)
                recipientList =  recipientList.concat(numberList)
            }
        }
        if (activeRecipientType === 'userAtOrgUnit') {
            const ouUserPhones = userAtOuPhones?.ous?.users
            if (ouUserPhones){
                const phones = ouUserPhones.filter(
                    (p)=>Object.keys(p).length > 0).map((p)=>p.phoneNumber)
                
                const numberList =  validatePhoneNumberList(phones, defaultCountryCode)
                recipientList = recipientList.concat(numberList)

            }
        }
        if (activeRecipientType === 'userGroup'){
            const userGroupPhones = userGroupsPhoneNumbers?.ous?.users
            if (userGroupPhones){
                const phones = userGroupPhones.filter(
                    (p)=>Object.keys(p).length > 0).map((p)=>p.phoneNumber)
                
                const numberList =  validatePhoneNumberList(phones, defaultCountryCode)
                recipientList = recipientList.concat(numberList)
                console.log(`Selected Groups: ${selectedUserGroups} User Group Phone Numbers: ${recipientList} `)

            }
        }
        console.log(`MESSAGE:[${values.message}]  RECIPIENTS: ${recipientList}`)
        sendSMS({message: values.message, recipients: recipientList})
        
    }
    const setSelectedPaths = (paths) =>{
        setSelectedIds(paths)
    }

    const setSelectedGroups = (groups) => {
        setSelectedUserGroups(groups)
    }

    const submitText = initialValues
        ? i18n.t('Send SMS')
        : i18n.t('Send SMS')
    const phoneNumberAreaCode = phonesAreaCode?.areacode?.phoneNumberAreaCode
    
    return (
    <>
        {loadingAreaCode && <CircularLoader/>}

        {areaCodeError && <span>{`ERROR: ${areaCodeError.message}`}</span>}
        {(phoneNumberAreaCode === undefined) && 
            <NoticeBox error title={i18n.t('Missing Configuration')}>
                {i18n.t('"Phone Number Area Code" is not set in your DHIS2 Sytem Settings!')}
            </NoticeBox>
        }

        {(phoneNumberAreaCode !== undefined) &&
            (
                <Form
                    keepDirtyOnReinitialize
                    onSubmit={onSubmit}
                    initialValues={initialValues}>
                {
                    ({ handleSubmit, submitting, pristine }) =>(
                        <form
                            onSubmit={handleSubmit}
                            data-test={dataTest('smssend-formsendsms')}
                        >
                            <FormRow>
                                <SingleSelectField
                                    dataTest={dataTest('smssend-fieldsmsto')}
                                    name="smsto"
                                    label={i18n.t('Send SMS To')}
                                    placeholder={i18n.t('Select Type of Recipient')}
                                    // validate={hasValue}
                                    onChange={({selected})=>{setActiveRecipientType(selected)}}
                                    selected={activeRecipientType}
                                >

                                {recipientType.map((opt)=>{
                                    return (
                                        <SingleSelectOption 
                                        label={i18n.t(opt.label)} value={opt.value} key={opt.value}
                                        />
                                )
                                })}
                                </SingleSelectField>

                            </FormRow>

                            {activeRecipientType === 'phoneNumbers' && (<FormRow>
                                <FieldRecipient/>
                            </FormRow>)}

                            {activeRecipientType === 'userGroup' && (<FormRow>
                                <FieldGroupSelect setSelectedGroups={setSelectedGroups}/>
                            </FormRow>)}
                        
                            {(activeRecipientType === 'userAtOrgUnit' || activeRecipientType === 'orgUnitPhoneNumber') && (
                                <FormRow>
                                Organisation Unit Selection<FieldOrgUnit setSelectedPaths={setSelectedPaths}/>
                                </FormRow>) 
                            }

                            <FormRow>
                                <FieldMessage/>
                            </FormRow>
                            
                            <ButtonStrip>
                            <Button
                                primary
                                type="submit"
                                icon={submitting ? <CircularLoader small /> : null}
                                disabled={submitting}
                                dataTest={dataTest(
                                    'forms-smssendform-submit'
                                )}
                            >
                                {submitText}
                            </Button>

                        </ButtonStrip>
                        </form>
                    )
                }
                </Form>
            )
        }
    </>);
}

FormSendSMS.defaultProps = {
    initialValues: {},
}

FormSendSMS.propTypes = {
    // onCancelClick: PropTypes.func.isRequired,
    // onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
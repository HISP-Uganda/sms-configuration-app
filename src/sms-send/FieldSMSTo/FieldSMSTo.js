import {
    ReactFinalForm,
    hasValue,
    SingleSelectFieldFF
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FieldSMSTo = ({
    recipientType,
    value,
    setRecipientType
}) => (
    <Field
        required
        dataTest={dataTest('smssend-fieldsmsto')}
        name="smsto"
        label={i18n.t('Send SMS To')}
        component={SingleSelectFieldFF}
        options={recipientType}
        placeholder={i18n.t('Select Type of Recipient')}
        validate={hasValue}
        // onChange={(e)=>setRecipientType(e.target.value)}
        selected={['phoneNumbers']}
        onChange={(e)=>{console.log(e)}}
    />
);


FieldSMSTo.propTypes = {
    recipientType: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.string.isRequired,
    // setRecipientType: PropTypes.func.isRequired,
    required: PropTypes.bool,
}
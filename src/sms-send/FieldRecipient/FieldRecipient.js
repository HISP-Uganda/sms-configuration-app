import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'
import { PropTypes } from '@dhis2/prop-types'

const { Field } = ReactFinalForm

export const FieldRecipient = ({
    required
}) => (
    <Field
        required={required}
        dataTest={dataTest('smssend-fieldrecipient')}
        name="recipient"
        label={i18n.t('Recipient')}
        component={InputFieldFF}
        placeholder={i18n.t('Recipients, contact or groups')}
        validate={composeValidators(string, hasValue)}
    />
)

FieldRecipient.propTypes = {
    required: PropTypes.bool.isRequired
}

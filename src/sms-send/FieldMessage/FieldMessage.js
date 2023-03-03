import {
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
    TextAreaFieldFF
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FieldMessage = () => (
    <Field
        required
        dataTest={dataTest('smssend-fieldmessage')}
        name="message"
        label={i18n.t('Message')}
        component={TextAreaFieldFF}
        placeholder={i18n.t('Hello ')}
        validate={composeValidators(string, hasValue)}
    />
)

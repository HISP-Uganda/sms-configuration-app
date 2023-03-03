import {
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
    MultiSelectFieldFF
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FieldGroupSelect = () => (
    <Field
        required
        dataTest={dataTest('smssend-fieldgroups')}
        name="groups"
        label={i18n.t('Groups')}
        component={MultiSelectFieldFF}
        placeholder={i18n.t('Select groups')}
        validate={composeValidators(string, hasValue)}
    />
)
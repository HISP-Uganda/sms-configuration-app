import { Button, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import { AddKeyValuePair } from './AddKeyValuePair'
import { FieldName } from './FieldName'
import { FieldUrlTemplate } from './FieldUrlTemplate'
import { FormRow } from './FormRow'
import { KeyValuePair } from './KeyValuePair'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const GatewayGenericForm = ({ onSubmit, initialValues }) => {
    const submitText = initialValues
        ? i18n.t('Save generic gateway')
        : i18n.t('Add generic gateway')

    return (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit, values, submitting }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('forms-gatewaygenericform')}
                >
                    <FormRow>
                        <FieldName />
                    </FormRow>

                    <FormRow>
                        <FieldUrlTemplate />
                    </FormRow>

                    {values.parameters.map((_, index) => (
                        <KeyValuePair index={index} key={index} />
                    ))}

                    <FormRow>
                        <p style={{ margin: '0 0 8px' }}>
                            {i18n.t(
                                'In generic http gateway any number of parameters can be added.'
                            )}
                        </p>

                        <AddKeyValuePair />
                    </FormRow>

                    <Button
                        type="submit"
                        dataTest={dataTest('forms-gatewaygenericform-submit')}
                    >
                        {submitting ? i18n.t('Submitting...') : submitText}
                    </Button>
                </form>
            )}
        </Form>
    )
}

GatewayGenericForm.defaultProps = {
    initialValues: {
        parameters: [],
    },
}

GatewayGenericForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}

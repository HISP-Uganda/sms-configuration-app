import { PropTypes } from '@dhis2/prop-types'
import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { FormRow, dataTest } from '../../shared/index.js'
import { FieldGroupSelect } from '../FieldGroupSelect/FieldGroupSelect.js'
import { FieldMessage } from '../FieldMessage/FieldMessage.js'
import { FieldRecipient } from '../FieldRecipient/FieldRecipient.js'

const { Form } = ReactFinalForm

export const FormSendSMS = ({ onCancelClick, onSubmit, initialValues}) => {
    const submitText = initialValues
        ? i18n.t('Send SMS')
        : i18n.t('Send SMS')
    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={onSubmit}
            initialValues={initialValues}
        >
            {
                ({ handleSubmit, submitting, pristine }) =>(
                    <form
                        onSubmit={handleSubmit}
                        data-test={dataTest('smssend-formsendsms')}
                    >
                        <FormRow>
                            <FieldRecipient/>
                        </FormRow>

                        <FormRow>
                            <FieldGroupSelect/>
                        </FormRow>

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

                        <Button onClick={() => onCancelClick(pristine)}>
                            {i18n.t('Cancel')}
                        </Button>
                    </ButtonStrip>
                    </form>
                )
            }

        </Form>
    );
}

FormSendSMS.defaultProps = {
    initialValues: {},
}

FormSendSMS.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
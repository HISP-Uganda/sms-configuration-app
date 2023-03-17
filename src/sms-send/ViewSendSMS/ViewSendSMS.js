import React, { useState, useEffect, useContext } from 'react'
import {
    NoticeBox
} from '@dhis2/ui'
import i18n from '../../locales/index.js'
import {
    DeleteConfirmationDialog,
    PageHeadline,
    AlertContext,
    TemplateSidebarNavContent,
    useQueryParams,
    FormRow
} from '../../shared/index.js'

export const SEND_SMS_LABEL = i18n.t('Send SMS')
export const SEND_SMS_PATH = '/sms-send'
import styles from './ViewSendSMS.module.css'
import { FieldRecipient } from '../FieldRecipient/FieldRecipient.js'
import { FormSendSMS } from '../FormSendSMS/FormSendSMS.js'


export const ViewSendSMS = () => {
    
    return (
    <TemplateSidebarNavContent>
        <div className={styles.container}>
            <PageHeadline>{i18n.t('Send SMS')}</PageHeadline>
            <FormSendSMS 
                // onSubmit={onSubmit}
                // setSelectedPaths={setSelectedPaths}
            />
        </div>
    </TemplateSidebarNavContent>
    );
}


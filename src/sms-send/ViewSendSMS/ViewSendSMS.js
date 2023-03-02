import React, { useState, useEffect, useContext } from 'react'
import i18n from '../../locales/index.js'
import {
    DeleteConfirmationDialog,
    PageHeadline,
    AlertContext,
    TemplateSidebarNavContent,
    useQueryParams,
} from '../../shared/index.js'

export const SEND_SMS_LABEL = i18n.t('Send SMS')
export const SEND_SMS_PATH = '/sms-send'

import styles from './ViewSendSMS.module.css'


export const ViewSendSMS = () => {

    // const { addAlert } = useContext(AlertContext)

    return (
    <TemplateSidebarNavContent>
        <div className={styles.container}>
            <p>This is the Send SMS Page</p>
        </div>
    </TemplateSidebarNavContent>
    );
}


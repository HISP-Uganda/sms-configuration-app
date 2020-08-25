import React from 'react'
import { Checkbox } from '@dhis2/ui'
import i18n from '../../locales'
import {
    Table,
    TableHead,
    TableRowHead,
    TableRow,
    TableCell,
    TableCellHead,
    TableBody,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import SmsTableItem from './SmsTableItem'

const SmsTable = ({
    smses,
    cleanSelected,
    toggleSelected,
    toggleAll,
    allSelected,
    selected,
}) => (
    <Table>
        <TableHead>
            <TableRowHead>
                <TableCellHead>
                    <Checkbox
                        disabled={smses.length === 0}
                        onChange={toggleAll}
                        checked={allSelected}
                    />
                </TableCellHead>
                <TableCellHead>{i18n.t('Message')}</TableCellHead>
                <TableCellHead>{i18n.t('Recipients')}</TableCellHead>
                <TableCellHead>{i18n.t('Status')}</TableCellHead>
                <TableCellHead>{i18n.t('Date')}</TableCellHead>
                <TableCellHead>{i18n.t('Delete')}</TableCellHead>
                <TableCellHead />
            </TableRowHead>
        </TableHead>
        <TableBody>
            {smses.length === 0 ? (
                <TableRow>
                    <TableCell>{i18n.t('No SMSes to display')}</TableCell>
                </TableRow>
            ) : (
                smses.map(sms => (
                    <SmsTableItem
                        key={sms.id}
                        sms={sms}
                        isSelected={selected.includes(sms.id)}
                        toggleSelected={toggleSelected}
                        cleanSelected={cleanSelected}
                    />
                ))
            )}
        </TableBody>
    </Table>
)

SmsTable.propTypes = {
    allSelected: PropTypes.bool.isRequired,
    cleanSelected: PropTypes.func.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    smses: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleAll: PropTypes.func.isRequired,
    toggleSelected: PropTypes.func.isRequired,
}

export default SmsTable

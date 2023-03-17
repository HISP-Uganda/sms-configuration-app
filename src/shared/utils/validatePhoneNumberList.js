import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'
import {uniq} from 'lodash'

export const validatePhoneNumberList = (PhoneNumberList, countryCode) => {
    const validList = PhoneNumberList.map((phoneNumber) => {
       if(isValidPhoneNumber(phoneNumber, countryCode)){
          return parsePhoneNumber(phoneNumber, countryCode).number.replace('+', '')
       }
    }).filter((p)=>p !== undefined)
    
    return uniq(validList)
}
import strings from 'res/strings';
import { checkPhoneNumberVietnamese } from 'utils/other-utils';
import * as Yup from 'yup'


export const SCHEMA_ERROR_ADD_INFO_CUSTOMER = Yup.object().shape({
    name: Yup.string().required(strings.warningInputRequired),
    phone: Yup.string().required(strings.warningInputRequired).matches(checkPhoneNumberVietnamese, "Số điện thoại không đúng định dạng."),
    email: Yup.string().required(strings.warningInputRequired).email('Email không đúng định dạng.'),
    note: Yup.string().required(strings.warningInputRequired).min(10,'Vui lòng nhập tối thiểu 10 ký tự.'),
})
import strings from 'res/strings';
import {checkPhoneNumberVietnamese} from 'utils/other-utils';
import * as Yup from 'yup';

export const SCHEMA_ERROR_ADD_CUSTOMER = Yup.object().shape({
  name: Yup.string().required(strings.warningInputRequired),
  phone: Yup.string()
    .required(strings.warningInputRequired)
    .matches(checkPhoneNumberVietnamese, 'Số điện thoại không đúng định dạng'),
  cityId: Yup.string().required(strings.warningInputRequired),
  districtId: Yup.string().required(strings.warningInputRequired),
  street: Yup.string().required(strings.warningInputRequired),
  wardId: Yup.string().required(strings.warningInputRequired),
  email: Yup.string().email('Email không đúng định dạng'),
});

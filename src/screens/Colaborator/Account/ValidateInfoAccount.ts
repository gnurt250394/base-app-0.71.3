import strings from 'res/strings';
import {checkPhoneNumberVietnamese} from 'utils/other-utils';
import * as Yup from 'yup';

export const SCHEMA_ERROR_INFO_ACCOUNT = Yup.object().shape({
  username: Yup.string().required(strings.warningInputRequired),
  fullName: Yup.string()
    .required(strings.warningInputRequired)
    .min(4, 'Vui lòng điền ít nhất 4 ký tự với chữ hoặc số'),
  email: Yup.string()
    .required(strings.warningInputRequired)
    .email('Email không đúng định dạng'),
  phone: Yup.string()
    .required(strings.warningInputRequired)
    .matches(checkPhoneNumberVietnamese, 'Số điện thoại không đúng định dạng'),
  cityId: Yup.string(),
  districtId: Yup.string().when('cityId', (cityId, schema) => {
    return cityId ? schema.required(strings.warningInputRequired) : schema;
  }),
  wardId: Yup.string().when(
    ['cityId', 'districtId'],
    (cityId: string, districtId: string, schema: any) => {
      return districtId || cityId
        ? schema.required(strings.warningInputRequired)
        : schema;
    },
  ),
  street: Yup.string().required(strings.warningInputRequired),
  bankName: Yup.string().required(strings.warningInputRequired),
  bankAccountName: Yup.string().required(strings.warningInputRequired),
  bankNumber: Yup.string().required(strings.warningInputRequired),
  referrerPhone: Yup.string().matches(
    checkPhoneNumberVietnamese,
    'Số điện thoại không đúng định dạng',
  ),
});

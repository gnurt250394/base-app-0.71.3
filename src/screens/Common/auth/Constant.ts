import strings from 'res/strings';
import {checkPhoneNumberVietnamese} from 'utils/other-utils';
import * as Yup from 'yup';

export const LOGIN_FORM_SCHEMA = Yup.object().shape({
  identify: Yup.string().required(strings.warningInputRequired),
  password: Yup.string().required(strings.warningInputRequired),
});
export const VERIFY_CODE_FORM_SCHEMA = Yup.object().shape({
  code: Yup.string().required(strings.warningInputRequired),
});
export const CHANGE_PASS_FORM_SCHEMA = Yup.object().shape({
  newPass: Yup.string().required(strings.warningInputRequired),
  confirmPass: Yup.string()
    .required(strings.warningInputRequired)
    .test('confirmPass', 'Mật khẩu mới không khớp', (value, ref) => {
      const newPass = ref.parent.newPass;
      if (newPass != value) {
        return false;
      }
      return true;
    }),
});
export const CHANGE_PASS_OLD_FORM_SCHEMA = Yup.object().shape({
  oldPass: Yup.string().required(strings.warningInputRequired),
  newPass: Yup.string().required(strings.warningInputRequired),
  confirmPass: Yup.string()
    .required(strings.warningInputRequired)
    .test('confirmPass', 'Mật khẩu mới không khớp', (value, ref) => {
      const newPass = ref.parent.newPass;
      if (newPass != value) {
        return false;
      }
      return true;
    }),
});
export const FORGOT_PASSWORD_FORM_SCHEMA = Yup.object().shape({
  type: Yup.string(),
  username: Yup.string()
    .required(strings.warningInputRequired)
    .when('type', (type, schema) => {
      switch (type) {
        case 'username':
          return schema;
        case 'email':
          return schema.email('Địa chỉ email không đúng định dạng');
        case 'phone':
          return schema.matches(
            checkPhoneNumberVietnamese,
            strings.isValidPhone,
          );
        default:
          return schema;
      }
    }),
});
export const REGISTER_FORM_SCHEMA = Yup.object().shape({
  phone: Yup.string()
    .required(strings.warningInputRequired)
    .matches(checkPhoneNumberVietnamese, strings.isValidPhone),
  password: Yup.string()
    .required(strings.warningInputRequired)
    .min(6, 'Mật khẩu ít nhất 6 ký tự'),
  username: Yup.string().required(strings.warningInputRequired),
  fullName: Yup.string().required(strings.warningInputRequired),
  email: Yup.string()
    .required(strings.warningInputRequired)
    .email('Địa chỉ email không đúng định dạng'),
  cityId: Yup.string(),
  districtId: Yup.string().when('cityId', (cityId, schema) => {
    return cityId ? schema.required(strings.warningInputRequired) : schema;
  }),
  wardId: Yup.string().when(
    ['cityId', 'districtId'],
    (cityId, districtId, schema) => {
      console.log('districtId: ', districtId);
      console.log('cityId: ', cityId);
      return districtId || cityId
        ? schema.required(strings.warningInputRequired)
        : schema;
    },
  ),
  street: Yup.string().when(
    ['wardId', 'cityId', 'districtId'],
    (wardId, cityId, districtId, schema) => {
      console.log('districtId: ', districtId);
      console.log('cityId: ', cityId);
      return districtId || cityId || wardId
        ? schema.required(strings.warningInputRequired)
        : schema;
    },
  ),
});

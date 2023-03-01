import strings from 'res/strings';
import {checkPhoneNumberVietnamese} from 'utils/other-utils';
import * as Yup from 'yup';

export const SCHEMA_ERROR_ADDRESS = Yup.object().shape({
  cityId: Yup.string().required(strings.warningInputRequired),
  districtId: Yup.string().when('cityId', (cityId, schema) => {
    return cityId ? schema.required(strings.warningInputRequired) : schema;
  }),
  wardId: Yup.string().when(
    ['cityId', 'districtId'],
    (cityId, districtId, schema) => {
      return districtId || cityId
        ? schema.required(strings.warningInputRequired)
        : schema;
    },
  ),
  street: Yup.string().required(strings.warningInputRequired),
});

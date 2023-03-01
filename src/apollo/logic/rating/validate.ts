import * as Yup from 'yup';
import strings from 'res/strings';

export const RATING_FORM_SCHEMA = Yup.object().shape({
  message: Yup.string().required(strings.warningInputRequired),
  rating: Yup.string().required(strings.warningInputRequired),
});

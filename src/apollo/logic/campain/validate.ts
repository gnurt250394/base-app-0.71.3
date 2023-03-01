import * as Yup from 'yup';
export const FormCreateOrUpdateCampain = Yup.object().shape({
    link: Yup.string().url('Link không hợp lệ')
})
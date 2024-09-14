import * as Yup from 'yup';
import i18next from '../i18next';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, i18next.t('forms.signUpForm.errors.usernameLengthLimit'))
    .max(20, i18next.t('forms.signUpForm.errors.usernameLengthLimit'))
    .required(i18next.t('forms.signUpForm.errors.requiredFiled')),
  password: Yup.string()
    .min(6, i18next.t('forms.signUpForm.errors.passwordLengthLimit'))
    .required(i18next.t('forms.signUpForm.errors.requiredFiled')),
  confirmPassword: Yup.string()
    .oneOf([
      Yup.ref('password'),
    ], i18next.t('forms.signUpForm.errors.passwordDoesNotMatch')),
});

export default validationSchema;

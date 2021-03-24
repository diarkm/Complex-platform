import * as Yup from "yup";
import {toast} from "react-toastify";

export const onValidationError = errors => {
  toast.error(errors, {
    position: toast.POSITION.TOP_RIGHT
  })
}

export const onValidationSuccess = message => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT
  })
}

export const normalizePhoneInput = (value, previousValue) => {
  const currentValue = value.replace(/[^\d+]/g, '');
  const cvLength = currentValue.length;
  if (!previousValue || value.length > previousValue.length || !value) {
    if(cvLength === 1) return `+${currentValue}`;
    if (cvLength < 6) return currentValue;
    if (cvLength < 9) return `${currentValue.slice(0, 2)} ${currentValue.slice(2, 5)} ${currentValue.slice(5)}`;
    return `${currentValue.slice(0, 2)} ${currentValue.slice(2, 5)} ${currentValue.slice(5, 8)} ${currentValue.slice(8, 12)}`;
  }
  return value;
};

export const registerFormSchema = Yup.object().shape({
  firstName: Yup.string().required("Введите ваше имя").min(2),
  lastName: Yup.string().required("Введите вашу фамилию").min(2),
  password: Yup.string().required("Введите пароль")
    .min(8, "Пароль должен состоять минимум из 8 символов и одной буквы")
    .matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, "Пароль должен состоять минимум из 8 символов и одной буквы"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
    .required("Введите пароль"),
  email: Yup.string().email('Неправильная почта').required("Введите почту"),
  showPhoneNumber: Yup.string().required("Введите номер телефона")
    .matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,'Не правильный номер'),
  login: Yup.string().required("Введите логин").min(4,'Короткий логин'),
  accept: Yup.bool().oneOf([true], 'Пожалуйста примите пользовательское соглашение')
});

export const forgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().email('Неправильная почта').required("Введите почту"),
});


import * as Yup from "yup";
import {toast} from "react-toastify";

const errors = {
  "The login has already been taken.": "Логин уже занят",
  "Email is not valid string": "Электронная почта не является допустимой",
  "Password is not valid": "Пароль недействителен",
  "This mail is already taken": 'Это почта уже занята',
  "Server cannot upload user's avatar": 'Сервер не может загрузить вашу аватарию',
  "User is not found": "Пользователь не найден",
  "Entered password is not right": "Пароль неправильный",
  "Incorrect code" : "Неправильный код",
  "Please enter the code of your mail" : "Пожалуйста, введите код вашей почты",
  "Email is required field": "Электронная почта обязательное поле",
  "User with this email is not found": "Пользователь с этим адресом электронной почты не найден",
};
export function handleErrorFromBD(error) {
  const err = errors[error];
  return err ?? 'Произошла ошибка';
}

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

const SUPPORTED_FORMATS_IMAGES = ["gif", "jpg", "png"];
export const registerFormSchema = Yup.object().shape({
  firstName: Yup.string().required("Введите ваше имя").min(2, 'Имя должна состоять минимум из 2 букв')
    .matches(/^[a-zA-Zа-яёА-ЯЁ]+$/u,'Имя неправильная'),
  lastName: Yup.string().required("Введите вашу фамилию").min(2,'Фамилия должна состоять минимум из 2 букв')
    .matches(/^[a-zA-Zа-яёА-ЯЁ]+$/u,'Фамилия неправильная'),
  password: Yup.string().required("Введите пароль")
    .min(8, "Пароль должен состоять минимум из 8 символов и одной буквы")
    .matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i, "Пароль должен состоять минимум из 8 символов и одной буквы"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
    .required("Введите пароль"),
  email: Yup.string().email('Неправильная почта').required("Введите почту"),
  showPhoneNumber: Yup.string().required("Введите номер телефона")
    .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/,'Не правильный номер'),
  login: Yup.string().required("Введите логин").min(4,'Короткий логин'),
  accept: Yup.bool().oneOf([true], 'Пожалуйста примите пользовательское соглашение'),
  avatar: Yup.mixed().nullable().notRequired().test(
    "FILE_FORMAT",
    "Разрешается JPG, GIF или PNG",
    (value) =>{
      console.log(value)
      return !value ||
      (value &&
        SUPPORTED_FORMATS_IMAGES.includes(value.type.split("/").pop()))
    }
    )
});

export const forgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().email('Неправильная почта').required("Введите почту"),
});


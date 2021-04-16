import * as Yup from "yup";
import {toast} from "react-toastify";

const SUPPORTED_FORMATS_IMAGES = ["gif", "jpg", "png","jpeg"];
const FILE_SIZE = 1;
const errors = {
  "The login has already been taken.": "The login has already been taken.",
  "Email is not valid string": "Email is not valid",
  "Password is not valid": "Password is not valid",
  "Password is not correct": "Password is not correct",
  "This mail is already taken": 'This mail is already taken',
  "Server cannot upload user's avatar": 'Server cannot upload user\'s avatar',
  "User is not found": "User is not found",
  "Entered password is not right": "Entered password is not right",
  "Incorrect code" : "Incorrect code",
  "Please enter the code of your mail" : "Please enter the code of your mail",
  "Email is required field": "Email is required field",
  "User with this email is not found": "User with this email is not found",
};
export function handleErrorFromBD(error) {
  const err = errors[error];
  return err ?? 'An error has occurred';

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
    if(cvLength === 1 && currentValue !=='+') return `+${currentValue}`;
    if (cvLength < 6) return currentValue;
    if (cvLength < 9) return `${currentValue.slice(0, 2)} ${currentValue.slice(2, 5)} ${currentValue.slice(5)}`;
    return `${currentValue.slice(0, 2)} ${currentValue.slice(2, 5)} ${currentValue.slice(5, 8)} ${currentValue.slice(8, 12)}`;
  }
  return value;

};
export const registerFormSchema = Yup.object().shape({
  firstName: Yup.string().required("Enter your name").min(2, 'The name must be at least 2 letters long')
    .matches(/^[a-zA-Zа-яёА-ЯЁ]+$/u,'Name is not correct'),
  lastName: Yup.string().required("Please enter your last name").min(2,'Last name must be at least 2 letters')
    .matches(/^[a-zA-Zа-яёА-ЯЁ]+$/u,'Last name is not correct'),
  password: Yup.string().required("Enter password")
    .min(8, "Password must be at least 8 characters and one letter")
    .matches(/(?=.*[A-Za-z-яёА-ЯЁ])(?=.*\d)[A-Za-z-яёА-ЯЁ\d]{8,}$/i, "Password must be at least 8 characters and one letter"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password mismatch")
    .required("Enter password"),
  email: Yup.string().email('Incorrect mail').required("Enter mail"),
  showPhoneNumber: Yup.string().required("Enter your phone number")
    .matches(/^\+{1,}(?:[0-9] ?){6,14}[0-9]$/,'Wrong number'),
  login: Yup.string().required("Enter login").min(4,'Short login'),
  accept: Yup.bool().oneOf([true], 'Please accept the user agreement'),
  avatar: Yup.mixed().nullable().notRequired().test(
    "FILE_FORMAT",
    "JPG, GIF or PNG allowed",
    (value) =>{
      return !value ||
      (value &&
        SUPPORTED_FORMATS_IMAGES.includes(value.type.split("/").pop()))
    }
    ).test("FILE_SIZE", "Maximum size: 1MB", (value) => {
    return (
      !value || (value && ((value.size/1024)/1024).toFixed(4) <= FILE_SIZE) //mb
    );
  })
});

export const forgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().email('Incorrect mail').required("Enter mail"),
});


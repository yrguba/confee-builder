import * as yup from 'yup';

function useYup(errorText?: string) {
    const required = yup.string().required('Поле обязательно для заполнения');
    const checkNickname = yup
        .string()
        .required('Поле обязательно для заполнения')
        .matches(/^[a-zA-Z_0-9]+$/, 'неверный формат')
        .min(5, 'Слишком короткий nickname')
        .max(20, 'Слишком длинный nickname');

    const checkName = yup.string().matches(/^[a-zA-Zа-яА-Я]*$/, 'В этом поле не может быть цифр');
    const checkEmail = yup.string().email('неверный формат');
    const checkBirthDate = yup.string().matches(/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/, 'неверный формат');

    const checkPhone = yup
        .string()
        .min(1, 'Поле обязательно для заполнения')
        .matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, 'Неверный формат номера');

    return {
        checkNickname,
        checkName,
        checkPhone,
        checkEmail,
        checkBirthDate,
        required,
    };
}
export default useYup;

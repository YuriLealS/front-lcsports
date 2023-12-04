import * as Yup from "yup"

export const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email obrigatório'),
    senha: Yup.string().required('Senha obrigatória')
});
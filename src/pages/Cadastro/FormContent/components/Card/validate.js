import * as Yup from "yup"

export const validationSchema = Yup.object({
    nome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório").transform((value) => {
        return value.toLowerCase() ?? " "
    }),
    senha: Yup.string().min(6, "Mínimo de 6 caracteres").required("Campo obrigatório"),
    cep: Yup.string().matches(/^\d{5}(-)?\d{3}$/, "CEP inválido").required("Campo obrigatório"),
    uf: Yup.string().length(2, "UF inválida").required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().matches(/^\d{2}\d{5}\d{4}$/, "Telefone inválido").required("Campo obrigatório"),
    termos: Yup.bool().oneOf([true], 'É preciso aceitar o termo de uso.'),
});
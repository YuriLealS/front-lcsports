import { AxiosError } from "axios";
import { api } from "../api/api";

export const login = async (userLogin) => {
    try {
        const response = await api.post('v1/usuarios/autenticar', userLogin);
        return response;
    } catch (error) {
        return error
    }
}

export const cadastro = async (usuario) => {
    try {
        const response = await api.post('v1/usuarios', usuario)
        return response;
    } catch (error) {
        return error;
    }
}

export const editar = async (usuario) => {
    try {
        const response = await api.patch('v1/usuarios', usuario)
        return response;
    } catch (error) {
        return error;
    }
}
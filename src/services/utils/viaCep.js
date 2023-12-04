import { api } from "../api/api"

export const cepService = async (cep) => {
    const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data
}
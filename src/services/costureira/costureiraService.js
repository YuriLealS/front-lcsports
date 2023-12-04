import { api } from "../api/api";

export const costureiraPeloId = async (idCostureira) => {
  try {
    const response = await api.get(`v1/usuarios/${idCostureira}`);
    console.log(response.data); // Exibe a resposta no console
    return response;
  } catch (error) {
    console.error(error); // Exibe o erro no console
    return error;
  }
};

import { api } from "../api/api";

export const postagensFeed = async () => {
    try {
        const response = await api.get('http://localhost:8080/v1/postagens/feed')
        return response.data;
    
    } catch (error) {
        return error
    }
}
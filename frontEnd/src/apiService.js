import api from "./apiConfig";


export const addFruit = async (fruit) => {
    try {
        const response = await api.post('/fruit', fruit);
        return response.data;
    } catch (error) {
        console.error('Error adding fruit:', error);
        throw error;
    }
}

export const getAllFruits = async () => {
    try {
        const response = await api.get('/fruits');
        return response.data.fruits;
    } catch (error) {
        console.error('Error fetching fruits:', error);
        throw error;
    }
}

export const deleteFruit = async (fruitId) => {
    try {
        const response = await api.delete(`/fruit/${fruitId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting fruit:', error);
        throw error;
    }
}

export const updateFruit = async (fruit) => {
    try {
        const response = await api.put(`/fruit/${fruit.id}`, fruit);
        return response.data;
    } catch (error) {
        console.error('Error updating fruit:', error);
        throw error;
    }
}
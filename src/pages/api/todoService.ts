import axiosInstance from './axiosInstance';

export const createTodo = async (
  title: string,
  description: string,
  startDate: string,
  endDate: string 
) => {
  try {
    const response = await axiosInstance.post('/create', {
      title,
      description,
      start_date: startDate,
      end_date: endDate,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTodos = async () => {
  try {
    const response = await axiosInstance.get('/fetch/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTodoById = async (todoId: string) => {
  try {
    const response = await axiosInstance.get(`/get/${todoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (todoId: string, isCompleted: boolean) => {
  try {
    const response = await axiosInstance.put(`/update/${todoId}`, {
      is_completed: isCompleted,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    const response = await axiosInstance.delete(`/delete/${todoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

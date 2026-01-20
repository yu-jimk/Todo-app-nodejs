import { useState } from 'react';

interface UseDeleteTodoResult {
  deleteTodo: (id: string) => Promise<void>;
  isDeleting: boolean;
  error?: Error;
}

const useDeleteTodo = (): UseDeleteTodoResult => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const deleteTodo = async (id: string): Promise<void> => {
    setError(undefined);
    setIsDeleting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      throw e;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteTodo,
    isDeleting,
    error,
  };
};

export default useDeleteTodo;

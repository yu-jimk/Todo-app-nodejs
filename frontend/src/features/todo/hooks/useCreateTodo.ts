import { useState } from 'react';

interface UseCreateTodoResult {
  createTodo: (title: string) => Promise<void>;
  isCreating: boolean;
  error?: Error;
}

const useCreateTodo = (): UseCreateTodoResult => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const createTodo = async (title: string): Promise<void> => {
    setError(undefined);
    setIsCreating(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      throw e;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createTodo,
    isCreating,
    error,
  };
};

export default useCreateTodo;

import { useState } from 'react';

interface UseUpdateTodoTitleResult {
  updateTitle: (id: string, title: string) => Promise<void>;
  isUpdating: boolean;
  error?: Error;
}

const useUpdateTodoTitle = (): UseUpdateTodoTitleResult => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const updateTitle = async (id: string, title: string): Promise<void> => {
    setIsUpdating(true);
    setError(undefined);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}/title`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.log(text);

        throw new Error(text || `Request failed: ${res.status}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      throw e;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateTitle,
    isUpdating,
    error,
  };
};

export default useUpdateTodoTitle;

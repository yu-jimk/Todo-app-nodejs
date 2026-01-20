import { useEffect, useState } from 'react';
import { type Todo } from 'shared/src/type';

interface UseTodoDetailResult {
  todo?: Todo;
  loading: boolean;
  error?: Error;
}

const useTodoDetail = (id?: string): UseTodoDetailResult => {
  const [todo, setTodo] = useState<Todo | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    const fetchTodo = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Request failed: ${res.status}`);
        }
        const contentType = res.headers.get('content-type') ?? '';
        if (!contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error(`Expected JSON response but received: ${text.slice(0, 200)}`);
        }
        const data = await res.json();
        if (!cancelled) setTodo(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTodo();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return {
    todo,
    loading,
    error,
  };
};

export default useTodoDetail;

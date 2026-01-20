import { useCallback, useEffect, useRef, useState } from 'react';
import { type Todo } from 'shared/src/type';

interface UseTodosResult {
  todos: Todo[];
  loading: boolean;
  error?: Error;
  refetch: () => Promise<void>;
}

const useTodos = (): UseTodosResult => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchTodos = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        signal: controller.signal,
      });
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
      if (!controller.signal.aborted) setTodos(data ?? []);
    } catch (e) {
      if (controller.signal.aborted) return;
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTodos();

    const onOptimistic = (ev: Event) => {
      try {
        const custom = ev as CustomEvent<{ id: string; completed: boolean }>;
        const d = custom.detail;
        if (d?.id) {
          setTodos((prev) =>
            prev.map((t) => (t.id === d.id ? { ...t, completed: d.completed } : t)),
          );
        }
      } catch {
        // ignore
      }
    };

    const onRevert = (ev: Event) => {
      try {
        const custom = ev as CustomEvent<{ id: string; completed: boolean }>;
        const d = custom.detail;

        if (d?.id) {
          setTodos((prev) =>
            prev.map((t) => (t.id === d.id ? { ...t, completed: d.completed } : t)),
          );
        }
      } catch {
        // ignore
      }
    };

    const onRefetch = () => {
      void fetchTodos();
    };

    try {
      window.addEventListener('todosOptimistic', onOptimistic as EventListener);
      window.addEventListener('todosRevert', onRevert as EventListener);
      window.addEventListener('todosRefetch', onRefetch as EventListener);
    } catch {
      // ignore
    }

    return () => {
      controllerRef.current?.abort();
      try {
        window.removeEventListener('todosOptimistic', onOptimistic as EventListener);
        window.removeEventListener('todosRevert', onRevert as EventListener);
        window.removeEventListener('todosRefetch', onRefetch as EventListener);
      } catch {
        // ignore
      }
    };
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    refetch: fetchTodos,
  };
};

export default useTodos;

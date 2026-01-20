import { useState } from 'react';

interface UseToggleCompletedResult {
  toggleCompleted: (id: string, current: boolean) => Promise<void>;
  isToggling: boolean;
  error?: Error;
}

const useToggleCompleted = (): UseToggleCompletedResult => {
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const toggleCompleted = async (id: string, current: boolean): Promise<void> => {
    setIsToggling(true);
    setError(undefined);
    // 楽観的に UI を更新するために最初にイベントを dispatch
    try {
      const optimistic = new CustomEvent('todosOptimistic', {
        detail: { id, completed: !current },
      });
      window.dispatchEvent(optimistic);
    } catch {
      // ignore
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}/completed`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !current }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      // 成功したらサーバーから再取得するよう通知
      try {
        window.dispatchEvent(new Event('todosRefetch'));
      } catch {
        // ignore
      }
    } catch (e) {
      // 失敗したら楽観更新を取り消す通知を出す
      try {
        const revert = new CustomEvent('todosRevert', { detail: { id, completed: current } });
        window.dispatchEvent(revert);
      } catch {
        // ignore
      }

      setError(e instanceof Error ? e : new Error(String(e)));
      throw e;
    } finally {
      setIsToggling(false);
    }
  };

  return {
    toggleCompleted,
    isToggling,
    error,
  };
};

export default useToggleCompleted;

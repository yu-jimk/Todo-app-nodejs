import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useTodoDetail from '../hooks/useTodoDetail';
import useUpdateTodoTitle from '../hooks/useUpdateTodoTitle';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ErrorAlert from '../../../shared/components/ErrorAlert';

const todoEditSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください').trim(),
});

type TodoEditFormData = z.infer<typeof todoEditSchema>;

const TodoEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { todo, loading, error } = useTodoDetail(id ?? '');
  const { updateTitle, isUpdating, error: updateError } = useUpdateTodoTitle();

  const {
    handleSubmit,
    reset,
    trigger,
    control,
    formState: { errors, isValid },
  } = useForm<TodoEditFormData>({
    resolver: zodResolver(todoEditSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (todo) {
      reset({
        title: todo.title,
      });
      // reset 後にバリデーションを実行して isValid を更新する
      void trigger('title');
    }
  }, [todo, reset, trigger]);

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <ErrorAlert message="無効なTODO IDです" />
      </div>
    );
  }

  if (loading) return <LoadingSpinner message="TODO情報を読み込み中..." />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <ErrorAlert message={error.message} />
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <ErrorAlert message="TODOが見つかりませんでした" />
      </div>
    );
  }

  const onSubmit = async (data: TodoEditFormData) => {
    try {
      const newTitle = data.title.trim();
      console.log('Updating title', id, newTitle);
      if (newTitle !== todo.title) {
        await updateTitle(id, newTitle);
      }
      navigate(`/todos/${id}`);
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const handleCancel = () => {
    navigate(`/todos/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">TODO 編集</h1>

      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block font-semibold text-gray-600">
              タイトル
            </label>
            <Controller
              control={control}
              name="title"
              defaultValue={todo?.title ?? ''}
              render={({ field }) => (
                <input
                  id="title"
                  type="text"
                  {...field}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              )}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          {updateError && (
            <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
              エラーが発生しました: {updateError.message}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              disabled={isUpdating}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
              disabled={isUpdating || !isValid}
            >
              {isUpdating ? '更新中...' : '更新'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoEditPage;

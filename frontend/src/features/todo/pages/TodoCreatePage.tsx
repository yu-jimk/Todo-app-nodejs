import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useCreateTodo from '../hooks/useCreateTodo';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../../shared/components/ErrorAlert';

const todoCreateSchema = z.object({
  title: z.string().min(1, 'タイトルを入力してください').trim(),
});

type TodoCreateFormData = z.infer<typeof todoCreateSchema>;

const TodoCreatePage = () => {
  const navigate = useNavigate();
  const { createTodo, isCreating, error } = useCreateTodo();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TodoCreateFormData>({
    resolver: zodResolver(todoCreateSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: TodoCreateFormData) => {
    try {
      await createTodo(data.title);
      navigate('/');
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">TODO 新規作成</h1>

      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="title" className="mb-2 block font-semibold text-gray-600">
              タイトル
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              placeholder="TODO を入力してください"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          {error && (
            <div className="mb-4">
              <ErrorAlert message={error.message} />
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              disabled={isCreating}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
              disabled={isCreating || !isValid}
            >
              {isCreating ? '作成中...' : '作成'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoCreatePage;

import useToggleCompleted from '../hooks/useToggleCompleted';

interface TodoCheckboxProps {
  id: string;
  completed: boolean;
}

const TodoCheckbox = ({ id, completed }: TodoCheckboxProps) => {
  const { toggleCompleted, isToggling } = useToggleCompleted();

  return (
    <input
      type="checkbox"
      checked={completed}
      onChange={() => toggleCompleted(id, completed)}
      disabled={isToggling}
      className="h-4 w-4"
    />
  );
};

export default TodoCheckbox;

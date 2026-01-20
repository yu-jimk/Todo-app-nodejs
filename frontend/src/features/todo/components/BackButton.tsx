import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
}

const BackButton = ({ to }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
    >
      戻る
    </button>
  );
};

export default BackButton;

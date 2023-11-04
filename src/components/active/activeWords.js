import { useSelector } from 'react-redux';
import WordForm from './wordForm';

const ActiveWords = () => {
  const user = useSelector((state) => state.user);
  const actives = useSelector((state) => state.user.active_words);

  return (
    <>
      {user.logged && actives.length > 0 && (
        <div className="active-form-container d-flex">
          {actives.map((word) => (
            <WordForm key={word.id} word={word} />
          ))}
        </div>
      )}
      {!user.logged && <div>Please log in</div>}
    </>
  );
};

export default ActiveWords;

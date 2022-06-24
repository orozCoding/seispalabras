import { useSelector } from "react-redux";
import WordForm from "./wordForm";

const ActiveWords = () => {
  const actives = useSelector((state) => state.actives);
  const user = useSelector((state) => state.user);

  return (
    <>
      {user.logged && actives.length > 0 &&
      <div className="form-container d-flex col">{actives.map((active) => {
        return (
          <WordForm key={active.id} active={active} />
        )
      })}
      </div>}
      {!user.logged &&
      <div>Please log in</div>}
      
    </>
  )
};

export default ActiveWords;
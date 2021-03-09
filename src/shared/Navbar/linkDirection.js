import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default (text) => {
  const houseParam = useParams().houseId;
  const { userId } = useSelector((state) => ({ ...state.auth }));
  return userId ? `/${houseParam}/${text}` : `/${text}`;
};

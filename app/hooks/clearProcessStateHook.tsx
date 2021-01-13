import { useDispatch } from 'react-redux';
import { updateReset } from '../features/anonymizer/anonymizerSlice';
import { clearAuthError } from '../features/login/authSlice';

export default function useClearProcessState() {
  const dispatch = useDispatch();

  const resetState = () => {
    dispatch(updateReset());
    dispatch(clearAuthError());
  };

  return [resetState];
}

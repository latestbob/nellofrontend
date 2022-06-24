import { useState } from 'react';

const useEditState = (initialState = null) => {
  const [state, setState] = useState(null);

  const updateState = (data) => setState(data);

  return [state, updateState];
};

export default useEditState;
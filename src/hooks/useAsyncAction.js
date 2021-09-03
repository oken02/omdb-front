import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useAsyncAction = (action, params) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ status: "pending" });

  useEffect(() => {
    dispatch(action(params)).then((action) => {
      if (!action.error) {
        setState({ status: "resolved", res: action.payload });
      } else {
        setState({ status: "rejected", res: action.error });
      }
    });
  }, []);

  return state;
};

export default useAsyncAction;

import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../reducers/notificationReducer";
import { useEffect } from "react";

export default function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [notification, dispatch]);

  if (!notification) {
    return null;
  }

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  );
}

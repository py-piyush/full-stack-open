const Notification = ({ message }) => {
  if (message === null) {
    return;
  }
  return <div className={message.class}>{message.msg}</div>;
};

export default Notification;

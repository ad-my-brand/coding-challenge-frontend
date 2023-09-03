type NotificationProps = {
  label: string;
  success: boolean;
};

const Notification = ({ label, success }: NotificationProps) => {
  return (
    <div
      className={`notification-block fixed z-10 bottom-4 bg-white w-4/5 md:w-2/5 left-1/2 -translate-x-1/2 shadow-lg px-8 py-4 rounded md:text-lg before:absolute before:w-2 before:h-full ${
        success
          ? "before:bg-green-600 text-green-700"
          : "before:bg-red-600 text-red-700"
      }  before:top-0 before:left-0 before:rounded-l`}
    >
      {label}
    </div>
  );
};

export default Notification;

interface Alert {
  message: string;
  success: boolean;
}

function AlertNotification({ message, success }: Alert) {
  if (success) {
    return (
      <div className="w-full mx-3 text-center">
        <p className="font-bold text-lg text-green-500">{message}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full mx-3 text-center">
        <p className="font-bold text-lg text-red-500">{message}</p>
      </div>
    );
  }
}

export default AlertNotification;

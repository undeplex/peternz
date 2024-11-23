export default function PopupNotification({ message, onClose }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-green-500 bg-opacity-15 text-white p-6 rounded-lg shadow-lg relative">
          <p>{message}</p>
          <button
            onClick={onClose}
            className="absolute p-3 rounded-full bg-gray-500 bg-opacity-10 top-1 right-1 text-white font-bold"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }
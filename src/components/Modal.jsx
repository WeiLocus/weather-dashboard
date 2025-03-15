function Modal({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
      <div className="max-w-sm min-w-80 bg-white p-4 rounded-lg shadow-lg text-center">
        <p className="text-lg font-semibold text-red-600">Error</p>
        <hr />
        <p className="mt-4 text-gray-700 ">{message}</p>
        <button
          className=" mt-6 px-3 py-1 bg-blue-600 rounded text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal

import React from "react";

const Modal = ({ setShowModal, eliminarObjeto, id }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 shadow-lg shadow-neutral-700 rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4 text-center">Confirmar eliminación</h2>
        <hr className="border-neutral-700 mb-6" />

        <p className="mb-6">¿Estás seguro de que deseas eliminar?</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 transition-all duration-300 w-full text-black px-4 py-2 rounded"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 transition-all duration-300 w-full text-white px-4 py-2 rounded"
            onClick={() => {
              eliminarObjeto(id);
              setShowModal(false);
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
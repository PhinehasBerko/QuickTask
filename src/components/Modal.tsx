"use client"
import React from 'react'

interface ModalProps{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
const Modal = ({isOpen, onClose, children}: ModalProps) => {
    if(!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
        <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
            >
                x
            </button>
            {children}
        </div>
    </div>
  )
}

export default Modal
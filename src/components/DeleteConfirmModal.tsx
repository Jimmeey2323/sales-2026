import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './ui/Modal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  offerName: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  offerName 
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Offer"
      size="sm"
    >
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-rose-500" />
        </div>
        
        <h3 className="text-lg font-semibold text-[#1a2332] mb-2">
          Are you sure?
        </h3>
        
        <p className="text-slate-600 mb-6">
          You are about to delete "<span className="font-medium">{offerName}</span>". 
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition-colors"
          >
            Delete Offer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;

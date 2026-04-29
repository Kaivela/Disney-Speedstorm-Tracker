import { X } from 'lucide-react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="overlay p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}>
      <div className="relative overflow-scroll mt-5 mb-5 max-h-[90vh] bg-surface-200/90 border border-white rounded-lg text-black backdrop-blur-sm px-8 py-6">
        <button className="fixed top-1 right-2" onClick={onClose}>
          <X className="bg-black/20 rounded-full w-8 h-8 p-1 hover:scale-[1.1]" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

// exemple de syntaxe :
// <Modal onClose={() => setIsOpen(false)} isOpen(isOpen)>
// !!! Ton HTML !!!
// <Modal/>

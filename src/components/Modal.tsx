type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <button className="hidden" onClick={onClose}>
          ✕
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

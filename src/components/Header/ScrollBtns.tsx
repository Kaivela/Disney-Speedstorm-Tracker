import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

// // Gérer l'affichage des boutons selon le scroll
function handleScroll(setShowTopBtn: (show: boolean) => void, setShowBottomBtn: (show: boolean) => void) {
  if (window.scrollY > 100) {
    setShowTopBtn(true);
  } else {
    setShowTopBtn(false);
  }
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    setShowBottomBtn(false);
  } else {
    setShowBottomBtn(true);
  }
}

// Remonter en haut
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// / Aller en bas
function scrollBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

export function ScrollBtns() {
  //LOGIC
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showBottomBtn, setShowBottomBtn] = useState(true);

  function scrollHandler() {
    handleScroll(setShowTopBtn, setShowBottomBtn);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  //TEMPLATE
  return (
    <div className="scrollButtons">
      <button className={`scrollButton ${!showTopBtn ? 'invisible' : ''}`} onClick={scrollTop}>
        <ChevronUp />
      </button>
      <button className={`scrollButton ${!showBottomBtn ? 'invisible' : ''}`} onClick={scrollBottom}>
        <ChevronDown />
      </button>
    </div>
  );
}

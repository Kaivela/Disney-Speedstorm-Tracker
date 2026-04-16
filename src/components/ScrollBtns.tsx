import { useEffect, useRef } from 'react';

// // Gérer l'affichage des boutons selon le scroll
function handleScroll(scrollTopBtn: HTMLButtonElement | null, scrollBottomBtn: HTMLButtonElement | null) {
  if (!scrollTopBtn || !scrollBottomBtn) return;
  if (window.scrollY > 100) {
    scrollTopBtn.classList.remove('hidden');
  } else {
    scrollTopBtn.classList.add('hidden');
  }
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    scrollBottomBtn.classList.add('hidden');
  } else {
    scrollBottomBtn.classList.remove('hidden');
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
  const scrollTopBtn = useRef<HTMLButtonElement>(null);
  const scrollBottomBtn = useRef<HTMLButtonElement>(null);

  function scrollHandler() {
    handleScroll(scrollTopBtn.current, scrollBottomBtn.current);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  //TEMPLATE
  return (
    <div className="scrollButtons">
      <button ref={scrollTopBtn} className="scrollButton hidden" onClick={scrollTop}>
        ▲
      </button>
      <button ref={scrollBottomBtn} className="scrollButton" onClick={scrollBottom}>
        ▼
      </button>
    </div>
  );
}

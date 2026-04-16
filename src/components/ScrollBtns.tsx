// // Gérer l'affichage des boutons selon le scroll
// window.addEventListener("scroll", () => {
//   if (window.scrollY > 100) {
//     HTML.scrollTopBtn.classList.remove("hidden");
//   } else {
//     HTML.scrollTopBtn.classList.add("hidden");
//   }

//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
//     HTML.scrollBottomBtn.classList.add("hidden");
//   } else {
//     HTML.scrollBottomBtn.classList.remove("hidden");
//   }
// });

// Remonter en haut
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// / Aller en bas
function scrollBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

export function ScrollBtns() {
  return (
    <div className="scrollButtons">
      <button id="scrollTopBtn" className="scrollButton" onClick={scrollTop}>
        ▲
      </button>
      <button id="scrollBottomBtn" className="scrollButton" onClick={scrollBottom}>
        ▼
      </button>
    </div>
  );
}

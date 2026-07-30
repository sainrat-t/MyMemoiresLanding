/**
 * Mention de soutien affichée en pied de page des deux landings.
 * L'icône du lama reprend le tracé de la marque Studio Lamarck et
 * hérite de la couleur du texte environnant (fill:currentColor).
 */
const SoutienLamarck = () => (
  <p className="footer-soutien">
    Créé avec le soutien de{' '}
    <svg className="lama" viewBox="0 0 384 384" role="img" aria-label="Lama" focusable="false">
      <path
        fill="currentColor"
        d="M17.25,61.5l31.5,-2.25l0,-59.25l23.25,0l0,57.75l23.25,-1.5l0,-56.25l23.25,0l0,157.5c0,0 1.575,19.367 20.25,19.5c18.675,0.133 196.5,0 196.5,0c0,0 31.721,-1.9 31.5,31.5c-0.221,33.4 0,22.5 0,22.5l-23.25,0l0,-21c0,0 0.726,-9.334 -9.75,-9.75c-10.476,-0.416 -24.75,0 -24.75,0l0,183.75l-39.75,0l0,-95.25l-146.25,0l0,95.25l-39.75,0l0,-95.25c0,0 -23.211,-0.576 -23.25,-20.25c-0.039,-19.674 0,-168 0,-168l-42.75,0l0,-39Z"
      />
    </svg>{' '}
    <a href="https://studiolamarck.fr" target="_blank" rel="noopener noreferrer">
      Studio Lamarck
    </a>
  </p>
);

export default SoutienLamarck;

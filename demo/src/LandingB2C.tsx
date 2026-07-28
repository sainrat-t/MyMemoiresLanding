import React, { useState, useEffect, useRef } from 'react';

/**
 * Page particuliers (racine du domaine).
 *
 * Reprend la charte de l'application mobile — crème, rose poudré, Newsreader
 * pour ce qui appartient au livre et à la voix, Inter pour l'interface — et met
 * l'accent sur le cercle familial : plusieurs proches enregistrent le même aîné.
 *
 * Le formulaire envoie firstName / lastName / email, soit exactement le format
 * que la fonction /api/subscribe traite déjà pour la liste d'attente.
 */
const LandingB2C: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'submitted'>('idle');
  const [chrono, setChrono] = useState(492); // 08:12, comme la maquette du studio
  const emailRef = useRef<HTMLInputElement>(null);

  // Compteur de la cassette : donne vie à l'illustration du studio.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setChrono((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Apparition des sections au défilement.
  useEffect(() => {
    const cibles = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      cibles.forEach((el) => el.classList.add('vu'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vu');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cibles.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Compteur au format de l'app : 00:00, chiffres tabulaires.
  const minutes = String(Math.floor(chrono / 60)).padStart(2, '0');
  const secondes = String(chrono % 60).padStart(2, '0');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || email.indexOf('@') === -1) {
      emailRef.current?.focus();
      return;
    }
    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      if (response.ok) {
        setStatus('submitted');
      } else {
        console.error('Erreur lors de la soumission du formulaire');
        setStatus('idle');
        alert("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      setStatus('idle');
      alert('Impossible de joindre le serveur. Veuillez vérifier votre connexion.');
    }
  };

  return (
    <>
      <header>
        <nav className="nav" aria-label="Navigation principale">
          <a className="logo" href="#">
            <img className="logo-mark" src="/logo-mark.png" alt="" aria-hidden="true" />
            <span className="mot">My<em>Mémoires</em></span>
          </a>
          <div className="nav-droite">
            <a className="lien-pro" href="/ehpad">Vous êtes un établissement ?</a>
            <a className="pilule pilule-encre nav-cta" href="#attente">
              <span className="cta-long">Être prévenu du lancement</span>
              <span className="cta-court">Être prévenu</span>
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div>
            <span className="pastille"><i aria-hidden="true"></i>Application iOS et Android — bientôt disponible</span>
            <h1>Vos parents racontent. <em>Toute la famille tient la plume.</em></h1>
            <p className="lead">
              MyMémoires recueille les souvenirs d'un aîné au fil des visites — les vôtres, celles de votre frère,
              celles de vos enfants. Chaque conversation devient un chapitre écrit. À la fin, un livre relié.
            </p>
            <div className="hero-ctas">
              <a className="pilule pilule-encre" href="#attente">Être prévenu du lancement</a>
              <a className="ligne-serif" href="#geste">voir comment le livre s'écrit</a>
            </div>
            <p className="hero-mini">
              <b>Les trois premiers souvenirs sont offerts.</b>&nbsp;Aucune carte bancaire pour commencer.
            </p>
          </div>

          {/* Le studio « la bobine » — le geste signature de l'application */}
          <div className="tel" aria-hidden="true">
            <div className="tel-tete">
              <span className="rec"></span><span>REC</span>
            </div>
            <div className="cassette">
              <p className="theme">Thème · Le bal du 14 juillet<b></b></p>
              <div className="bobines">
                <span className="bobine"><i></i></span>
                <span className="bobine-lien"></span>
                <span className="bobine"><i></i></span>
              </div>
              <div className="vumetre">
                <i></i><i></i><i></i><i></i><i></i>
              </div>
              <p className="compteur">Face A · {minutes}:{secondes} <em>· ✓ sauvegardé</em></p>
              <div className="touche enfoncee"><i></i></div>
              <p className="touche-label">RELEVER POUR TERMINER</p>
            </div>
            <div className="questions">
              <span className="rubrique">Posez la suivante</span>
              <hr className="filet" />
              <div className="question active">
                <span>01</span>
                <p>Qui vous a invitée à danser, ce soir-là ?</p>
              </div>
              <div className="question">
                <span>02</span>
                <p>Quelle musique jouait l'orchestre ?</p>
              </div>
              <div className="question">
                <span>03</span>
                <p>Comment êtes-vous rentrée à la maison ?</p>
              </div>
            </div>
          </div>
        </section>

        {/* LE GESTE */}
        <section className="section geste" id="geste">
          <div className="dedans">
            <div className="reveal">
              <span className="rubrique">Un écran, un geste</span>
              <h2 className="section-titre" style={{ marginTop: '14px' }}>
                Une seule touche. <em>Le reste se fait seul.</em>
              </h2>
              <p className="section-chapo">
                Pas de menu à apprendre, pas de bouton à chercher — un aîné de 84 ans n'a rien à manipuler.
                On enfonce la touche, on laisse parler, on relève.
              </p>
            </div>
            <div className="temps">
              <div className="reveal">
                <span className="num">01</span>
                <h3>On enfonce la touche</h3>
                <p>
                  Pendant un déjeuner, une visite, un après-midi. Trois questions s'affichent pour lancer la
                  conversation, et se renouvellent d'elles-mêmes à mesure que le récit avance.
                </p>
              </div>
              <div className="reveal">
                <span className="num">02</span>
                <h3>La plume transcrit</h3>
                <p>
                  La parole devient un texte écrit, rangé dans le bon chapitre et la bonne période de la vie.
                  Personne, dans la famille, n'a une ligne à rédiger.
                </p>
              </div>
              <div className="reveal">
                <span className="num">03</span>
                <h3>Le livre s'épaissit</h3>
                <p>
                  Chaque souvenir ajoute ses pages. Aucun pourcentage, aucune jauge : simplement
                  « 86 pages tissées — encore deux souvenirs avant l'impression ».
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LE CERCLE FAMILIAL */}
        <section className="section" id="famille">
          <div className="dedans cercle-grille">
            <div className="reveal">
              <span className="rubrique">Le cercle familial</span>
              <h2 className="section-titre" style={{ marginTop: '14px' }}>
                Un souvenir par visite, <em>et vous êtes plusieurs à rendre visite.</em>
              </h2>
              <p className="section-chapo">
                C'est la raison d'être de MyMémoires : personne ne recueille seul toute une vie. Le livre
                appartient au cercle, pas à celui qui a installé l'application.
              </p>
              <div className="cercle-liste">
                <div>
                  <span className="marque" aria-hidden="true"></span>
                  <div>
                    <h4>Vous ouvrez le livre</h4>
                    <p>Vous créez l'espace de votre mère ou de votre père, et vous enregistrez le premier souvenir.</p>
                  </div>
                </div>
                <div>
                  <span className="marque" aria-hidden="true"></span>
                  <div>
                    <h4>Vous invitez les vôtres</h4>
                    <p>
                      Un code de six caractères suffit. Frères, sœurs, petits-enfants : chacun rejoint le même
                      livre depuis son propre téléphone, où qu'il habite.
                    </p>
                  </div>
                </div>
                <div>
                  <span className="marque" aria-hidden="true"></span>
                  <div>
                    <h4>Chacun enregistre à son tour</h4>
                    <p>
                      Le week-end de l'un, les vacances de l'autre. Les souvenirs se rangent d'eux-mêmes dans la
                      chronologie du récit, quel que soit l'ordre dans lequel ils ont été confiés.
                    </p>
                  </div>
                </div>
                <div>
                  <span className="marque" aria-hidden="true"></span>
                  <div>
                    <h4>Tout le monde relit</h4>
                    <p>
                      Un prénom mal orthographié, une date à reprendre : un appui long sur le texte suffit, et la
                      correction profite à toute la famille.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="invitation reveal">
              {/* Le cercle : plusieurs proches, un seul livre au centre. */}
              <svg className="schema-cercle" viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r="66" fill="none" stroke="var(--pale)" strokeWidth="1" />
                {/* Le livre, au centre du cercle */}
                <g>
                  <rect x="86" y="80" width="28" height="40" rx="2" fill="var(--bordeaux)" />
                  <line x1="91" y1="84" x2="91" y2="116" stroke="var(--gold)" strokeWidth="1" opacity=".5" />
                  <line x1="96" y1="106" x2="109" y2="106" stroke="var(--gold)" strokeWidth="1.5" opacity=".8" />
                </g>
                {/* Les proches, posés sur le cercle */}
                <g fill="var(--tint)" stroke="var(--deep)" strokeWidth="1.2">
                  <circle cx="100" cy="34" r="12" />
                  <circle cx="157" cy="133" r="12" />
                  <circle cx="43" cy="133" r="12" />
                  <circle cx="152" cy="61" r="9" />
                  <circle cx="48" cy="61" r="9" />
                </g>
              </svg>
              <p className="schema-legende">Un même livre, plusieurs mains.</p>
              <hr className="filet" />
              <span className="rubrique">Rejoindre le livre de Jeanne</span>
              <div className="code">
                <b>J</b><b>E</b><b>A</b><s>·</s><b>4</b><b>8</b><b>2</b>
              </div>
              <p className="validite">Code valable 7 jours</p>
              <hr className="filet" />
              <div className="attributions">
                <p><span className="puce"></span>enregistré le 12 juin par <b>&nbsp;Claire</b></p>
                <p><span className="puce"></span>enregistré le 28 juin par <b>&nbsp;Marc</b></p>
                <p><span className="puce"></span>enregistré le 5 juillet par <b>&nbsp;Sophie</b></p>
              </div>
            </div>
          </div>
        </section>

        {/* LE LIVRE */}
        <section className="section livre" id="livre">
          <div className="dedans livre-grille">
            <div className="reveal">
              <div className="couverture">
                <div className="portrait"></div>
                <p className="titre">JEANNE</p>
                <p className="sous">récits d'une vie</p>
              </div>
            </div>
            <div className="reveal">
              <span className="rubrique">L'édition reliée</span>
              <h2 className="section-titre" style={{ marginTop: '14px' }}>
                À la fin, <em>un objet qu'on se passe de main en main.</em>
              </h2>
              <p className="section-chapo">
                Pas un fichier à télécharger. Un livre imprimé une fois que la matière est là, avec le titre
                poussé à la feuille d'or et une dédicace que la famille écrit ensemble.
              </p>
              <div className="livre-details">
                <div><span>Reliure</span><span className="conduite"></span><span>toilée, cousue</span></div>
                <div><span>Titre de couverture</span><span className="conduite"></span><span>feuille d'or</span></div>
                <div><span>Pages</span><span className="conduite"></span><span>environ 112</span></div>
                <div><span>Dédicace</span><span className="conduite"></span><span>écrite à plusieurs</span></div>
                <div><span>Version numérique</span><span className="conduite"></span><span>incluse, pour toute la famille</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* CONFIANCE */}
        <section className="section" id="confiance">
          <div className="dedans">
            <div className="reveal">
              <span className="rubrique">Ce que vous confiez</span>
              <h2 className="section-titre" style={{ marginTop: '14px' }}>
                Une vie racontée, <em>ça ne se prête pas.</em>
              </h2>
            </div>
            <div className="confiance-grille">
              <div className="reveal">
                <h3>Vos données restent en France</h3>
                <p>
                  Les enregistrements, les textes et les photos sont hébergés sur des serveurs situés en France.
                  Rien ne transite par un cloud extra-européen.
                </p>
              </div>
              <div className="reveal">
                <h3>Des IA européennes, jamais nourries de vos récits</h3>
                <p>
                  La transcription et la mise en forme reposent sur des modèles souverains européens. Les
                  souvenirs de votre famille ne servent jamais à entraîner un modèle public.
                </p>
              </div>
              <div className="reveal">
                <h3>Le livre vous appartient</h3>
                <p>
                  Le récit et le livre sont la propriété exclusive du conteur et de sa famille. Vous pouvez tout
                  emporter, et tout faire effacer, à n'importe quel moment.
                </p>
              </div>
              <div className="reveal">
                <h3>Un cercle étanche</h3>
                <p>
                  Une famille n'accède qu'à son propre livre. Aucun autre compte, aucun tiers, ne peut atteindre
                  les souvenirs de votre aîné.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LES OFFRES */}
        <section className="section geste" id="tarifs">
          <div className="dedans">
            <div className="gratuit reveal">
              <span className="rubrique">Commencer ne coûte rien</span>
              <p className="grand" style={{ marginTop: '14px' }}>
                Les trois premiers souvenirs <em>vous sont offerts.</em>
              </p>
              <p className="section-chapo" style={{ margin: '18px auto 0' }}>
                Vous lisez le premier chapitre réellement écrit à partir de la voix de votre aîné avant de
                décider quoi que ce soit.
              </p>
            </div>
            <div className="offres reveal">
              <div className="offre principale">
                <div className="offre-txt">
                  <p className="label">L'édition reliée</p>
                  <p className="desc">
                    Le livre imprimé, livré chez vous — et l'accès numérique illimité pour tout le cercle familial.
                  </p>
                </div>
                <div className="offre-prix">
                  <b>89 €</b>
                  <span>une seule fois · livraison offerte</span>
                </div>
              </div>
              <div className="offre secondaire">
                <div className="offre-txt">
                  <p className="label">L'abonnement</p>
                  <p className="desc">
                    Des chapitres sans limite, sans le livre. L'édition reliée reste disponible quand vous le
                    souhaitez.
                  </p>
                </div>
                <div className="offre-prix">
                  <b>9,99 €</b>
                  <span>par mois, sans engagement</span>
                </div>
              </div>
              <p className="offre-legal">
                Exemplaire supplémentaire 39 € — « un pour Jeanne, un pour chacun de ses enfants ».
                Tarifs TTC, livraison comprise.
              </p>
            </div>
          </div>
        </section>

        {/* LISTE D'ATTENTE */}
        <section className="section attente" id="attente">
          <div className="attente-in">
            <div className="reveal">
              <h2>
                L'application ouvre bientôt. <em>Ouvrez le premier livre.</em>
              </h2>
              <p className="chapo">
                MyMémoires arrive sur iOS et Android. Laissez-nous votre adresse : vous serez prévenu au
                lancement, et vous ferez partie des premières familles à enregistrer.
              </p>
              <p className="mini">Un seul e-mail, au lancement. Pas de newsletter.</p>
            </div>
            <div className="formulaire reveal">
              {status !== 'submitted' ? (
                <form onSubmit={handleSubmit}>
                  <h3>Rejoignez l'avant-première</h3>
                  <p className="intro">
                    Nous prévenons les inscrits par ordre d'arrivée, le jour de la sortie.
                  </p>
                  <div className="duo">
                    <div className="champ">
                      <label htmlFor="b2c-prenom">Prénom</label>
                      <input
                        id="b2c-prenom"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="Claire"
                        autoComplete="given-name"
                      />
                    </div>
                    <div className="champ">
                      <label htmlFor="b2c-nom">Nom</label>
                      <input
                        id="b2c-nom"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Lacombe"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                  <div className="champ">
                    <label htmlFor="b2c-email">Adresse e-mail</label>
                    <input
                      id="b2c-email"
                      type="email"
                      ref={emailRef}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="claire@exemple.com"
                      autoComplete="email"
                    />
                  </div>
                  <button className="pilule pilule-encre" type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Envoi en cours…' : "M'inscrire à l'avant-première"}
                  </button>
                  <p className="rgpd">
                    Vos coordonnées servent uniquement à vous prévenir de la sortie de l'application. Elles ne
                    sont ni revendues, ni partagées.
                  </p>
                </form>
              ) : (
                <div className="merci">
                  <span className="losange"></span>
                  <h3>Bientôt avec vous.</h3>
                  <p>
                    Votre inscription est confirmée{firstName ? `, ${firstName}` : ''}. Vous recevrez un e-mail
                    le jour de l'ouverture — et un confirmatif dans quelques instants.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-in">
          <span className="mot">My<em>Mémoires</em></span>
          <ul className="footer-liens">
            <li><a href="#geste">Comment ça marche</a></li>
            <li><a href="#famille">Le cercle familial</a></li>
            <li><a href="#livre">Le livre</a></li>
            <li><a href="#tarifs">Tarifs</a></li>
            <li><a href="/ehpad">Pour les EHPAD</a></li>
          </ul>
          <span>© 2026 MyMémoires</span>
        </div>
      </footer>
    </>
  );
};

export default LandingB2C;

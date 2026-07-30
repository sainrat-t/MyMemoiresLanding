import React, { useState, useEffect, useMemo, useRef } from 'react';
import SoutienLamarck from './SoutienLamarck';

const LandingPage: React.FC = () => {
  // Chrono Time State
  const [chronoTime, setChronoTime] = useState('0:00');

  // Typing effect text State
  const [typedText, setTypedText] = useState('');

  // Form States
  const [nom, setNom] = useState('');
  const [fonction, setFonction] = useState('Direction d\'établissement');
  const [etab, setEtab] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'submitted'>('idle');

  const emailInputRef = useRef<HTMLInputElement>(null);

  // Generate stable waveform bar styles on mount
  const waveformBars = useMemo(() => {
    return Array.from({ length: 42 }).map(() => ({
      animationDelay: `${Math.random() * -1.1}s`,
      height: `${25 + Math.random() * 70}%`
    }));
  }, []);

  // 1. Chrono Timer Effect
  useEffect(() => {
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduit) {
      setChronoTime('2:14');
      return;
    }

    let sec = 0;
    const interval = setInterval(() => {
      sec = (sec + 1) % 135;
      const minutes = Math.floor(sec / 60);
      const seconds = `0${sec % 60}`.slice(-2);
      setChronoTime(`${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 2. Typing Effect for Jeanne's story
  useEffect(() => {
    const fullText = "Avril 1957, l'imprimerie de la rue des Carmes. Jeanne a dix-sept ans et les mains pleines d'encre. Le patron l'accueille d'une phrase qu'elle n'oubliera jamais : « Petite, ici, on n'imprime pas des pages, on imprime des vies. » Quarante ans durant, elle prendra ces mots au pied de la lettre.";
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduit) {
      setTypedText(fullText);
      return;
    }

    let i = 0;
    let timerId: ReturnType<typeof setTimeout>;

    const ecrire = () => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
        timerId = setTimeout(ecrire, 22 + Math.random() * 26);
      }
    };

    const startTimer = setTimeout(ecrire, 900);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timerId);
    };
  }, []);

  // 3. Scroll Reveal Animation using IntersectionObserver
  useEffect(() => {
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && !reduit) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vu');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealElements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    } else {
      revealElements.forEach((el) => el.classList.add('vu'));
    }
  }, []);

  // 4. Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(false);

    if (!email || email.indexOf('@') === -1) {
      setEmailError(true);
      emailInputRef.current?.focus();
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom, fonction, etab, email }),
      });

      if (response.ok) {
        setStatus('submitted');
      } else {
        console.error('Erreur lors de la soumission du formulaire');
        setStatus('idle');
        alert("Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      setStatus('idle');
      alert("Impossible de joindre le serveur. Veuillez vérifier votre connexion.");
    }
  };

  return (
    <>
      <header>
        <nav className="nav" aria-label="Navigation principale">
          <a className="logo" href="#">
            <img className="logo-mark" src="/logo-mark.png" alt="" aria-hidden="true" />
            <span className="mot">My<em>Mémoires</em></span>
            <span className="pro">Pour les EHPAD</span>
          </a>
          <ul className="nav-links">
            <li><a href="#methode">Comment ça marche</a></li>
            <li><a href="#fonctions">L'application</a></li>
            <li><a href="#confiance">IA &amp; conformité</a></li>
            <li><a href="#demo">Contact</a></li>
          </ul>
          <a className="btn btn-encre nav-cta" href="#demo">
            <span className="cta-long">Demander une démonstration</span>
            <span className="cta-court">Démo</span>
          </a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div>
            <p className="eyebrow">L'application web des histoires de vie</p>
            <h1>Vos équipes enregistrent. <em>L'IA écrit la biographie.</em></h1>
            <p className="lead">
              MyMémoires permet à vos équipes de recueillir les histoires de vie des résidents en quelques minutes d'enregistrement — pendant un atelier, un soin, un café. L'IA transcrit, rédige et organise la biographie en chapitres. Vos équipes relisent et valident. C'est tout.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-encre" href="#demo">Demander une démonstration</a>
              <a className="btn btn-ghost" href="#methode">Voir comment ça marche</a>
            </div>
            <p className="hero-note"><strong>Zéro rédaction pour vos équipes.</strong> Un téléphone ou une tablette suffit.</p>
          </div>

          {/* Signature : la voix devient une page */}
          <div className="app-mock" aria-label="Aperçu de l'application : un enregistrement devient un passage de biographie">
            <div className="app-barre">
              <i></i><i></i><i></i><span>app.mymemoires.com — Résidence Les Tilleuls</span>
            </div>
            <div className="app-corps">
              <div className="fiche-resident">
                <span className="avatar">JL</span>
                <div>
                  <b>Jeanne Lacombe, 86 ans</b>
                  <span>Biographie en cours — Chapitre III, Le métier</span>
                </div>
              </div>

              <div className="enregistrement">
                <span className="bouton-rec" aria-hidden="true"></span>
                <span className="onde" id="onde" aria-hidden="true">
                  {waveformBars.map((bar, idx) => (
                    <i key={idx} style={{ animationDelay: bar.animationDelay, height: bar.height }} />
                  ))}
                </span>
                <time id="chrono">{chronoTime}</time>
              </div>

              <p className="fleche-ia">L'IA transcrit &amp; rédige</p>

              <div className="bio-page">
                <h4>Chapitre III — Le métier</h4>
                <p className="bio-texte">
                  <span id="bio-vivante">{typedText}</span>
                  <span className="curseur" aria-hidden="true"></span>
                </p>
                <div className="bio-pied">
                  <span>Rédigé à partir de l'enregistrement du 12 juin · 2 min 14</span>
                  <span className="valide">✓ Relu et validé par Claire, animatrice</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="bandeau">
          <div className="bandeau-in">
            <div className="stat"><b>2–3 min</b><span>d'enregistrement suffisent par anecdote</span></div>
            <div className="stat"><b>0</b><span>rédaction demandée à vos équipes</span></div>
            <div className="stat"><b>100 %</b><span>des récits relus et validés par un humain</span></div>
            <div className="stat"><b>1 biographie</b><span>par résident, chapitre après chapitre</span></div>
          </div>
        </div>

        {/* COMMENT ÇA MARCHE */}
        <section className="methode" id="methode">
          <div className="methode-in">
            <h2 className="section-titre reveal">
              Trois gestes séparent la voix d'un résident de <em>sa biographie</em>.
            </h2>
            <p className="sous reveal">
              Vos équipes recueillent déjà ces histoires tous les jours, au détour d'un soin ou d'un atelier. MyMémoires fait en sorte qu'elles ne s'évaporent plus.
            </p>

            <div className="trio">
              <article className="colonne reveal">
                <span className="ruban" aria-hidden="true"></span>
                <p className="pour">Geste 1 — l'équipe</p>
                <h3>Enregistrez</h3>
                <p>Depuis n'importe quel téléphone ou tablette de l'établissement, en un appui. Pendant un atelier mémoire, un soin, une visite famille. Les questions suggérées par l'app aident à lancer la conversation.</p>
              </article>
              <article className="colonne reveal">
                <span className="ruban" aria-hidden="true"></span>
                <p className="pour">Geste 2 — l'IA</p>
                <h3>L'IA rédige</h3>
                <p>L'enregistrement est transcrit puis réécrit en un texte fluide, fidèle aux mots et au ton du résident. Chaque récit rejoint automatiquement le bon chapitre de vie : l'enfance, le métier, les amours, les voyages.</p>
              </article>
              <article className="colonne reveal">
                <span className="ruban" aria-hidden="true"></span>
                <p className="pour">Geste 3 — l'équipe, encore</p>
                <h3>Relisez, validez</h3>
                <p>Rien n'est publié sans relecture. L'animateur corrige un prénom, retire un passage trop intime, valide. La biographie s'enrichit semaine après semaine — et peut être imprimée en livre relié.</p>
              </article>
            </div>
          </div>
        </section>

        {/* L'APPLICATION */}
        <section className="fonctions" id="fonctions">
          <p className="eyebrow reveal">L'application</p>
          <h2 className="section-titre reveal">
            Pensée pour le quotidien d'un établissement, pas pour <em>des écrivains</em>.
          </h2>
          <p className="sous reveal">Une application web, sans installation, utilisable par toute l'équipe sur les appareils que vous avez déjà.</p>

          <div className="grille-fn">
            <div className="fn reveal"><span className="pictet">i.</span><h3>Enregistrement en un geste</h3><p>Un bouton, un micro. L'app fonctionne sur téléphone, tablette et ordinateur, et reprend là où l'on s'est arrêté.</p></div>
            <div className="fn reveal"><span className="pictet">ii.</span><h3>Questions qui font parler</h3><p>Une bibliothèque de questions de réminiscence, adaptées au parcours de chaque résident, pour ne jamais être à court.</p></div>
            <div className="fn reveal"><span className="pictet">iii.</span><h3>Chapitres de vie automatiques</h3><p>Chaque récit est classé dans la bonne période : enfance, jeunesse, métier, famille. La biographie se construit toute seule.</p></div>
            <div className="fn reveal"><span className="pictet">iv.</span><h3>Photos &amp; documents</h3><p>Ajoutez les photos apportées par les familles : elles s'insèrent dans les chapitres correspondants.</p></div>
            <div className="fn reveal"><span className="pictet">v.</span><h3>Partage avec les familles</h3><p>Les proches suivent la biographie au fil de l'eau depuis leur espace, et peuvent proposer des questions ou des souvenirs.</p></div>
            <div className="fn reveal"><span className="pictet">vi.</span><h3>Livre relié imprimable</h3><p>À tout moment, exportez la biographie en un livre mis en page et relié — pour le résident, et un exemplaire par enfant.</p></div>
          </div>
        </section>

        {/* IA & CONFORMITÉ */}
        <section className="confiance" id="confiance">
          <div className="confiance-in">
            <div className="livre-visuel reveal" aria-hidden="true">
              <div className="tome">
                <div className="tranche"></div>
                <div className="couverture">
                  <span className="filet"></span>
                  <span className="titre-livre">Mémoires<br />d'une vie</span>
                  <span className="auteur">Jeanne Lacombe</span>
                  <span className="filet"></span>
                </div>
              </div>
            </div>
            <div className="reveal">
              <p className="eyebrow">IA &amp; conformité</p>
              <h2 className="section-titre">Une IA au service du récit, dans un cadre fait pour le <em>médico-social</em>.</h2>
              <p className="sous">Les histoires de vie sont des données intimes. Le fonctionnement de MyMémoires est conçu pour que vous puissiez l'expliquer sereinement aux résidents, aux familles et au CVS.</p>
              <div className="points">
                <div><b>i.</b><p>L'IA ne publie jamais seule : chaque texte est relu et validé par un membre de l'équipe avant d'être visible des familles.</p></div>
                <div><b>ii.</b><p>Consentement du résident ou de son représentant recueilli dans l'app avant le premier enregistrement ; les récits restent la propriété du résident et de sa famille.</p></div>
                <div><b>iii.</b><p>Données et enregistrements hébergés en France, conformité RGPD, jamais utilisés pour entraîner des modèles d'IA.</p></div>
                <div><b>iv.</b><p>Abonnement par établissement, équipes illimitées, accompagnement au lancement inclus.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* TÉMOIGNAGE — masqué en attendant de vrais témoignages recueillis
            auprès des établissements. Le style .temoin reste dans index.css :
            il suffira de décommenter et de remplacer citation + signature.
        <section className="temoin reveal">
          <blockquote>…</blockquote>
          <cite><b>Fonction</b> — Établissement, région</cite>
        </section>
        */}

        {/* DÉMO / CONTACT */}
        <section className="final" id="demo">
          <div className="final-in">
            <div className="reveal">
              <h2>Voyez l'application en action, avec les récits de <em>vos</em> résidents.</h2>
              <p>Une démonstration de 30 minutes en visio avec votre équipe d'animation. Possibilité de démarrer par un pilote sur un petit groupe de résidents, sans engagement.</p>
              <p className="mini">Réponse sous 24 h ouvrées · Aucune installation requise pour tester</p>
            </div>
            <div className="formulaire reveal">
              {status !== 'submitted' ? (
                <form onSubmit={handleFormSubmit} id="form-bloc">
                  <h3>Demander une démonstration</h3>
                  <div className="champ">
                    <label htmlFor="f-nom">Votre nom</label>
                    <input
                      id="f-nom"
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      required
                      placeholder="Ex: Claire Martin"
                      autoComplete="name"
                    />
                  </div>
                  <div className="champ">
                    <label htmlFor="f-fonction">Votre fonction</label>
                    <select
                      id="f-fonction"
                      value={fonction}
                      onChange={(e) => setFonction(e.target.value)}
                    >
                      <option value="Direction d'établissement">Direction d'établissement</option>
                      <option value="Animation / vie sociale">Animation / vie sociale</option>
                      <option value="Direction de groupe / régionale">Direction de groupe / régionale</option>
                      <option value="Cadre de santé / IDEC">Cadre de santé / IDEC</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div className="champ">
                    <label htmlFor="f-etab">Établissement ou groupe</label>
                    <input
                      id="f-etab"
                      type="text"
                      value={etab}
                      onChange={(e) => setEtab(e.target.value)}
                      required
                      placeholder="Ex: Les Tilleuls"
                      autoComplete="organization"
                    />
                  </div>
                  <div className="champ">
                    <label htmlFor="f-email">E-mail professionnel</label>
                    <input
                      id="f-email"
                      type="email"
                      ref={emailInputRef}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(false);
                      }}
                      required
                      style={{ borderColor: emailError ? '#A4413B' : undefined }}
                      placeholder="claire@residence.fr"
                      autoComplete="email"
                    />
                  </div>
                  <button
                    className="btn btn-or"
                    id="f-envoyer"
                    type="submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Envoi en cours...' : 'Planifier ma démonstration'}
                  </button>
                  <p className="rgpd">Vos coordonnées servent uniquement à vous recontacter au sujet de cette demande.</p>
                </form>
              ) : (
                <div className="merci" id="merci" style={{ display: 'block' }}>
                  <p className="plume">Merci !</p>
                  <p>Votre demande est bien notée. Un membre de l'équipe MyMémoires vous écrit sous 24 h ouvrées.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-in">
          <a className="logo" href="#"><span className="mot">My<em>Mémoires</em></span></a>
          <ul className="footer-links">
            <li><a href="#methode">Comment ça marche</a></li>
            <li><a href="#confiance">IA &amp; conformité</a></li>
            <li><a href="#">Particuliers</a></li>
            <li><a href="#demo">Contact</a></li>
          </ul>
          <span>© 2026 MyMémoires</span>
        </div>
        <SoutienLamarck />
      </footer>
    </>
  );
};

export default LandingPage;

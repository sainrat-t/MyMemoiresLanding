import React, { useState } from 'react';

const SvgIllustration: React.FC = () => (
  // Drop-shadow is kept but adjusted to not clip
  <svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[0_10px_30px_rgba(79,77,76,0.08)]">
    <defs>
      <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#4F4D4C" floodOpacity="0.06" />
      </filter>

      <filter id="blur-lg" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="40" />
      </filter>

      {/* Gradients */}
      <linearGradient id="stream-pink" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#E5C5C5" stopOpacity="0" />
        <stop offset="20%" stopColor="#E5C5C5" stopOpacity="1" />
        <stop offset="80%" stopColor="#E5C5C5" stopOpacity="1" />
        <stop offset="100%" stopColor="#E5C5C5" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="stream-purple" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#C2BDE0" stopOpacity="0" />
        <stop offset="20%" stopColor="#C2BDE0" stopOpacity="1" />
        <stop offset="80%" stopColor="#C2BDE0" stopOpacity="1" />
        <stop offset="100%" stopColor="#C2BDE0" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="stream-green" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#A3C6A4" stopOpacity="0" />
        <stop offset="20%" stopColor="#A3C6A4" stopOpacity="1" />
        <stop offset="80%" stopColor="#A3C6A4" stopOpacity="1" />
        <stop offset="100%" stopColor="#A3C6A4" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="stream-yellow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#E2C792" stopOpacity="0" />
        <stop offset="20%" stopColor="#E2C792" stopOpacity="1" />
        <stop offset="80%" stopColor="#E2C792" stopOpacity="1" />
        <stop offset="100%" stopColor="#E2C792" stopOpacity="0" />
      </linearGradient>

      <style>{`
        .bg-color { fill: transparent; }
        .dark-stroke { stroke: #4F4D4C; }
        
        .draw {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawLine 12s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
        }

        @keyframes drawLine {
          0%, 5% { stroke-dashoffset: 200; opacity: 0; }
          10% { opacity: 1; }
          25%, 80% { stroke-dashoffset: 0; opacity: 1; }
          85%, 100% { stroke-dashoffset: -200; opacity: 0; }
        }

        .fade-up {
          animation: fadeUpAnim 12s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
          transform-origin: center;
        }

        @keyframes fadeUpAnim {
          0%, 20% { opacity: 0; transform: translateY(16px); }
          30%, 80% { opacity: 1; transform: translateY(0); }
          90%, 100% { opacity: 0; transform: translateY(-16px); }
        }

        .float {
          animation: hoverFloat 8s ease-in-out infinite;
        }

        @keyframes hoverFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }

        .flow {
          animation: streamFlow 2s linear infinite;
        }

        @keyframes streamFlow {
          to { stroke-dashoffset: -36; }
        }

        .eq-bar {
          transform-box: fill-box;
          transform-origin: center;
          animation: eqBounce 1.5s ease-in-out infinite alternate;
        }

        @keyframes eqBounce {
          0% { transform: scaleY(0.4); opacity: 0.6; }
          100% { transform: scaleY(1); opacity: 1; }
        }

        .pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: lightPulse 3s ease-in-out infinite;
        }

        @keyframes lightPulse {
          0%, 100% { transform: scale(0.85); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .twinkle {
          transform-box: fill-box;
          transform-origin: center;
          animation: twinkleAnim 5s ease-in-out infinite;
        }

        @keyframes twinkleAnim {
          0%, 100% { transform: scale(0.5) rotate(0deg); opacity: 0.2; }
          50% { transform: scale(1.1) rotate(45deg); opacity: 0.9; }
        }
      `}</style>
    </defs>

    <rect width="100%" height="100%" className="bg-color" />

    {/* Forms ambiantes internes au SVG */}
    <circle cx="150" cy="150" r="180" fill="#E5C5C5" opacity="0.10" filter="url(#blur-lg)" />
    <circle cx="850" cy="450" r="220" fill="#A3C6A4" opacity="0.08" filter="url(#blur-lg)" />
    <circle cx="500" cy="500" r="160" fill="#E2C792" opacity="0.06" filter="url(#blur-lg)" />

    <g id="microphone-system">
      <g className="eq">
        <rect x="136" y="180" width="6" height="20" rx="3" fill="#E5C5C5" className="eq-bar" style={{ animationDelay: '0.1s' }} />
        <rect x="148" y="165" width="6" height="50" rx="3" fill="#C2BDE0" className="eq-bar" style={{ animationDelay: '0.4s' }} />
        <rect x="160" y="150" width="6" height="80" rx="3" fill="#A3C6A4" className="eq-bar" style={{ animationDelay: '0.2s' }} />
        <rect x="172" y="170" width="6" height="40" rx="3" fill="#E2C792" className="eq-bar" style={{ animationDelay: '0.5s' }} />
      </g>

      <rect x="165" y="380" width="90" height="6" rx="3" fill="#B5ADA6" />
      <line x1="210" y1="380" x2="210" y2="280" stroke="#B5ADA6" strokeWidth="6" strokeLinecap="round" />

      <path d="M 180 230 A 30 30 0 0 0 240 230" fill="none" stroke="#8A8582" strokeWidth="4" strokeLinecap="round" />
      <circle cx="180" cy="230" r="4.5" fill="#8A8582" />
      <circle cx="240" cy="230" r="4.5" fill="#8A8582" />

      <rect x="190" y="140" width="40" height="100" rx="20" fill="#FFFFFF" className="dark-stroke" strokeWidth="2.5" filter="url(#soft-shadow)" />

      <line x1="190" y1="185" x2="230" y2="185" className="dark-stroke" strokeWidth="2.5" />

      <circle cx="210" cy="215" r="4" fill="#D1A3A4" className="pulse" />
    </g>

    <g id="memory-streams">
      <path d="M 235 170 C 320 120, 420 180, 540 220" fill="none" stroke="url(#stream-pink)" strokeWidth="5" strokeLinecap="round" strokeDasharray="12 24" className="flow" />
      <path d="M 235 185 C 380 130, 480 300, 750 220" fill="none" stroke="url(#stream-purple)" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 20" className="flow" style={{ animationDelay: '-0.5s' }} />
      <path d="M 235 200 C 350 250, 420 280, 540 290" fill="none" stroke="url(#stream-green)" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="10 22" className="flow" style={{ animationDelay: '-1.0s' }} />
      <path d="M 235 215 C 380 350, 520 380, 750 350" fill="none" stroke="url(#stream-yellow)" strokeWidth="4" strokeLinecap="round" strokeDasharray="14 26" className="flow" style={{ animationDelay: '-0.2s' }} />

      <path d="M 330 116 L 330 124 M 326 120 L 334 120" stroke="#D1A3A4" strokeWidth="2" strokeLinecap="round" className="twinkle" style={{ animationDelay: '0s' }} />
      <circle cx="480" cy="180" r="3" fill="#C2BDE0" className="twinkle" style={{ animationDelay: '1.2s' }} />
      <path d="M 400 306 L 400 314 M 396 310 L 404 310" stroke="#E2C792" strokeWidth="2" strokeLinecap="round" className="twinkle" style={{ animationDelay: '2.5s' }} />
      <circle cx="600" cy="140" r="3.5" fill="#A3C6A4" className="twinkle" style={{ animationDelay: '0.7s' }} />
    </g>

    <g className="float">
      <rect x="520" y="140" width="420" height="320" rx="20" fill="#FFFFFF" filter="url(#soft-shadow)" />
      <line x1="730" y1="140" x2="730" y2="460" stroke="#F4F1EE" strokeWidth="1.5" />

      <g id="left-page-content">
        <line x1="572" y1="190" x2="618" y2="190" stroke="#E5C5C5" strokeWidth="24" strokeLinecap="round" className="draw" style={{ animationDelay: '0.5s' }} />
        <line x1="578" y1="190" x2="602" y2="190" stroke="#B58B8C" strokeWidth="4" strokeLinecap="round" className="draw" style={{ animationDelay: '0.7s' }} />

        <line x1="656" y1="190" x2="692" y2="190" stroke="#D3E0D4" strokeWidth="24" strokeLinecap="round" className="draw" style={{ animationDelay: '0.9s' }} />
        <line x1="662" y1="190" x2="682" y2="190" stroke="#8DAA8E" strokeWidth="4" strokeLinecap="round" className="draw" style={{ animationDelay: '1.1s' }} />

        <line x1="568" y1="240" x2="672" y2="240" stroke="#4F4D4C" strokeWidth="16" strokeLinecap="round" className="draw" style={{ animationDelay: '1.5s' }} />

        <line x1="564" y1="280" x2="696" y2="280" stroke="#A8A3A1" strokeWidth="6" strokeLinecap="round" className="draw" style={{ animationDelay: '2.0s' }} />
        <line x1="564" y1="304" x2="666" y2="304" stroke="#A8A3A1" strokeWidth="6" strokeLinecap="round" className="draw" style={{ animationDelay: '2.2s' }} />
        <line x1="564" y1="328" x2="686" y2="328" stroke="#A8A3A1" strokeWidth="6" strokeLinecap="round" className="draw" style={{ animationDelay: '2.4s' }} />
        <line x1="564" y1="352" x2="636" y2="352" stroke="#A8A3A1" strokeWidth="6" strokeLinecap="round" className="draw" style={{ animationDelay: '2.6s' }} />

        <line x1="562" y1="386" x2="600" y2="386" stroke="#DCD8D5" strokeWidth="4" strokeLinecap="round" className="draw" style={{ animationDelay: '2.8s' }} />
      </g>

      <g id="right-page-content">
        <g className="fade-up" style={{ animationDelay: '2.5s' }}>
          <rect x="750" y="174" width="160" height="110" rx="12" fill="#F4F1EE" />
          <path d="M 750 240 Q 790 200 840 240 T 910 210 L 910 284 L 750 284 Z" fill="#E1E0F5" />
          <path d="M 750 260 Q 810 230 860 270 T 910 250 L 910 284 L 750 284 Z" fill="#C2BDE0" opacity="0.6" />
        </g>

        <line x1="756" y1="316" x2="844" y2="316" stroke="#4F4D4C" strokeWidth="10" strokeLinecap="round" className="draw" style={{ animationDelay: '3.2s' }} />

        <line x1="754" y1="344" x2="886" y2="344" stroke="#A8A3A1" strokeWidth="6" strokeLinecap="round" className="draw" style={{ animationDelay: '3.5s' }} />
        <line x1="754" y1="364" x2="846" y2="364" stroke="#A8A3A1" strokeWidth="6" strokeLinecap="round" className="draw" style={{ animationDelay: '3.7s' }} />

        <line x1="764" y1="410" x2="836" y2="410" stroke="#D1A3A4" strokeWidth="24" strokeLinecap="round" className="draw" style={{ animationDelay: '4.2s' }} />
        <line x1="778" y1="410" x2="816" y2="410" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" className="draw" style={{ animationDelay: '4.5s' }} />
      </g>
    </g>
  </svg >
);

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'submitted'>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      if (response.ok) {
        setStatus('submitted');
      } else {
        // En cas d'erreur de l'API (ex: mauvais mot de passe SMTP sur Vercel)
        console.error('Erreur lors de la souscription');
        setStatus('idle');
        alert("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      setStatus('idle');
      alert("Impossible de joindre le serveur. Veuillez vérifier votre connexion.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (status === 'submitted') {
      setStatus('idle');
      setEmail('');
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F4F1EE] overflow-x-hidden relative font-sans selection:bg-[#E5C5C5] selection:text-[#4F4D4C]">

      {/* --- AMBIENT BLOBS --- */}
      {/* Conservés de manière absolue en plein écran pour la douceur */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-32 sm:left-1/4 w-[28rem] h-[28rem] bg-[#E5C5C5] rounded-full mix-blend-multiply blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 lg:right-1/4 w-[32rem] h-[32rem] bg-[#E1E0F5] rounded-full mix-blend-multiply blur-[120px] opacity-50" style={{ animation: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite 1s' }}></div>
        <div className="absolute -bottom-20 left-1/2 w-[24rem] h-[24rem] bg-[#C2BDE0] rounded-full mix-blend-multiply blur-[90px] opacity-35 transform -translate-x-1/2"></div>
      </div>

      {/* --- MAIN LAYOUT : Text overlaps Illustration on Mobile --- */}
      <div className="relative z-10 w-full min-h-[100dvh] flex flex-col lg:flex-row items-center max-w-7xl mx-auto">

        {/* --- LEFT COL : TEXT AND FORM --- */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 pt-24 lg:pt-0 pb-32 lg:pb-0 z-30">

          <div className="max-w-[540px] w-full mt-4 lg:mt-0">
            {/* Badge Bientôt disponible */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 text-[13px] font-medium tracking-wide text-[#3A3837] bg-white/50 rounded-full border border-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5C5C5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D1A3A4]"></span>
              </span>
              Bientôt disponible
            </div>

            {/* Titre Principal */}
            <h1 className="text-[3rem] xs:text-[3.5rem] sm:text-[4rem] lg:text-[4.5rem] font-serif text-[#3A3837] mb-6 leading-[1.05] tracking-tight relative">
              <span className="relative z-10">
                Préservez votre <br />
                histoire, <br className="hidden sm:block" />
                <span className="text-[#C2BDE0] italic font-light relative">
                  simplement
                  <span className="absolute -bottom-2 lg:-bottom-3 left-0 w-full h-2 lg:h-3 bg-[#E1E0F5]/50 -z-10 rounded-sm skew-x-[-12deg]"></span>
                </span>.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-[21px] text-[#4F4D4C]/75 mb-10 max-w-[480px] leading-[1.6] font-light">
              MyMémoires vous accompagne dans l'écriture de votre vie. Capturez vos anecdotes pour créer un héritage inestimable, prêt à être transmis.
            </p>

            {/* Bouton d'action principal */}
            <div className="w-full relative group z-20 mt-4">
              <div className="relative w-full max-w-[420px]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#3A3837] text-white py-4 px-6 rounded-2xl md:rounded-full font-medium text-[15.5px] tracking-wide shadow-[0_4px_15px_rgba(58,56,55,0.15)] hover:bg-[#2A2928] hover:shadow-[0_6px_20px_rgba(58,56,55,0.25)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                >
                  S'inscrire à l'avant-première
                  <svg className="w-5 h-5 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>


          </div>
        </div>

        {/* --- RIGHT COL (ILLUSTRATION) --- */}
        {/* On Mobile: Absolute, fading behind the content at bottom right */}
        {/* On Desktop: Normal right column behavior */}
        <div className="absolute lg:relative right-0 bottom-0 lg:bottom-auto w-full lg:w-[45%] h-[50vh] lg:h-full flex items-end lg:items-center justify-end lg:justify-center overflow-hidden lg:overflow-visible z-10 pointer-events-none lg:pointer-events-auto opacity-40 lg:opacity-100">

          {/* Fading mask on mobile to blend the SVG up into the background */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#F4F1EE] lg:hidden z-20"></div>

          <div className="relative w-full max-w-[130%] sm:max-w-lg lg:max-w-[45rem] transform translate-y-1/4 translate-x-[15%] lg:translate-y-0 lg:translate-x-0 transition-transform duration-1000 ease-out lg:hover:scale-[1.02]">
            <SvgIllustration />
          </div>

        </div>

      </div>

      {/* --- POP-IN MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto w-full min-h-screen">

          {/* Overlay flouté (Backdrop) */}
          <div
            className="fixed inset-0 bg-[#F4F1EE]/60 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
            onClick={closeModal}
          ></div>

          {/* Modal Container */}
          <div className="relative w-full max-w-[480px] bg-white/70 backdrop-blur-2xl rounded-[32px] sm:rounded-[36px] border border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.06),0_1px_3px_rgba(255,255,255,0.4)_inset] overflow-hidden my-auto animate-in zoom-in-95 fade-in duration-300 slide-in-from-bottom-4">

            {/* Bouton Fermer */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-black/40 hover:text-black/80 transition-colors z-20"
              aria-label="Fermer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Contenu */}
            <div className="p-8 sm:p-10 relative z-10">

              {/* Effet lumineux décoratif dans la modale */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#E5C5C5] rounded-full mix-blend-multiply filter blur-[50px] opacity-40 pointer-events-none"></div>

              {status === 'submitted' ? (
                /* ÉTAPE SUCCÈS */
                <div className="text-center animate-in fade-in zoom-in-95 duration-500 py-6">
                  <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-50/50 mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif text-[#3A3837] mb-3">
                    Bientôt avec nous !
                  </h3>
                  <p className="text-[16px] text-[#4F4D4C]/80 leading-relaxed mb-8 font-light">
                    Merci <span className="font-medium text-[#4F4D4C]">{firstName}</span> ! Votre inscription est bien confirmée. Vous recevrez un e-mail prochainement.
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-full bg-white text-[#3A3837] border border-black/10 py-3.5 px-6 rounded-2xl font-medium text-[15px] shadow-sm hover:bg-gray-50 hover:border-black/20 transition-all hover:shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                /* FORMULAIRE */
                <div className="animate-in fade-in duration-500 relative">
                  <h2 className="text-[28px] leading-[1.1] font-serif text-[#3A3837] mb-3 pr-6">
                    Rejoignez l'aventure
                  </h2>
                  <p className="text-[15.5px] text-[#4F4D4C]/70 mb-8 font-light pr-4 leading-relaxed">
                    Laissez-nous vos coordonnées pour être informé en priorité du lancement de MyMémoires.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Prénom */}
                      <div className="flex-1 relative group/input">
                        <label htmlFor="firstName" className="sr-only">Prénom</label>
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4F4D4C]/30 group-focus-within/input:text-[#4F4D4C]/70 transition-colors">
                          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Prénom"
                          required
                          className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white/60 border border-white/60 hover:border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_1px_1px_rgba(255,255,255,1)_inset] text-[15px] text-[#3A3837] placeholder:text-[#4F4D4C]/40 focus:outline-none focus:ring-2 focus:ring-[#E5C5C5] focus:bg-white/90 focus:border-transparent transition-all font-light"
                        />
                      </div>

                      {/* Nom */}
                      <div className="flex-1 relative group/input">
                        <label htmlFor="lastName" className="sr-only">Nom</label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Nom"
                          required
                          className="w-full px-4 py-3.5 rounded-2xl bg-white/60 border border-white/60 hover:border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_1px_1px_rgba(255,255,255,1)_inset] text-[15px] text-[#3A3837] placeholder:text-[#4F4D4C]/40 focus:outline-none focus:ring-2 focus:ring-[#E5C5C5] focus:bg-white/90 focus:border-transparent transition-all font-light"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative mt-1 group/input">
                      <label htmlFor="email" className="sr-only">Adresse e-mail</label>
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4F4D4C]/30 group-focus-within/input:text-[#4F4D4C]/70 transition-colors">
                        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Thibaut@exemple.com"
                        required
                        className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white/60 border border-white/60 hover:border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.02),0_1px_1px_rgba(255,255,255,1)_inset] text-[15px] text-[#3A3837] placeholder:text-[#4F4D4C]/40 focus:outline-none focus:ring-2 focus:ring-[#E5C5C5] focus:bg-white/90 focus:border-transparent transition-all font-light"
                      />
                    </div>

                    {/* Bouton Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full mt-4 bg-[#3A3837] text-white py-3.5 px-6 rounded-2xl md:rounded-full font-medium text-[15.5px] tracking-wide shadow-[0_4px_12px_rgba(58,56,55,0.15)] hover:bg-[#2A2928] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-3 group/submit"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Inscription en cours...
                        </>
                      ) : (
                        <>
                          Valider mon inscription
                          <svg className="w-4 h-4 opacity-70 group-hover/submit:opacity-100 group-hover/submit:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="text-center text-[12.5px] text-[#4F4D4C]/40 mt-3 font-light flex items-center justify-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Vos données resteront confidentielles.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

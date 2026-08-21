# MyMémoires

> **Vous écoutez, l'IA tient la plume.**  
> *La biographie de vos aînés, racontée en famille.*

[![Site Web](https://img.shields.io/badge/Site-mymemoires.com-8A3B43?style=flat-square)](https://www.mymemoires.com/)
[![EHPAD](https://img.shields.io/badge/Espace-EHPAD-B6953F?style=flat-square)](https://www.mymemoires.com/ehpad)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## Concept

[MyMémoires](https://www.mymemoires.com/) est une application mobile qui transforme les souvenirs racontés par vos aînés (parents, grands-parents, proches) en une biographie complète imprimée en livre relié.

Personne ne recueille seul toute une vie : **MyMémoires est pensé pour le cercle familial**. Frères, sœurs, enfants et petits-enfants peuvent chacun enregistrer un souvenir lors de leurs visites depuis leur propre téléphone grâce à un simple code partagé.

- **Un écran, un geste :** Une interface « cassette » épurée à touche unique. Aucun menu complexe pour l'aîné : on enfonce la touche, on laisse parler, on relève. Des questions suggérées dynamiques aident à amorcer et relancer la conversation.
- **L'IA tient la plume :** Les enregistrements oraux sont automatiquement transcrits, nettoyés et rédigés en de véritables chapitres littéraires classés dans la chronologie de la vie. Personne dans la famille n'a une seule ligne à rédiger.
- **Un livre relié d'artisan :** À la fin du recueil, les souvenirs prennent corps dans un véritable livre imprimé (reliure toilée cousue, titre doré à la feuille d'or, dédicace collective) ainsi qu'une version numérique accessible à toute la famille.
- **Déclinaison pour les établissements :** MyMémoires propose également une solution dédiée aux **EHPAD et résidences seniors** ([mymemoires.com/ehpad](https://www.mymemoires.com/ehpad)) pour valoriser l'histoire de vie des résidents et nourrir les projets personnalisés d'accompagnement sans surcharger les équipes soignantes.

---

## Pourquoi ce projet ?

Je me suis lancé dans l'aventure **MyMémoires** avec la volonté de *vibe coder* un produit complet de A à Z : de la genèse de l'idée et du design UI/UX jusqu'à la mise en production et au déploiement sur les stores, en passant par le traitement de la voix par IA et la conception de l'infrastructure.

Ce projet répond avant tout à une conviction personnelle et humaine profonde : **la mémoire de nos aînés est un patrimoine précieux qui s'efface trop vite**. Nous avons tous envie de connaître et de garder les récits de jeunesse de nos parents et grands-parents, mais le manque de temps ou la difficulté d'écrire un livre font souvent obstacle. MyMémoires met la technologie et l'intelligence artificielle au service de ce qui compte vraiment : l'écoute, le lien intergénérationnel et la transmission.

---

## Ce que vous confiez (Éthique & Souveraineté)

Une vie racontée ne se prête pas. MyMémoires est bâti sur des principes stricts de confidentialité :

- 🇫🇷 **Hébergement en France :** Vos enregistrements vocaux, textes et photos sont stockés sur des serveurs sécurisés en France.
- 🇪🇺 **IA souveraines européennes :** La transcription et la mise en page reposent sur des modèles souverains. Vos récits familiaux ne sont **jamais** utilisés pour entraîner des modèles publics d'IA.
- 🔒 **Cercle étanche & Propriété exclusive :** Le livre et les données appartiennent exclusivement à la famille. Les données restent strictement cloisonnées et peuvent être exportées ou supprimées à tout moment.

---

## Découvrir MyMémoires

- **Site officiel (Grand public) :** [mymemoires.com](https://www.mymemoires.com/)
- **Espace Professionnels (EHPAD & Résidences) :** [mymemoires.com/ehpad](https://www.mymemoires.com/ehpad)
- **Applications iOS & Android :** Bientôt disponibles sur l'App Store et Google Play (inscriptions ouvertes sur la liste d'attente).

---

## Stack technique

Le projet global MyMémoires s'articule autour de plusieurs briques :

1. **Application Mobile (iOS & Android) :** Conçue pour offrir une expérience fluide de studio vocal à touche unique et un espace de lecture partagé pour la famille.
2. **Moteur IA & Traitement Audio :**
   - Modèles européens souverains de Speech-to-Text (reconnaissance vocale haute fidélité).
   - Pipeline de structuration éditoriale, correction contextuelle et chapitrage chronologique.
3. **Site vitrine & Landing pages (ce dépôt) :**
   - **Frontend :** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/), [Tailwind CSS](https://tailwindcss.com/).
   - **Backend Serverless :** Route API Vercel (`demo/api/subscribe.js`) traitant les inscriptions à l'avant-première et les demandes de démo EHPAD.
   - **Transport Transactionnel :** Envoi d'e-mails sécurisé via SMTP OVH/Zimbra avec [Nodemailer](https://nodemailer.com/).

---

## Site vitrine (ce dépôt)

Ce dépôt contient le code source du site de présentation officiel de MyMémoires ([mymemoires.com](https://www.mymemoires.com/)), comprenant la landing page grand public (B2C) et la landing page dédiée aux établissements EHPAD (B2B).

### Structure du dépôt

```text
.
├── DEPLOIEMENT.md        # Guide de déploiement (Vercel / Render / SMTP)
├── README.md             # Ce fichier
└── demo/                 # Application web Vite + React + TypeScript
    ├── api/              # Serverless functions (inscription / contact)
    ├── public/           # Favicon, logos et assets statiques
    ├── src/              # Composants React (LandingB2C, LandingPage EHPAD, etc.)
    ├── index.html        # Point d'entrée B2C
    ├── ehpad.html        # Point d'entrée EHPAD
    └── package.json      # Scripts et dépendances
```

---

## Démarrer en local

### Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- `npm` (inclus avec Node.js)

### Installation et lancement

1. Accédez au dossier de l'application :
   ```bash
   cd demo
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

4. Ouvrez votre navigateur sur [http://localhost:5173](http://localhost:5173) (ou l'URL affichée dans le terminal).
   - Page Grand Public : `http://localhost:5173/`
   - Page EHPAD : `http://localhost:5173/ehpad.html`

### Build de production

Pour tester le build de production localement :

```bash
cd demo
npm run build
npm run preview
```

---

## Déploiement

Le site est optimisé pour être déployé sur **Vercel** ou **Render**.

Pour que l'envoi d'e-mails d'inscription et de confirmation fonctionne via la fonction serverless (`/api/subscribe`), configurez les variables d'environnement suivantes sur votre plateforme d'hébergement :

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| `SMTP_HOST` | Serveur hôte SMTP | `ssl0.ovh.net` |
| `SMTP_PORT` | Port sécurisé SSL | `465` |
| `SMTP_USER` | Adresse e-mail d'envoi | `thibaut@mymemoires.com` |
| `SMTP_PASS` | Mot de passe de la boîte e-mail | `••••••••••••` |

Pour plus de détails, consultez le guide dédié : [DEPLOIEMENT.md](file:///Users/thibautsainrat/MyMémoires%20Landing/DEPLOIEMENT.md).

---

## Réseaux & Contact

- **Fondateur :** Thibaut Sainrat ([thibaut@mymemoires.com](mailto:thibaut@mymemoires.com))
- **LinkedIn :** [linkedin.com/company/mymemoires](https://www.linkedin.com/company/mymemoires/)
- **Instagram :** [@mymemoires](https://www.instagram.com/mymemoires/)
- **Facebook :** [MyMémoires](https://www.facebook.com/people/MyM%C3%A9moires/61588279568861/)
- **Soutien & Partenaire :** Créé avec le soutien du [Studio Lamarck](https://studiolamarck.fr)

---

*© 2026 MyMémoires. Tous droits réservés.*

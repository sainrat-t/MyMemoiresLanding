# Déployer MyMémoires Landing Page

Ce document explique comment héberger la landing page sur de l'hébergement gratuit et performant comme **Vercel** ou **Render**.

Le projet est construit avec **Vite + React + Tailwind CSS**.

---

## Option 1 : Déploiement sur Vercel (Recommandé, le plus simple)

Vercel est optimisé pour les projets Vite/React et offre une URL en `.vercel.app` nativement avec SSL (HTTPS).

### Prérequis
1. Avoir un compte sur [GitHub](https://github.com/), [GitLab](https://gitlab.com/) ou [Bitbucket](https://bitbucket.org/).
2. Avoir poussé le code source de la landing page sur un dépôt (repository) sur l'une de ces plateformes.

### Étapes de déploiement
1. Connectez-vous à [Vercel](https://vercel.com/) et cliquez sur **"Add New..."** puis **"Project"**.
2. Liez votre compte GitHub/GitLab et importez le dépôt contenant le code.
3. Vercel détectera automatiquement qu'il s'agit d'un projet Vite.
4. Laissez les paramètres de construction (Build Settings) par défaut :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build` ou `vite build`
   - **Output Directory** : `dist`
5. Cliquez sur **Deploy**.
6. En quelques secondes, votre site sera en ligne ! Vous pourrez ensuite configurer un nom de domaine personnalisé (ex: `mymemoires.com`) dans l'onglet "Settings > Domains" de Vercel.

---

## Option 2 : Déploiement sur Render

Render est une excellente alternative gratuite pour l'hébergement de sites statiques.

### Étapes de déploiement
1. Créez un compte sur [Render](https://render.com/).
2. Cliquez sur **"New"** et sélectionnez **"Static Site"**.
3. Connectez votre dépôt GitHub ou GitLab contenant le code source.
4. Remplissez les informations de configuration :
   - **Name** : `mymemoires-landing` (ou le nom de votre choix)
   - **Build Command** : `npm install && npm run build`
   - **Publish directory** : `dist`
5. Cliquez sur **Create Static Site**.
6. Render va construire le projet et le mettre en ligne sur une URL en `.onrender.com`. Comme sur Vercel, vous pouvez ajouter votre propre nom de domaine dans les paramètres (Settings > Custom Domains).

---

## Configuration de l'Email Backend (SMTP OVH / Zimbra)

Le formulaire d'inscription envoie les données à une **Serverless Function** sur Vercel (`demo/api/subscribe.js`). Ce mini-serveur intégré utilise vos identifiants SMTP OVH/Zimbra pour envoyer les e-mails de façon professionnelle (un e-mail à vous, un e-mail à l'inscrit).

Pour que cela fonctionne lors du déploiement sur Vercel, vous **DEVEZ** configurer vos variables d'environnement secrètes :

1. Allez sur votre projet dans Vercel.
2. Cliquez sur l'onglet **Settings** puis **Environment Variables** sur le menu de gauche.
3. Ajoutez les 4 variables suivantes :
   - **Nom :** `SMTP_HOST` | **Valeur :** `ssl0.ovh.net` (ou l'hôte de votre fournisseur)
   - **Nom :** `SMTP_PORT` | **Valeur :** `465`
   - **Nom :** `SMTP_USER` | **Valeur :** `thibaut@mymemoires.com` (votre adresse email Zimbra/OVH)
   - **Nom :** `SMTP_PASS` | **Valeur :** `VotreMotDePasseZimbra`
4. Cliquez sur **Save** pour enregistrer chaque variable.
5. Une fois les variables ajoutées, il faut **redéployer** le site (Allez dans l'onglet *Deployments*, cliquez sur les 3 petits points du dernier déploiement, et choisissez *Redeploy*).

Votre backend d'inscription est désormais fonctionnel et ultra-sécurisé !

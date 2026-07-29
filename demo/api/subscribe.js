import nodemailer from 'nodemailer';

/**
 * Une seule fonction pour les deux formulaires du site.
 *
 *   Page particuliers (racine)      → envoie firstName / lastName / email
 *   Page établissements (/ehpad)    → envoie nom / fonction / etab / email
 *
 * Le comportement de la page particuliers est celui déjà en production :
 * mêmes champs obligatoires, mêmes objets et mêmes contenus d'e-mails.
 * La page EHPAD se greffe dessus avec ses propres textes, sur le même
 * transporteur SMTP OVH.
 */
export default async function handler(req, res) {
    // Seules les requêtes POST sont acceptées
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { nom, fonction, etab, email, firstName, lastName, actus } = req.body;

    // Le formulaire EHPAD est le seul à envoyer ces champs.
    const estDemandeEhpad = Boolean(nom || fonction || etab);

    if (estDemandeEhpad) {
        if (!email || !nom || !etab) {
            return res.status(400).json({ message: 'Le nom, l\'établissement et l\'adresse e-mail sont obligatoires.' });
        }
    } else if (!email || !firstName || !lastName) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    try {
        // Configuration du transporteur SMTP avec les variables d'environnement Vercel
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'ssl0.ovh.net', // Serveur SMTP OVH/Zimbra par défaut
            port: parseInt(process.env.SMTP_PORT) || 465,  // Port sécurisé SSL
            secure: true,
            auth: {
                user: process.env.SMTP_USER, // Adresse email OVH (ex: thibaut@mymemoires.com)
                pass: process.env.SMTP_PASS, // Mot de passe de la boîte mail
                // Note: Ces variables d'environnement doivent être configurées dans la console Vercel.
            },
        });

        let mailToAdmin;
        let mailToUser;

        if (estDemandeEhpad) {
            const finalFonction = fonction || 'Non spécifiée';

            // 1. E-mail de notification pour l'administrateur (Thibaut)
            mailToAdmin = {
                from: `"MyMémoires Landing" <${process.env.SMTP_USER}>`,
                to: process.env.SMTP_USER, // L'e-mail est envoyé à toi-même
                subject: `Nouvelle demande EHPAD : ${nom} (${etab})`,
                html: `
        <h2>Nouvelle demande de démonstration EHPAD ! 🎉</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Fonction :</strong> ${finalFonction}</p>
        <p><strong>Établissement / Groupe :</strong> ${etab}</p>
        <p><strong>E-mail professionnel :</strong> ${email}</p>
      `,
            };

            // 2. E-mail de confirmation pour le visiteur
            mailToUser = {
                from: `"MyMémoires" <${process.env.SMTP_USER}>`,
                to: email,
                subject: `Confirmation de demande de démonstration - MyMémoires`,
                html: `
        <div style="font-family: sans-serif; color: #1E2749; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ECE7DA; border-radius: 8px; background-color: #FDFCF8;">
          <h2 style="color: #B6953F; font-family: Georgia, serif; font-style: italic;">Bonjour ${nom},</h2>
          <p>Merci de l'intérêt que vous portez à <strong>MyMémoires</strong> !</p>
          <p>Nous vous confirmons que votre demande de démonstration pour l'établissement <strong>${etab}</strong> a bien été enregistrée.</p>
          <p>Un membre de l'équipe MyMémoires vous recontactera sous 24 h ouvrées pour planifier la visio de présentation de l'application.</p>
          <p>À très bientôt,</p>
          <p><strong>Thibaut de MyMémoires</strong></p>
        </div>
      `,
            };
        } else {
            // Consentement aux actualités : coché ou non par le visiteur. Cette
            // notification est la seule trace du choix, aucune base n'étant
            // encore branchée — d'où la date, qui fait office d'horodatage.
            const consentActus = actus === true;

            // 1. E-mail de notification pour toi (Thibaut)
            mailToAdmin = {
                from: `"MyMémoires Landing" <${process.env.SMTP_USER}>`,
                to: process.env.SMTP_USER, // L'e-mail est envoyé à toi-même
                subject: `Nouvelle inscription : ${firstName} ${lastName}${consentActus ? ' — actualités OK' : ''}`,
                html: `
        <h2>Nouvelle inscription sur la liste d'attente ! 🎉</h2>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Nom :</strong> ${lastName}</p>
        <p><strong>E-mail :</strong> ${email}</p>
        <p><strong>Actualités du projet :</strong> ${consentActus ? 'ACCEPTÉES' : 'refusées — alerte de lancement uniquement'}</p>
        <p style="color:#6B6F80;font-size:13px">Consentement recueilli le ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>
      `,
            };

            // 2. E-mail de confirmation pour le visiteur
            mailToUser = {
                from: `"MyMémoires" <${process.env.SMTP_USER}>`,
                to: email,
                subject: `Confirmation d'inscription - MyMémoires`,
                html: `
        <div style="font-family: sans-serif; color: #3A3837; line-height: 1.6;">
          <h2 style="color: #B58B8C;">Bonjour ${firstName},</h2>
          <p>Merci de l'intérêt que vous portez à <strong>MyMémoires</strong> !</p>
          <p>Nous vous confirmons que votre inscription sur notre liste d'attente a bien été prise en compte. Dès notre lancement officiel, vous serez parmi les premières personnes à être informées.</p>
          ${consentActus
                    ? `<p>Vous avez également accepté de recevoir nos actualités : nous vous écrirons pour vous raconter où en est le projet. Un lien de désinscription figure dans chacun de ces envois.</p>`
                    : `<p>Vous ne recevrez rien d'autre que cet e-mail de lancement.</p>`}
          <p>À très bientôt,</p>
          <p><strong>Thibaut de MyMémoires</strong></p>
        </div>
      `,
            };
        }

        // Envoi des deux emails en parallèle
        await Promise.all([
            transporter.sendMail(mailToAdmin),
            transporter.sendMail(mailToUser)
        ]);

        // Retourne un succès au frontend
        return res.status(200).json({ success: true, message: 'Emails envoyés avec succès' });

    } catch (error) {
        console.error('Erreur SMTP:', error);
        return res.status(500).json({ success: false, message: 'Erreur lors de l’envoi de l’email' });
    }
}

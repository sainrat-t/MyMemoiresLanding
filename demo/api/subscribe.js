import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Seules les requêtes POST sont acceptées
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { firstName, lastName, email } = req.body;

    if (!email || !firstName || !lastName) {
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
            },
        });

        // 1. E-mail de notification pour toi (Thibaut)
        const mailToAdmin = {
            from: `"MyMémoires Landing" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // L'e-mail est envoyé à toi-même
            subject: `Nouvelle inscription : ${firstName} ${lastName}`,
            html: `
        <h2>Nouvelle inscription sur la liste d'attente ! 🎉</h2>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Nom :</strong> ${lastName}</p>
        <p><strong>E-mail :</strong> ${email}</p>
      `,
        };

        // 2. E-mail de confirmation pour le visiteur
        const mailToUser = {
            from: `"MyMémoires" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `Confirmation d'inscription - MyMémoires`,
            html: `
        <div style="font-family: sans-serif; color: #3A3837; line-height: 1.6;">
          <h2 style="color: #B58B8C;">Bonjour ${firstName},</h2>
          <p>Merci de l'intérêt que vous portez à <strong>MyMémoires</strong> !</p>
          <p>Nous vous confirmons que votre inscription sur notre liste d'attente a bien été prise en compte. Dès notre lancement officiel, vous serez parmi les premières personnes à être informées.</p>
          <p>À très bientôt,</p>
          <p><strong>Thibaut de MyMémoires</strong></p>
        </div>
      `,
        };

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

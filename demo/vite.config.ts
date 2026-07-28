import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // Deux pages, deux publics : chacune a son propre HTML, donc son propre
  // <title>, sa propre description et ses propres polices.
  //   index.html → racine, page particuliers (SEO)
  //   ehpad.html → /ehpad, page établissements (prospection)
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ehpad: resolve(__dirname, 'ehpad.html'),
      },
    },
  },
  plugins: [
    react(),
    {
      // En production, `cleanUrls` de Vercel sert ehpad.html sur /ehpad.
      // En développement, on reproduit ce comportement à la main.
      name: 'urls-propres',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const chemin = (req.url || '').split('?')[0].replace(/\/+$/, '')
          if (chemin === '/ehpad' || chemin === '/pro') {
            req.url = '/ehpad.html'
          }
          next()
        })
      },
    },
    {
      name: 'mock-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/subscribe' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                // Les deux formulaires du site passent par cet endpoint :
                // on affiche tel quel ce qui arrive, quels que soient les champs.
                const parsedBody = JSON.parse(body);
                const type = (parsedBody.nom || parsedBody.fonction || parsedBody.etab)
                  ? 'Demande de démonstration EHPAD'
                  : 'Inscription liste d\'attente (particuliers)';
                console.log(`\n[Vite Dev Server Mock API] ${type}`);
                Object.entries(parsedBody).forEach(([champ, valeur]) => {
                  console.log(`[Vite Dev Server Mock API]   ${champ}: ${valeur}`);
                });
                console.log('');
              } catch (e) {
                console.log('[Vite Dev Server Mock API] Received raw body:', body);
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Mock email sent successfully' }));
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})

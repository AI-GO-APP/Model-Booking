import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        rooms: resolve(__dirname, 'rooms.html'),
        'room-detail': resolve(__dirname, 'room-detail.html'),
        booking: resolve(__dirname, 'booking.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        confirmation: resolve(__dirname, 'confirmation.html'),
        about: resolve(__dirname, 'about.html'),
        facilities: resolve(__dirname, 'facilities.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        faq: resolve(__dirname, 'faq.html'),
        contact: resolve(__dirname, 'contact.html'),
        account: resolve(__dirname, 'account.html'),
        'not-found': resolve(__dirname, '404.html'),
        terms: resolve(__dirname, 'terms.html'),
        privacy: resolve(__dirname, 'privacy.html'),
      },
    },
  },
  server: {
    port: 5173,
  },
});

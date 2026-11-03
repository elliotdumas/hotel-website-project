/**
 * Informations factuelles de l'hôtel, indépendantes de la langue.
 * Source : site actuel (https://www.hotel-coulisses-du-theatre.com), relevé en novembre 2026.
 * Toute modification ici se répercute sur l'ensemble du site (pied de page, JSON-LD, contact…).
 */
export const hotel = {
  name: 'Hôtel Les Coulisses du Théâtre',
  shortName: 'Les Coulisses du Théâtre',
  stars: 3,
  url: 'https://www.hotel-coulisses-du-theatre.com',
  email: 'contact@hotel-coulisses.com',
  phones: [
    { display: '+33 (0)3 23 67 90 09', href: 'tel:+33323679009' },
    { display: '+33 (0)6 98 33 38 10', href: 'tel:+33698333810' },
  ],
  address: {
    street: '8 rue de la Comédie',
    postalCode: '02100',
    city: 'Saint-Quentin',
    region: 'Hauts-de-France',
    country: 'FR',
  },
  geo: { lat: 49.846108, lng: 3.286268 },
  rooms: 32,
  roomCategories: 6,
  apartments: 2,
  checkIn: '15:00',
  checkOut: '11:00',
  lateFeePerHour: 10,
  hours: {
    bar: { open: '06:30', close: '23:00' },
    breakfast: { open: '06:30', close: '10:30' },
    pool: { open: '09:00', close: '21:00' },
    dayUse: { open: '10:00', close: '16:00' },
  },
  prices: {
    breakfastAdult: 15,
    breakfastChild: 9,
    breakfastRoomService: 20,
    pet: 20,
    bikeHalfDay: 15,
    bikeDay: 20,
  },
  /**
   * Lien vers le moteur de réservation en ligne.
   * TODO: moteur de réservation non identifié sur le site actuel (les boutons pointent vers « # »).
   * Tant que la valeur est `null`, le formulaire « Réserver » envoie vers la page contact
   * avec les dates pré-remplies, et le téléphone est mis en avant.
   */
  bookingUrl: null as string | null,
  giftShopUrl: 'https://lescoulissessaintquentin.shop.bonkdo.com/fr/bons-cadeaux',
  social: {
    instagram: 'https://www.instagram.com/hotel_lescoulisses/',
    facebook: 'https://www.facebook.com/profile.php?id=61572319170386',
    linkedin: 'https://www.linkedin.com/company/les-coulisses-du-th%C3%A9%C3%A2tre-h%C3%B4tel/',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=49.846108%2C3.286268',
  osmEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=3.2793%2C49.8431%2C3.2932%2C49.8491&layer=mapnik&marker=49.846108%2C3.286268',
} as const;

export type Hotel = typeof hotel;

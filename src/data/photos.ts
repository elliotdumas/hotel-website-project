import type { ImageMetadata } from 'astro';
import type { Localized } from '@/i18n/config';

import facadeNuit from '@/assets/photos/hotel/facade-nuit.jpg';
import courNuit from '@/assets/photos/hotel/cour-nuit.jpg';
import courVueAerienne from '@/assets/photos/hotel/cour-vue-aerienne.jpg';
import escalierColimacon from '@/assets/photos/hotel/escalier-colimacon.jpg';
import escalierBois from '@/assets/photos/hotel/escalier-bois.jpg';
import vaseApplique from '@/assets/photos/hotel/vase-applique.jpg';
import salonCheminee from '@/assets/photos/hotel/salon-cheminee.jpg';
import espaceDeVie1 from '@/assets/photos/hotel/espace-de-vie-1.jpg';
import espaceDeVie2 from '@/assets/photos/hotel/espace-de-vie-2.jpg';
import espaceDeVie5 from '@/assets/photos/hotel/espace-de-vie-5.jpg';
import pavillon1 from '@/assets/photos/hotel/pavillon-1.jpg';
import pavillon2 from '@/assets/photos/hotel/pavillon-2.jpg';
import signaletiqueScene from '@/assets/photos/hotel/signaletique-scene.jpg';
import numeroChambre from '@/assets/photos/hotel/numero-chambre.jpg';
import spheresLumineuses from '@/assets/photos/hotel/sphere-lumineuses.jpg';
import barComptoir from '@/assets/photos/bar/bar-comptoir.jpg';
import terrasseSoir from '@/assets/photos/bar/terrasse-soir.jpg';
import barSuspensions from '@/assets/photos/bar/bar-suspensions.jpg';
import tireuses from '@/assets/photos/bar/tireuses.jpg';
import barSalle from '@/assets/photos/bar/bar-salle.jpg';
import barVueLongue from '@/assets/photos/bar/bar-vue-longue.jpg';
import barLumieres from '@/assets/photos/bar/bar-lumieres.jpg';
import barPanorama from '@/assets/photos/bar/bar-panorama.jpg';
import barNuit from '@/assets/photos/bar/bar-nuit.jpg';
import piscine1 from '@/assets/photos/services/piscine-1.jpg';
import piscine2 from '@/assets/photos/services/piscine-2.jpg';
import piscine3 from '@/assets/photos/services/piscine-3.jpg';
import petitDej1 from '@/assets/photos/services/petit-dejeuner-1.jpg';
import petitDej2 from '@/assets/photos/services/petit-dejeuner-2.jpg';
import petitDej3 from '@/assets/photos/services/petit-dejeuner-3.jpg';
import salle1 from '@/assets/photos/seminaires/salle-1.jpg';
import salle2 from '@/assets/photos/seminaires/salle-2.jpg';
import salle3 from '@/assets/photos/seminaires/salle-3.jpg';
import buffet from '@/assets/photos/seminaires/buffet.jpg';
import jardin from '@/assets/photos/seminaires/jardin.jpg';
import facadeJardin from '@/assets/photos/seminaires/facade-jardin.jpg';
import terrasseCour from '@/assets/photos/hotel/terrasse-cour.jpg';
import courPavillons from '@/assets/photos/hotel/cour-pavillons.jpg';
import portailLogo from '@/assets/photos/hotel/portail-logo.jpg';
import balconVegetal from '@/assets/photos/hotel/balcon-vegetal.jpg';
import salonCheminee2 from '@/assets/photos/hotel/salon-cheminee-2.jpg';
import chambre1 from '@/assets/photos/hotel/chambre-1.jpg';
import chambre2 from '@/assets/photos/hotel/chambre-2.jpg';
import chambre3 from '@/assets/photos/hotel/chambre-3.jpg';
import chambre4 from '@/assets/photos/hotel/chambre-4.jpg';
import chambre5 from '@/assets/photos/hotel/chambre-5.jpg';
import sdb1 from '@/assets/photos/hotel/sdb-1.jpg';
import sdb2 from '@/assets/photos/hotel/sdb-2.jpg';
import sdb3 from '@/assets/photos/hotel/sdb-3.jpg';
import sdb4 from '@/assets/photos/hotel/sdb-4.jpg';
import barLumineux from '@/assets/photos/bar/bar-lumineux.jpg';
import piscineTropicale1 from '@/assets/photos/services/piscine-tropicale-1.jpg';
import piscineTropicale2 from '@/assets/photos/services/piscine-tropicale-2.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: Localized;
}

const p = (src: ImageMetadata, fr: string, en: string, de: string): Photo => ({
  src,
  alt: { fr, en, de },
});

/** Photos de l'hôtel (hors chambres et appartements, qui sont dans src/content). */
export const photos = {
  facadeNuit: p(
    facadeNuit,
    'Façade illuminée de l’hôtel Les Coulisses du Théâtre à la tombée de la nuit',
    'The illuminated façade of Hôtel Les Coulisses du Théâtre at nightfall',
    'Die beleuchtete Fassade des Hôtel Les Coulisses du Théâtre bei Einbruch der Dunkelheit',
  ),
  courNuit: p(
    courNuit,
    'Cour intérieure de l’hôtel éclairée le soir, avec plantes et terrasse',
    'The hotel’s inner courtyard lit up in the evening, with plants and terrace',
    'Der abends beleuchtete Innenhof des Hotels mit Pflanzen und Terrasse',
  ),
  courVueAerienne: p(
    courVueAerienne,
    'Vue plongeante sur la cour pavée et la façade de l’hôtel',
    'View down onto the paved courtyard and the hotel façade',
    'Blick von oben auf den gepflasterten Innenhof und die Hotelfassade',
  ),
  escalierColimacon: p(
    escalierColimacon,
    'Escalier en colimaçon et plantes vertes, vus d’en bas',
    'Spiral staircase and green plants seen from below',
    'Wendeltreppe und Grünpflanzen von unten gesehen',
  ),
  escalierBois: p(
    escalierBois,
    'Escalier en bois tournant et couloir éclairé par des appliques',
    'Curved wooden staircase and corridor lit by wall lights',
    'Geschwungene Holztreppe und von Wandleuchten erhellter Flur',
  ),
  vaseApplique: p(
    vaseApplique,
    'Vase noir et doré éclairé par une applique murale',
    'Black and gold vase lit by a wall lamp',
    'Schwarz-goldene Vase im Licht einer Wandleuchte',
  ),
  salonCheminee: p(
    salonCheminee,
    'Salon avec banquette, cheminée moderne et lumière tamisée',
    'Lounge with banquette, modern fireplace and soft lighting',
    'Lounge mit Sitzbank, modernem Kamin und gedämpftem Licht',
  ),
  espaceDeVie1: p(
    espaceDeVie1,
    'Pièce de vie avec fauteuils, plantes et écran mural',
    'Living area with armchairs, plants and wall screen',
    'Aufenthaltsbereich mit Sesseln, Pflanzen und Wandbildschirm',
  ),
  espaceDeVie2: p(
    espaceDeVie2,
    'Salle avec niches décoratives et tables le long d’une cheminée',
    'Room with decorative niches and tables along a fireplace',
    'Raum mit Dekonischen und Tischen entlang eines Kamins',
  ),
  espaceDeVie5: p(
    espaceDeVie5,
    'Coin salon avec banquette et cheminée, sous un grand miroir',
    'Seating corner with banquette and fireplace under a large mirror',
    'Sitzecke mit Bank und Kamin unter einem großen Spiegel',
  ),
  pavillon1: p(
    pavillon1,
    'Pavillon de la cour avec balcon en fer forgé et terrasse',
    'Courtyard pavilion with wrought-iron balcony and terrace',
    'Pavillon im Innenhof mit schmiedeeisernem Balkon und Terrasse',
  ),
  pavillon2: p(
    pavillon2,
    'Bâtiment de chambres en rez-de-chaussée avec glycine',
    'Ground-floor room building with wisteria',
    'Zimmergebäude im Erdgeschoss mit Glyzinie',
  ),
  signaletiqueScene: p(
    signaletiqueScene,
    'Panneau « Scène » indiquant les chambres et la piscine',
    '“Scène” sign pointing to the rooms and the pool',
    'Schild „Scène“ mit Hinweis auf Zimmer und Pool',
  ),
  numeroChambre: p(
    numeroChambre,
    'Numéro de chambre 125 projeté en lumière sur un mur',
    'Room number 125 projected in light on a wall',
    'Zimmernummer 125 als Lichtprojektion an der Wand',
  ),
  spheresLumineuses: p(
    spheresLumineuses,
    'Sphères de verre suspendues au-dessus de la piscine',
    'Glass spheres hanging above the pool',
    'Über dem Pool hängende Glaskugeln',
  ),
  barComptoir: p(
    barComptoir,
    'Comptoir du bar l’Entracte avec tabourets et grandes plantes',
    'L’Entracte bar counter with stools and large plants',
    'Theke der Bar L’Entracte mit Hockern und großen Pflanzen',
  ),
  terrasseSoir: p(
    terrasseSoir,
    'Terrasse de l’Entracte éclairée de bougies le soir',
    'L’Entracte terrace lit by candles in the evening',
    'Die abends von Kerzen beleuchtete Terrasse von L’Entracte',
  ),
  barSuspensions: p(
    barSuspensions,
    'Bar avec grandes suspensions noires et lumière chaude',
    'Bar with large black pendant lights and warm lighting',
    'Bar mit großen schwarzen Hängeleuchten und warmem Licht',
  ),
  tireuses: p(
    tireuses,
    'Tireuses à bière en inox sur le comptoir du bar',
    'Stainless-steel beer taps on the bar counter',
    'Edelstahl-Zapfhähne auf der Bartheke',
  ),
  barSalle: p(
    barSalle,
    'Salle du bar avec sculpture, plantes et tables',
    'Bar room with sculpture, plants and tables',
    'Barraum mit Skulptur, Pflanzen und Tischen',
  ),
  barVueLongue: p(
    barVueLongue,
    'Vue sur toute la longueur du bar et de ses tables',
    'View along the full length of the bar and its tables',
    'Blick über die gesamte Länge der Bar und ihrer Tische',
  ),
  barLumieres: p(
    barLumieres,
    'Suspensions dorées au-dessus des tables du bar',
    'Gold pendant lights above the bar tables',
    'Goldene Hängeleuchten über den Bartischen',
  ),
  barPanorama: p(
    barPanorama,
    'Le bar l’Entracte, son comptoir et ses suspensions',
    'L’Entracte bar with its counter and pendant lights',
    'Die Bar L’Entracte mit Theke und Hängeleuchten',
  ),
  barNuit: p(
    barNuit,
    'Le bar en soirée, ambiance feutrée',
    'The bar in the evening, with a cosy atmosphere',
    'Die Bar am Abend in gemütlicher Atmosphäre',
  ),
  piscine1: p(
    piscine1,
    'Piscine intérieure chauffée sous un plafond tropical, avec plantes et transats',
    'Heated indoor pool under a tropical ceiling, with plants and loungers',
    'Beheiztes Hallenbad unter tropischer Decke mit Pflanzen und Liegen',
  ),
  piscine2: p(
    piscine2,
    'Salon en bois au bord de la piscine chauffée',
    'Wooden lounge furniture beside the heated pool',
    'Holz-Lounge am Rand des beheizten Pools',
  ),
  piscine3: p(
    piscine3,
    'Bassin de la piscine avec marches et plafond végétal',
    'Pool basin with steps and a leafy ceiling',
    'Poolbecken mit Stufen und begrünter Decke',
  ),
  petitDej1: p(
    petitDej1,
    'Table du petit-déjeuner dressée avec jus et boissons chaudes',
    'Breakfast table set with juice and hot drinks',
    'Gedeckter Frühstückstisch mit Saft und Heißgetränken',
  ),
  petitDej2: p(
    petitDej2,
    'Buffet du petit-déjeuner avec cocottes en fonte et pancakes',
    'Breakfast buffet with cast-iron pots and pancakes',
    'Frühstücksbuffet mit gusseisernen Töpfen und Pancakes',
  ),
  petitDej3: p(
    petitDej3,
    'Buffet avec pain frais, confitures et grille-pain',
    'Buffet with fresh bread, jams and toaster',
    'Buffet mit frischem Brot, Konfitüren und Toaster',
  ),
  salle1: p(
    salle1,
    'Salle de séminaire avec boiseries, grande table et parquet',
    'Meeting room with wood panelling, large table and parquet floor',
    'Seminarraum mit Holzvertäfelung, großem Tisch und Parkett',
  ),
  salle2: p(
    salle2,
    'Salle de séminaire lumineuse avec longue table de réunion',
    'Bright meeting room with a long conference table',
    'Heller Seminarraum mit langem Konferenztisch',
  ),
  salle3: p(
    salle3,
    'Salle de séminaire avec cheminée ancienne et chaises noires',
    'Meeting room with period fireplace and black chairs',
    'Seminarraum mit altem Kamin und schwarzen Stühlen',
  ),
  buffet: p(
    buffet,
    'Pause gourmande de séminaire : café, jus et douceurs',
    'Seminar break: coffee, juice and treats',
    'Seminarpause: Kaffee, Saft und Süßes',
  ),
  jardin: p(
    jardin,
    'Jardin attenant aux salles de séminaire',
    'Garden next to the meeting rooms',
    'Garten neben den Seminarräumen',
  ),
  facadeJardin: p(
    facadeJardin,
    'Façade de l’hôtel côté jardin sous un ciel bleu',
    'The hotel façade on the garden side under a blue sky',
    'Die Hotelfassade zur Gartenseite unter blauem Himmel',
  ),
  terrasseCour: p(
    terrasseCour,
    'Terrasse de l’hôtel dans la cour intérieure, avec salons d’extérieur, plantes et façade éclairée',
    'The hotel terrace in the inner courtyard, with outdoor lounges, plants and lit façade',
    'Die Hotelterrasse im Innenhof mit Lounge-Möbeln, Pflanzen und beleuchteter Fassade',
  ),
  courPavillons: p(
    courPavillons,
    'Cour pavée et pavillons de chambres de l’hôtel',
    'The hotel’s paved courtyard and room pavilions',
    'Gepflasterter Innenhof und Zimmerpavillons des Hotels',
  ),
  portailLogo: p(
    portailLogo,
    'Portail de l’hôtel orné du logo Les Coulisses du Théâtre, au coucher du soleil',
    'The hotel gate with the Les Coulisses du Théâtre logo at sunset',
    'Das Hoteltor mit dem Logo von Les Coulisses du Théâtre bei Sonnenuntergang',
  ),
  balconVegetal: p(
    balconVegetal,
    'Balcon végétalisé avec fauteuils en rotin et vue sur les toits',
    'Planted balcony with rattan armchairs and rooftop views',
    'Begrünter Balkon mit Rattansesseln und Blick über die Dächer',
  ),
  salonCheminee2: p(
    salonCheminee2,
    'Salon avec canapés, coussins moutarde et cheminée',
    'Lounge with sofas, mustard cushions and fireplace',
    'Lounge mit Sofas, senffarbenen Kissen und Kamin',
  ),
  chambre1: p(
    chambre1,
    'Chambre avec grand lit, coussins gris et vue sur les toits',
    'Room with large bed, grey cushions and rooftop views',
    'Zimmer mit großem Bett, grauen Kissen und Blick über die Dächer',
  ),
  chambre2: p(
    chambre2,
    'Chambre lumineuse avec bureau, télévision et porte-fenêtre',
    'Bright room with desk, television and French window',
    'Helles Zimmer mit Schreibtisch, Fernseher und Fenstertür',
  ),
  chambre3: p(
    chambre3,
    'Chambre avec tapisserie murale et porte-fenêtre ouverte sur la verdure',
    'Room with wall tapestry and French window opening onto greenery',
    'Zimmer mit Wandteppich und Fenstertür zum Grünen',
  ),
  chambre4: p(
    chambre4,
    'Lit double, tapisserie et grandes fenêtres',
    'Double bed, tapestry and tall windows',
    'Doppelbett, Wandteppich und hohe Fenster',
  ),
  chambre5: p(
    chambre5,
    'Chambre avec lit double, bureau et grande fenêtre',
    'Room with double bed, desk and large window',
    'Zimmer mit Doppelbett, Schreibtisch und großem Fenster',
  ),
  sdb1: p(
    sdb1,
    'Salle de bain avec douche à l’italienne et miroir rond',
    'Bathroom with walk-in shower and round mirror',
    'Bad mit begehbarer Dusche und rundem Spiegel',
  ),
  sdb2: p(
    sdb2,
    'Lavabo, miroir rond et douche vitrée',
    'Washbasin, round mirror and glass shower',
    'Waschbecken, runder Spiegel und Glasdusche',
  ),
  sdb3: p(
    sdb3,
    'Salle de bain avec miroir ovale et douche',
    'Bathroom with oval mirror and shower',
    'Bad mit ovalem Spiegel und Dusche',
  ),
  sdb4: p(
    sdb4,
    'Salle de bain avec miroir ovale rétroéclairé',
    'Bathroom with backlit oval mirror',
    'Bad mit hinterleuchtetem ovalem Spiegel',
  ),
  barLumineux: p(
    barLumineux,
    'Le bar l’Entracte en journée, tables et banquettes camel',
    'L’Entracte bar by day, with tables and tan banquettes',
    'Die Bar L’Entracte bei Tag mit Tischen und cognacfarbenen Bänken',
  ),
  piscineTropicale1: p(
    piscineTropicale1,
    'Piscine chauffée avec salon en bois et plafond tropical',
    'Heated pool with wooden lounge and tropical ceiling',
    'Beheiztes Hallenbad mit Holz-Lounge und tropischer Decke',
  ),
  piscineTropicale2: p(
    piscineTropicale2,
    'Vue d’ensemble de la piscine intérieure, palmiers et transats',
    'Overview of the indoor pool, palms and loungers',
    'Gesamtansicht des Hallenbads mit Palmen und Liegen',
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

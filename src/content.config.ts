import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ fr: z.string(), en: z.string(), de: z.string() });

/** Équipements connus : le libellé de chaque clé est dans src/i18n/*.json (amenities). */
export const amenityKeys = [
  'tv',
  'intlChannels',
  'kettle',
  'coffee',
  'courtesyTray',
  'ac',
  'shower',
  'showerOrBath',
  'showerAndBath',
  'hairdryer',
  'safe',
  'minibar',
  'sofaBed',
  'accessible',
  'outdoorLounge',
  'sunLoungers',
  'seating',
  'kitchen',
  'fridge',
  'microwave',
  'wardrobe',
  'desk',
  'mirror',
  'housekeeping',
] as const;

type ImageHelper = SchemaContext['image'];

/** Photos : la première sert de visuel principal. */
const gallery = (image: ImageHelper) => z.array(z.object({ src: image(), alt: localized })).min(1);

const rooms = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/rooms' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: localized,
      tagline: localized,
      size: z.string().describe('Surface en m², ex. « 12 à 15 »'),
      guests: localized,
      bed: localized,
      priceFrom: z.number().describe('Prix « à partir de » en euros, par nuit'),
      priceNote: localized.optional(),
      description: z.array(localized),
      amenities: z.array(z.enum(amenityKeys)),
      highlight: localized.optional(),
      noPets: z.boolean().default(false),
      photos: gallery(image),
    }),
});

const apartments = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/apartments' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: localized,
      size: z.string(),
      guests: localized,
      description: z.array(localized),
      amenities: z.array(z.enum(amenityKeys)),
      photos: gallery(image),
    }),
});

const places = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/places' }),
  schema: z.object({
    order: z.number(),
    name: localized,
    description: localized,
    url: z.url().optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: z.object({ title: z.string() }),
});

export const collections = { rooms, apartments, places, legal };

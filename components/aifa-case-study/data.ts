// All assets live in /public/assets/aifa
export const ASSET = '/assets/aifa';

export type Frame = { name: string; x: number; src: string };
export type Carousel = { name: string; frames: Frame[] };

const row = (key: string, names: string[], xs: number[], file: (n: string) => string): Frame[] =>
  names.map((name, i) => ({ name, x: xs[i], src: `${ASSET}/carousels/${key}-${file(name)}.jpg` }));

// x positions mirror the Figma file so the canvas view feels like the real board
export const CAROUSELS: Carousel[] = [
  {
    name: 'carousel 1',
    frames: row('c1', ['Light 14', 'Light 15', 'Light 16', 'Light 17', 'Light 18', 'Light 19'],
      [0, 1167, 2334, 3501, 4675, 5835], (n) => n.toLowerCase().replace(' ', '-')),
  },
  {
    name: 'carousel 2',
    frames: row('c2', ['21', '22', '23', '24', '25', '26', '7', '8'],
      [0, 1167, 2334, 3501, 4675, 5835, 7009, 8169], (n) => n),
  },
  {
    name: 'carousel 3',
    frames: row('c3', ['1', '2', '3', '4', '5', '6', '9', '10'],
      [0, 1167, 2334, 3501, 4675, 5849, 7023, 8197], (n) => n),
  },
  {
    name: 'carousel 4',
    frames: row('c4', ['15', '16', '17', '18', '19', '20'],
      [0, 1167, 2334, 3501, 4675, 5849], (n) => n),
  },
];

export const POSTS = [
  { src: `${ASSET}/post-ai-summit-ny.jpg`, alt: 'AI Summit New York post', w: 1200, h: 627 },
  { src: `${ASSET}/post-sap-sapphire.jpg`, alt: 'SAP Sapphire Madrid countdown post', w: 1200, h: 1200 },
];

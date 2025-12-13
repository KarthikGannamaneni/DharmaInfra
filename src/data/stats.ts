import type { StatData } from '../types';

export const stats: Omit<StatData, 'icon'>[] = [
  {
    id: 'projects',
    value: 150,
    label: 'Projects Completed'
  },
  {
    id: 'sqft',
    value: 2,
    suffix: 'M+',
    label: 'Sq.Ft. Developed'
  },
  {
    id: 'landowners',
    value: 50,
    label: 'Happy Landowners'
  },
  {
    id: 'years',
    value: 25,
    label: 'Years of Excellence'
  },
  {
    id: 'awards',
    value: 15,
    label: 'Industry Awards'
  },
  {
    id: 'delivery',
    value: 98,
    suffix: '%',
    label: 'On-Time Delivery'
  }
];

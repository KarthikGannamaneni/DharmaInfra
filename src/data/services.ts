import type { ServiceData } from '../types';

export const services: Omit<ServiceData, 'icon'>[] = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Complexes',
    description: 'Premium apartment complexes with modern amenities, designed for contemporary urban living while maximizing returns for landowners.',
    features: ['Luxury & Mid-segment Apartments', 'Gated Communities', 'Villa Projects']
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Spaces',
    description: 'State-of-the-art office buildings, retail centers, and tech parks that attract premium tenants and ensure long-term appreciation.',
    features: ['Grade A Office Towers', 'Shopping Centers', 'IT & Tech Parks']
  },
  {
    id: 'mixed',
    number: '03',
    title: 'Mixed-Use Developments',
    description: 'Integrated townships combining residential, commercial, and recreational spaces for holistic community development.',
    features: ['Integrated Townships', 'Live-Work-Play Spaces', 'Community Centers']
  },
  {
    id: 'joint',
    number: '04',
    title: 'Joint Development',
    description: 'Fair and transparent joint development agreements that protect landowner interests while ensuring optimal development outcomes.',
    features: ['Revenue Sharing Models', 'Area Sharing Agreements', 'Outright Purchase Options']
  }
];

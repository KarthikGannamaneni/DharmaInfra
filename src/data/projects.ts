// ===================================
// Projects Data - Dharma Infra
// ===================================

import type { ProjectData } from '../types';

export const projects: ProjectData[] = [
  {
    id: 'kukatpally-east',
    title: 'Dharma Heights',
    category: 'residential',
    image: `${import.meta.env.BASE_URL}assets/WhatsApp Image 2025-12-13 at 1.51.44 PM.jpeg`,
    location: 'Kukatpally, Hyderabad',
    size: '12,000 Sq.Ft.',
    units: 'G+4 Floors • 8 Units',
    year: '2024',
    description: 'A premium residential apartment complex featuring modern architecture with elegant stone cladding, spacious balconies, and contemporary interiors. Located in the heart of Kukatpally with excellent connectivity.',
    features: [
      '2 & 3 BHK Apartments',
      'Modern Elevation Design',
      'Covered Car Parking',
      '24/7 Security',
      'Power Backup',
      'Rainwater Harvesting'
    ]
  },
  {
    id: 'kukatpally-west',
    title: 'Dharma Residency',
    category: 'residential',
    image: `${import.meta.env.BASE_URL}assets/WhatsApp Image 2025-12-13 at 1.51.44 PM-2.jpeg`,
    location: 'Kukatpally West Road, Hyderabad',
    size: '15,000 Sq.Ft.',
    units: 'G+5 Floors • 10 Units',
    year: '2024',
    description: 'An elegant residential project on Kukatpally West Road featuring contemporary design with premium finishes. The building offers stunning views and modern amenities for comfortable urban living.',
    features: [
      '2 & 3 BHK Luxury Apartments',
      'Designer Interiors',
      'Modular Kitchen',
      'Landscaped Gardens',
      'Children Play Area',
      'Community Hall'
    ]
  },
  {
    id: 'dharma-towers',
    title: 'Dharma Towers',
    category: 'residential',
    image: `${import.meta.env.BASE_URL}assets/WhatsApp Image 2025-12-13 at 1.51.44 PM-3.jpeg`,
    location: 'Gramakantam, Kukatpally',
    size: '18,000 Sq.Ft.',
    units: 'G+5 Floors • 12 Units',
    year: '2023',
    description: 'A landmark residential development featuring a striking contemporary facade with geometric patterns. Premium apartments designed for modern families seeking quality living spaces.',
    features: [
      'Spacious 3 BHK Apartments',
      'Premium Flooring',
      'Video Door Phone',
      'Gymnasium',
      'Terrace Garden',
      'Solar Water Heating'
    ]
  },
  {
    id: 'silver-square',
    title: 'Silver Square',
    category: 'residential',
    image: `${import.meta.env.BASE_URL}assets/DHARAM INFRA @ East & North View   _   KUKATPALLT   _   Model   1 - 2   ... ..jpg`,
    location: 'Shiridi Hills, Hyderabad',
    size: '20,000 Sq.Ft.',
    units: 'G+4 Floors • 16 Units',
    year: '2023',
    description: 'A sophisticated residential complex at Shiridi Hills offering a perfect blend of luxury and comfort. Modern architecture with thoughtful design for families.',
    features: [
      '2 & 3 BHK Apartments',
      'Vastu Compliant',
      'Club House',
      'Swimming Pool',
      'Indoor Games',
      'Jogging Track'
    ]
  },
  {
    id: 'vrindavan-a',
    title: 'Vrindavan Block A',
    category: 'residential',
    image: `${import.meta.env.BASE_URL}assets/DHARAM INFRA @ KUKATPALLT-WEST ROAD 435   _   West & North View   _   Model   4 - 4   ... ..jpg`,
    location: 'Kukatpally, Hyderabad',
    size: '14,000 Sq.Ft.',
    units: 'G+5 Floors • 10 Units',
    year: '2022',
    description: 'Part of the prestigious Vrindavan project, Block A offers premium living spaces with modern amenities. Designed for those who appreciate quality construction and elegant design.',
    features: [
      'Premium 2 & 3 BHK',
      'Italian Marble Flooring',
      'Modular Wardrobes',
      'Covered Parking',
      'Generator Backup',
      'Water Treatment Plant'
    ]
  },
  {
    id: 'dharma-80x60',
    title: 'Dharma Greens',
    category: 'residential',
    image: `${import.meta.env.BASE_URL}assets/DHARMA INFRA _ 80X60 E   _   East & North View   _   Model   1 - 8   ... ..jpg`,
    location: 'Kukatpally, Hyderabad',
    size: '16,000 Sq.Ft.',
    units: 'G+5 Floors • 10 Units',
    year: '2024',
    description: 'A modern eco-friendly residential project featuring lush balcony gardens and sustainable design. Each apartment offers generous living spaces with natural light and ventilation.',
    features: [
      'Eco-Friendly Design',
      'Balcony Gardens',
      'Cross Ventilation',
      'Energy Efficient',
      'Organic Waste Converter',
      'EV Charging Points'
    ]
  }
];

export function getProjectById(id: string): ProjectData | undefined {
  return projects.find(project => project.id === id);
}

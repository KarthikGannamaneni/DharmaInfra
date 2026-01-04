export interface Project {
    id: string;
    name: string;
    status: "Ongoing" | "Completed" | string;
    location: string;
    startDate: string;
    handover: string;
    units: number;
    size: string;
    architect: string;
    locationMap: string;
    image: string;
    gallery: string[];
    floorPlans: string[];
    description?: string;
    facing?: string;
    uds?: string;
    flatSize?: string;
    distances?: { location: string; distance: string }[];
    specifications?: ProjectSpecification[];
    hiddenSpecifications?: string[];
    configuration?: string;
    hasGenerator?: boolean;
}

export interface ProjectSpecification {
    category: string;
    details: string;
}

export interface Leadership {
    name: string;
    role: string;
    bio: string;
    image: string;
}

export interface Company {
    name: string;
    founded: string;
    tagline: string;
    philosophy: string;
    leadership: Leadership[];
}

export interface AppData {
    company: Company;
    projects: Project[];
    specifications: ProjectSpecification[];
}

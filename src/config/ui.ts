const ui = {
    common: {
        companyName: "Dharma Infra",
        viewProjects: "View Projects",
        readMore: "Read More",
        backToProjects: "← Back to Projects",
        loading: "Loading...",
        noImage: "No Image Available",
        clickDetails: "Click for more details",
        status: "Status",
        units: "Units",
        plotSize: "Plot Size",
        architect: "Architect",
        startDate: "Start Date",
        handover: "Handover",
        location: "Location",
        gallery: "Gallery",
        floorPlans: "Floor Plans",
        specifications: "Specifications",
        overview: "Project Overview",
    },
    home: {
        heroButton: "View Projects",
        philosophyTitle: "The Story of Home", // Default if not in data
        philosophyBody: (name: string, founded: string) => `At ${name}, we believe that every structure is more than just bricks and mortar—it's a canvas for life's most cherished moments. Founded in ${founded}, we are dedicated to creating spaces that blend modern luxury with the timeless principles of Vastu, ensuring light, ventilation, and harmony in every home.`
    },
    portfolio: {
        title: "Our Projects",
        ongoing: "Ongoing Projects",
        completed: "Completed Projects",
        empty: "No projects found."
    },
    projectDetail: {
        notFound: "Project Not Found",
        backLink: "Back to Projects",
        descriptionFallback: (name: string, status: string, location: string, architect: string) => `${name} is a ${status.toLowerCase()} residential project by Dharma Infra, located in ${location}. Designed by ${architect}, it offers premium living spaces with a focus on Vastu compliance and modern amenities.`
    },
    leadership: {
        title: "About Us",
        subtitle: "Guided by visionaries dedicated to excellence and innovation."
    }
};

export default ui;

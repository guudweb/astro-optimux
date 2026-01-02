// Strapi API connection with hardcoded fallback data

const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

export interface Service {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  caracteristicas: string[];
  destacado: boolean;
  orden: number;
}

// Hardcoded fallback data
const servicesFallback: Service[] = [
  {
    id: 1,
    titulo: 'Servers',
    descripcion: 'Installation, configuration and administration of physical and virtual servers. We optimize your infrastructure for maximum performance and availability.',
    icono: 'Server',
    caracteristicas: ['Installation and setup', 'Network configuration', 'Virtualization', 'Backup and recovery'],
    destacado: true,
    orden: 1,
  },
  {
    id: 2,
    titulo: 'Video Surveillance',
    descripcion: 'CCTV security camera systems to protect your facilities. Real-time monitoring and continuous recording.',
    icono: 'Camera',
    caracteristicas: ['IP and analog cameras', 'DVR/NVR', 'Remote monitoring', 'Cloud storage'],
    destacado: true,
    orden: 2,
  },
  {
    id: 3,
    titulo: 'Access Control',
    descripcion: 'Access control systems for doors and restricted areas. Manage who enters and when with complete security.',
    icono: 'DoorOpen',
    caracteristicas: ['Biometric readers', 'RFID cards', 'Electronic locks', 'Access logging'],
    destacado: true,
    orden: 3,
  },
  {
    id: 4,
    titulo: 'IT Maintenance',
    descripcion: 'Preventive and corrective maintenance service for all your technology infrastructure. Keep your systems running without interruptions.',
    icono: 'Wrench',
    caracteristicas: ['Technical support', 'Preventive maintenance', 'System updates', 'Incident resolution'],
    destacado: true,
    orden: 4,
  },
];

async function fetchAPI(endpoint: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}`);
    if (!res.ok) throw new Error('API request failed');
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn(`Failed to fetch from Strapi: ${endpoint}. Using fallback data.`);
    return null;
  }
}

export async function getServicios(): Promise<Service[]> {
  const data = await fetchAPI('servicios?populate=*&sort=orden:asc');

  if (data?.data) {
    // Transform Strapi response to our format
    return data.data.map((item: any) => ({
      id: item.id,
      titulo: item.attributes?.titulo || item.titulo,
      descripcion: item.attributes?.descripcion || item.descripcion,
      icono: item.attributes?.icono || item.icono,
      caracteristicas: item.attributes?.caracteristicas || item.caracteristicas || [],
      destacado: item.attributes?.destacado ?? item.destacado ?? false,
      orden: item.attributes?.orden || item.orden || 0,
    }));
  }

  return servicesFallback;
}

export async function getServiciosDestacados(): Promise<Service[]> {
  const servicios = await getServicios();
  return servicios.filter(s => s.destacado).slice(0, 4);
}

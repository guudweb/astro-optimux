// Strapi API connection with hardcoded fallback data

const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

export interface Servicio {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  caracteristicas: string[];
  destacado: boolean;
  orden: number;
}

// Hardcoded fallback data
const serviciosFallback: Servicio[] = [
  {
    id: 1,
    titulo: 'Servidores',
    descripcion: 'Instalación, configuración y administración de servidores físicos y virtuales. Optimizamos tu infraestructura para máximo rendimiento y disponibilidad.',
    icono: 'Server',
    caracteristicas: ['Instalación y montaje', 'Configuración de red', 'Virtualización', 'Backup y recuperación'],
    destacado: true,
    orden: 1,
  },
  {
    id: 2,
    titulo: 'Videovigilancia',
    descripcion: 'Sistemas de cámaras de seguridad CCTV para proteger tus instalaciones. Monitoreo en tiempo real y grabación continua.',
    icono: 'Camera',
    caracteristicas: ['Cámaras IP y analógicas', 'DVR/NVR', 'Monitoreo remoto', 'Almacenamiento en la nube'],
    destacado: true,
    orden: 2,
  },
  {
    id: 3,
    titulo: 'Control de Acceso',
    descripcion: 'Sistemas de control de acceso para puertas y áreas restringidas. Gestiona quién entra y cuándo con total seguridad.',
    icono: 'DoorOpen',
    caracteristicas: ['Lectores biométricos', 'Tarjetas RFID', 'Cerraduras electrónicas', 'Registro de accesos'],
    destacado: true,
    orden: 3,
  },
  {
    id: 4,
    titulo: 'Mantenimiento IT',
    descripcion: 'Servicio de mantenimiento preventivo y correctivo para toda tu infraestructura tecnológica. Mantén tus sistemas funcionando sin interrupciones.',
    icono: 'Wrench',
    caracteristicas: ['Soporte técnico', 'Mantenimiento preventivo', 'Actualización de sistemas', 'Resolución de incidencias'],
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

export async function getServicios(): Promise<Servicio[]> {
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

  return serviciosFallback;
}

export async function getServiciosDestacados(): Promise<Servicio[]> {
  const servicios = await getServicios();
  return servicios.filter(s => s.destacado).slice(0, 4);
}

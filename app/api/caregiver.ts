import { API_CONFIG, API_ENDPOINTS } from './config';
import { getStoredCenterId } from './auth';

export interface CaregiverApi {
  caregiverId: string;
  name: string;
  phone: string;
  serviceTypes: string[];
  status: string;
}

export const getCaregivers = async (): Promise<CaregiverApi[]> => {
  try {
    const centerId = getStoredCenterId();
    if (!centerId) {
      throw new Error('centerId not found in localStorage');
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.CAREGIVER.GET_ALL.replace('{centerId}', centerId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Caregiver fetch failed: ${response.status}`);
    }

    const data: CaregiverApi[] = await response.json();
    return data;
  } catch (error) {
    console.error('Caregiver fetch error:', error);
    throw error;
  }
}; 
import { API_CONFIG, API_ENDPOINTS } from './config';
import { getStoredCenterId } from './auth';

export interface WorkMatch {
  workMatchId: string;
  caregiverName: string;
  workDate: string;
  status: string;
}

export interface ScheduleRequest {
  centerId: string;
  year: number;
  month: number;
}

export interface ScheduleResponse {
  [key: string]: WorkMatch[];
}

export const getScheduleByDate = async (year: number, month: number): Promise<WorkMatch[]> => {
  try {
    const centerId = getStoredCenterId();
    if (!centerId) {
      throw new Error('centerId not found in localStorage');
    }

    const params = new URLSearchParams({
      centerId,
      year: year.toString(),
      month: (month + 1).toString(),
    });

    console.log(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SCHEDULE.GET_BY_DATE}?${params}`);

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.SCHEDULE.GET_BY_DATE}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Schedule fetch failed: ${response.status}`);
    }

    const data: WorkMatch[] = await response.json();
    return data;
  } catch (error) {
    console.error('Schedule fetch error:', error);
    throw error;
  }
}; 
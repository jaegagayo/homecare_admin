export interface WorkSchedule {
  id: string;
  caregiverId: number;
  caregiverName: string;
  date: string; // YYYY-MM-DD 형식
  startTime: string; // HH:MM 형식
  endTime: string; // HH:MM 형식
  workType: '센터' | '재가' | '방문';
  location: string;
  hourlyWage: number;
  status: '배정됨' | '미배정' | '완료' | '취소';
  notes?: string;
}

export const sampleSchedules: WorkSchedule[] = [
  // 2025년 7월 스케줄 예시 (오늘 날짜 기준)
  {
    id: '1',
    caregiverId: 1,
    caregiverName: '김영희',
    date: '2025-07-25',
    startTime: '09:00',
    endTime: '17:00',
    workType: '센터',
    location: '서울요양센터',
    hourlyWage: 12000,
    status: '완료'
  },
  {
    id: '2',
    caregiverId: 2,
    caregiverName: '박철수',
    date: '2025-07-25',
    startTime: '08:00',
    endTime: '16:00',
    workType: '재가',
    location: '강남구 김씨댁',
    hourlyWage: 15000,
    status: '완료'
  },
  {
    id: '3',
    caregiverId: 3,
    caregiverName: '이미영',
    date: '2025-07-26',
    startTime: '10:00',
    endTime: '18:00',
    workType: '방문',
    location: '서초구 박씨댁',
    hourlyWage: 18000,
    status: '완료'
  },
  {
    id: '4',
    caregiverId: 4,
    caregiverName: '최민수',
    date: '2025-07-26',
    startTime: '09:00',
    endTime: '17:00',
    workType: '센터',
    location: '서울요양센터',
    hourlyWage: 12000,
    status: '완료'
  },
  {
    id: '5',
    caregiverId: 5,
    caregiverName: '정수진',
    date: '2025-07-27',
    startTime: '08:00',
    endTime: '16:00',
    workType: '재가',
    location: '마포구 이씨댁',
    hourlyWage: 15000,
    status: '완료'
  },
  {
    id: '6',
    caregiverId: 1,
    caregiverName: '김영희',
    date: '2025-07-28',
    startTime: '09:00',
    endTime: '17:00',
    workType: '센터',
    location: '서울요양센터',
    hourlyWage: 12000,
    status: '배정됨'
  },
  {
    id: '7',
    caregiverId: 2,
    caregiverName: '박철수',
    date: '2025-07-28',
    startTime: '08:00',
    endTime: '16:00',
    workType: '재가',
    location: '강남구 김씨댁',
    hourlyWage: 15000,
    status: '배정됨'
  },
  {
    id: '8',
    caregiverId: 3,
    caregiverName: '이미영',
    date: '2025-07-28',
    startTime: '10:00',
    endTime: '18:00',
    workType: '방문',
    location: '서초구 박씨댁',
    hourlyWage: 18000,
    status: '배정됨'
  },
  {
    id: '9',
    caregiverId: 4,
    caregiverName: '최민수',
    date: '2025-07-29',
    startTime: '09:00',
    endTime: '17:00',
    workType: '센터',
    location: '서울요양센터',
    hourlyWage: 12000,
    status: '미배정'
  },
  {
    id: '10',
    caregiverId: 5,
    caregiverName: '정수진',
    date: '2025-07-29',
    startTime: '08:00',
    endTime: '16:00',
    workType: '재가',
    location: '마포구 이씨댁',
    hourlyWage: 15000,
    status: '배정됨'
  },
  {
    id: '11',
    caregiverId: 6,
    caregiverName: '한지민',
    date: '2025-07-30',
    startTime: '09:00',
    endTime: '17:00',
    workType: '센터',
    location: '서울요양센터',
    hourlyWage: 12000,
    status: '배정됨'
  },
  {
    id: '12',
    caregiverId: 7,
    caregiverName: '송민호',
    date: '2025-07-30',
    startTime: '10:00',
    endTime: '18:00',
    workType: '방문',
    location: '용산구 이씨댁',
    hourlyWage: 18000,
    status: '미배정'
  },
  {
    id: '13',
    caregiverId: 8,
    caregiverName: '윤서연',
    date: '2025-07-31',
    startTime: '08:00',
    endTime: '16:00',
    workType: '재가',
    location: '서대문구 박씨댁',
    hourlyWage: 15000,
    status: '배정됨'
  },
  {
    id: '14',
    caregiverId: 1,
    caregiverName: '김영희',
    date: '2025-08-01',
    startTime: '09:00',
    endTime: '17:00',
    workType: '센터',
    location: '서울요양센터',
    hourlyWage: 12000,
    status: '배정됨'
  },
  {
    id: '15',
    caregiverId: 2,
    caregiverName: '박철수',
    date: '2025-08-02',
    startTime: '08:00',
    endTime: '16:00',
    workType: '재가',
    location: '강남구 김씨댁',
    hourlyWage: 15000,
    status: '배정됨'
  }
];

// 날짜별 스케줄을 그룹화하는 유틸리티 함수
export const groupSchedulesByDate = (schedules: WorkSchedule[]) => {
  const grouped: { [date: string]: WorkSchedule[] } = {};
  
  schedules.forEach(schedule => {
    if (!grouped[schedule.date]) {
      grouped[schedule.date] = [];
    }
    grouped[schedule.date].push(schedule);
  });
  
  return grouped;
};

// 근무 시간을 계산하는 유틸리티 함수
export const calculateWorkHours = (startTime: string, endTime: string): number => {
  const start = new Date(`2000-01-01T${startTime}:00`);
  const end = new Date(`2000-01-01T${endTime}:00`);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
};

// 일별 급여를 계산하는 유틸리티 함수
export const calculateDailyWage = (schedule: WorkSchedule): number => {
  const hours = calculateWorkHours(schedule.startTime, schedule.endTime);
  return hours * schedule.hourlyWage;
}; 
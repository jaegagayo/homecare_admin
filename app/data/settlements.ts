export interface SettlementRecord {
  id: string;
  caregiverName: string;
  workDate: string;
  workHours: string;
  amount: number;
  status: 'completed' | 'pending' | 'rejected';
  action: string;
}

// 최근 정산 내역 데이터
export const recentSettlementRecords: SettlementRecord[] = [
  {
    id: '1',
    caregiverName: '김영희',
    workDate: '2025-07-25',
    workHours: '8시간',
    amount: 96000,
    status: 'completed',
    action: '상세보기'
  },
  {
    id: '2',
    caregiverName: '이철수',
    workDate: '2025-07-26',
    workHours: '6시간',
    amount: 72000,
    status: 'pending',
    action: '승인'
  },
  {
    id: '3',
    caregiverName: '박민수',
    workDate: '2025-07-27',
    workHours: '10시간',
    amount: 120000,
    status: 'rejected',
    action: '재검토'
  }
];

// 미정산 내역 데이터
export const pendingSettlementRecords: SettlementRecord[] = [
  {
    id: '4',
    caregiverName: '최영수',
    workDate: '2025-07-28',
    workHours: '7시간',
    amount: 84000,
    status: 'pending',
    action: '승인'
  },
  {
    id: '5',
    caregiverName: '정미영',
    workDate: '2025-07-29',
    workHours: '9시간',
    amount: 108000,
    status: 'pending',
    action: '승인'
  },
  {
    id: '6',
    caregiverName: '김태호',
    workDate: '2025-07-30',
    workHours: '8시간',
    amount: 96000,
    status: 'pending',
    action: '승인'
  }
];

// 정산 현황 데이터
export const settlementOverviewData = {
  totalAmount: 24500000, // 2,450만원
  previousMonthChange: 12,
  monthlyData: [1800, 2100, 1950, 2200, 2180, 2450] // 단위: 만원
};

// 미정산 현황 데이터
export const pendingSettlementData = {
  pendingCount: 3,
  totalAmount: 1250000, // 125만원
  weeklyData: [2, 1, 3, 0, 2, 1, 3] // 최근 7일 미정산 건수
}; 
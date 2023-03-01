export interface MissionCampain {
  bonus: number;
  endDate: string;
  id: string;
  missionType: string;
  name: string;
  startDate: string;
}
export interface ContentMissionCampain {
  description: string;
  id: string;
}
export type TypeMission = 'PENDING' | 'APPROVED' | 'REJECTED';
export interface MissionClaims {
  missionId: string;
  status: TypeMission;
  id: string;
  link?: string;
  images?: string[];
  bonus?: number;
  content?: string;
  reason?: string;
}

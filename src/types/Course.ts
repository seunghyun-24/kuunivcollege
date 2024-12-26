export interface Course {
  구분: string;
  학수번호: string;
  교과목명: string;
  학년: number;
  학기: number;
  필수선수: string | null;
  권장선수: string | null;
  실험실습: number | null;
  세부전공: string | null;
  학점: number;
  시간: number;
  전공역량: string | null;
  대학: string;
  학과: string;
  개설학과: string;
  내용: string | null;
  메모: string | null;
}

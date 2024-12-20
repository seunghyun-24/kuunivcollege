import { Position } from "@xyflow/react";

export interface NodeData {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    학수번호: string;
    세부전공: string | null;
    전공역량: string | null;
    개설학과: string | null;
    내용: string | null;
    메모: string | null;
  };
  type?: string;
  targetPosition?: Position;
  sourcePosition?: Position;
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  type: "required" | "recommended";
  data: { type: "required" | "recommended" };
}

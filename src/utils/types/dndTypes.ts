export interface DragItem {
    index: number;
    id: string;
    type: string;
  }

  export interface CardProps {
    id: any;
    image: string;
    index: number;
    selected: boolean;
    prevPos: number | null;
  }

  export enum DragTypes{
    IMAGECARD = "IMAGECARD",
  }
  
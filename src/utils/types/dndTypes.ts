export interface DragItem {
    index: number;
    id: string;
    type: string;
  }

  export interface CardProps {
    id: any;
    image: string;
    index: number;
  }

  export enum DragTypes{
    IMAGECARD = "IMAGECARD",
  }
  
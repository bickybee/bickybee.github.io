export type PaperFrameEvent = {
  count: number;
  time: number;
  delta: number;
};

export type PaperPointerEvent = {
  point: paper.Point;
  delta: { length: number };
  target: paper.Item;
};


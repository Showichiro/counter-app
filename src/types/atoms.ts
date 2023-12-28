export type Counter = { title: string; count: number };
export type Category = {
  title: string;
  counters: Counter[];
};

export type Sheet = {
  id: number;
  name: string;
};

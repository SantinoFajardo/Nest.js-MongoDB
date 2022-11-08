export type CreateProduct = {
  name: string;
  description: string;
  price: number;
};

export type UpdatedProduct = {
  name?: string;
  description?: string;
  price?: number;
};

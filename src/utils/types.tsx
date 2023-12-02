type farmDataProps = {
  FarmsID: number;
  FarmsName: string;
  SupplyDate: Date;
  Quantity: number;
  Discount: string;
  NetQuantity: number;
  TotalPrice: number;
  Paied: number;
  Remaining: number;
  FarmsNotes: string;
  Store: string;
};

type supplierDetailsProps = {
  id: number;
  name: string;
  date: Date | string;
};

type ProductProps = {
  ProductID: number;
  ProductName: string;
  ProductUnitPrice: number;
  ProductNote: string;
  Created_Date: Date | string;
};

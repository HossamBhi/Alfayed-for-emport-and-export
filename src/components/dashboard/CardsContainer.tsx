import { ReactNode } from "react";

type CardsContainerProps = {
  title: ReactNode;
  Card: JSX.ElementType;
  items: any[];
};

const CardsContainer = ({ title, items = [], Card }: CardsContainerProps) => {
  return (
    <div className="w-full col-span-1 relative m-auto bg-white border rounded-lg p-4">
      <h2 className="flex justify-between items-center pb-4">{title}</h2>
      <div className="overflow-scroll relative  lg:h-[70vh] h-[50vh]">
        {items.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;

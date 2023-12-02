import { InputAdornment } from "@mui/material";
import { ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineSearch } from "react-icons/hi";
import { CustomInput } from "../common";

type CardsContainerProps = {
  title: ReactNode;
  Card: JSX.ElementType;
  items: any[];
  titleButton: ReactNode;
};

const CardsContainer = ({
  title,
  items = [],
  Card,
  titleButton,
}: CardsContainerProps) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const filteredData = useMemo(
    () =>
      items.filter((item) =>
        item?.name?.toLowerCase().includes(searchValue?.toLowerCase())
      ),
    [searchValue]
  );
  return (
    <div className="w-full col-span-1 relative m-auto bg-white border rounded-lg p-4">
      <h2 className="flex justify-between items-center pb-4">
        {title} {titleButton}
      </h2>
      <CustomInput
        label={t("common.searchIn") + title}
        onChange={({ target }) => {
          setSearchValue(target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <HiOutlineSearch size="22" />
            </InputAdornment>
          ),
        }}
        fullWidth
        variant="standard"
      />
      <div className="overflow-scroll relative  lg:h-[70vh] h-[50vh]">
        {filteredData.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;

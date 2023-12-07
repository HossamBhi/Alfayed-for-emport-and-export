import { Box, CircularProgress, InputAdornment, useTheme } from "@mui/material";
import { ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineSearch } from "react-icons/hi";
import { CustomInput } from "../common";

type CardsContainerProps = {
  title: ReactNode;
  Card: JSX.ElementType;
  items: any[] | [];
  titleButton: ReactNode;
  isLoading?: boolean;
};

const CardsContainer = ({
  title,
  items = [],
  Card,
  titleButton,
  isLoading,
}: CardsContainerProps) => {
  const { t } = useTranslation();
  const {
    palette: { primary },
  } = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const filteredData = useMemo(
    () =>
      items.filter(
        (item) =>
          item?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          item?.expenseTypeName
            ?.toLowerCase()
            .includes(searchValue?.toLowerCase())
      ),
    [searchValue, items]
  );
  return (
    <div className="w-full col-span-1 relative m-auto bg-white border rounded-lg p-4">
      <h2 className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <p>{title}</p>
          <Box
            className="p-1 rounded-sm mx-2 text-xs"
            sx={{ backgroundColor: primary.main + "30" }}
          >
            {filteredData?.length}
          </Box>
        </div>

        {titleButton}
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
      <div className="overflow-scroll flex flex-col relative lg:h-[70vh] h-[50vh]">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div>
            {filteredData.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsContainer;

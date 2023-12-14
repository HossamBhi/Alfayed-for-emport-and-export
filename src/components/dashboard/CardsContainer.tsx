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
            .includes(searchValue?.toLowerCase()),
      ),
    [searchValue, items],
  );
  return (
    <div className="relative col-span-1 m-auto w-full rounded-lg border bg-white p-4">
      <h2 className="flex items-center justify-between pb-4">
        <div className="flex items-center">
          <p>{title}</p>
          <Box
            className="mx-2 rounded-sm p-1 text-xs"
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
      <div className="relative flex h-[50vh] flex-col overflow-scroll lg:h-[70vh]">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
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

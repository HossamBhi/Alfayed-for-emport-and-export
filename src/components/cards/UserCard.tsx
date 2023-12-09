import { Box, useTheme } from "@mui/material";
import { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import { FaEdit } from "react-icons/fa";

interface UserCardProps {
  item: any;
  containerStyle?: ComponentProps<"div">["className"];
  color?: string;
  onClick?: (item: any) => void;
  onEdit?: (item: any) => void;
  Icon: IconType;
  showEdit?: boolean;
}

const UserCard = ({
  item,
  containerStyle,
  color,
  onClick,
  Icon,
  showEdit = false,
  onEdit,
}: UserCardProps) => {
  const {
    palette: { primary },
  } = useTheme();
  const { t } = useTranslation();
  return (
    <div
      className={`flex relative hover:bg-gray-100 flex-1 justify-center items-center my-3 bg-gray-50 rounded-lg p-4 cursor-pointer ${containerStyle}`}
      onClick={() => onClick && onClick(item)}
    >
      <Box
        className="rounded-lg p-2 relative"
        sx={{ backgroundColor: primary.main + "50" }}
      >
        {showEdit && (
          <Box
            onClick={() => onEdit && onEdit(item)}
            className="absolute top-[-10px] right-[-10px] rounded-full p-1 z-10 cursor-pointer"
            sx={{
              backgroundColor: primary.main,
              borderWidth: 2,
              borderColor: "#fff",
            }}
          >
            <FaEdit color="#fff" size="12" />
          </Box>
        )}
        {/* <Box
          onClick={() => onEdit && onEdit(item)}
          className="absolute top-[-10px] right-[-10px] rounded-full p-1 z-10 cursor-pointer"
          sx={{
            backgroundColor: primary.main,
            borderWidth: 2,
            borderColor: "#fff",
            fontSize: 12,
            color: "#fff",
          }}
        >
          {item.id}
        </Box> */}
        <Icon size="28" color={primary.main} />
      </Box>

      <div className="flex-1 px-4">
        <p className="text-sm text-gray-800">{item.name}</p>
      </div>

      <div className="text-center">
        <p className="text-gray-400 text-sm">{t("common.total")}</p>
        <p className="font-bold text-lg">{item.total || 0}</p>
      </div>
    </div>
  );
};

export default UserCard;

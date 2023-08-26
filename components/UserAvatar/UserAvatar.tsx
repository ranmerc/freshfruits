import { Avatar, IconButton, Menu, MenuItem, NoSsr } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import { useState } from "react";
import { Logout, Person } from "@mui/icons-material";

export default function UserAvatar() {
  const { username, setUserName } = useUserContext();
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElement);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  const handleLogout = () => {
    setUserName("");
    handleMenuClose();
  };

  if (!username) {
    return null;
  }

  return (
    <NoSsr>
      <IconButton
        id="user-button"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleMenuOpen}
      >
        <Avatar
          sx={{
            width: { xs: 48, md: 36 },
            height: { xs: 48, md: 36 },
          }}
        >
          {username[0]}
        </Avatar>
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "user-button",
        }}
      >
        <MenuItem>
          <Person fontSize="small" sx={{ marginRight: 2 }} />
          {username}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" sx={{ marginRight: 2 }} />
          Logout
        </MenuItem>
      </Menu>
    </NoSsr>
  );
}

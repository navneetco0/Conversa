import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Avatar,
} from "@chakra-ui/react";
import React from "react";

interface MenuBtnProps {
  data: any;
}

const MenuBtn: React.FC<MenuBtnProps> = ({ data }) => {

    const [profile, setProfile] = React.useState<boolean>(false);

    const Logout = () => {
        localStorage.removeItem("chit-chat");
        window.location.href = "/login";
    }
    const showProfile = () => {

    }
  return (
    <Menu>
      <MenuButton as={Button} variant={"unstyled"}>
        <Avatar name={data?.username} src={data?.profile_pic} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={showProfile} >Profile</MenuItem>
        <MenuItem onClick={Logout} >Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuBtn;

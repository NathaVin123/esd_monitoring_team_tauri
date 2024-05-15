import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface dropdownProps {

}


export const DropdownComponent = ({ items }) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Options
      </MenuButton>
      <MenuList>
          {items.map((item: any, index : any) => {
              return <MenuItem key={index}>{item.name}</MenuItem> // Adjust to match your data structure
          })}
      </MenuList>
    </Menu>
  );
};

export default DropdownComponent;

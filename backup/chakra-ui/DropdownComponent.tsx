// import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import {useState} from "react";
//
// interface dropdownProps {
//
// }
//
//
// export const DropdownComponent = ({ items, label, field, onItemSelected }) => {
//     const [selectedItem, setSelectedItem] = useState(null);
//
//     const handleItemClick = (item) => {
//         setSelectedItem(item);
//         onItemSelected(item);
//     };
//
//   return (
//     <Menu>
//       <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
//           {selectedItem ? (field === 'Role' ? selectedItem.role_name : ( field === 'Team' ? selectedItem.team_name : selectedItem.value )) : '-'}
//       </MenuButton>
//       <MenuList>
//           {items.map((item: any, index : any) => {
//               if(field === 'Role'){
//                   return <MenuItem key={index} onClick={() => {handleItemClick(item)}}>{item.role_name}</MenuItem> // Adjust to match your data structure
//               } else if(field === 'Team') {
//                   return <MenuItem key={index} onClick={() => {handleItemClick(item)}}>{item.team_name}</MenuItem> // Adjust to match your data structure
//               } else if(field === 'Gender') {
//                   return <MenuItem key={index} onClick={() => {handleItemClick(item)}}>{item.value}</MenuItem> // Adjust to match your data structure
//               }
//           })}
//       </MenuList>
//     </Menu>
//   );
// };
//
// export default DropdownComponent;

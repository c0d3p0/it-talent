import { useDispatch, useSelector } from "react-redux";

import { setEditMode } from "../../features/EditMode";
import HeaderView from "./HeaderView";


export default function Header() {
  const dispatch = useDispatch();
  const editMode = useSelector((state: any) => state.editMode.value as boolean);
  const toggleMode = () => {dispatch(setEditMode(!editMode));};


  return (
    <HeaderView
      editMode={editMode}
      toggleMode={toggleMode}
    />
  );
}
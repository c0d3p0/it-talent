import { useDispatch, useSelector } from "react-redux";

import { setEditMode } from "../../features/EditMode";
import HeaderView from "./HeaderView";


export default function Header() {
  const dispatch = useDispatch();
  const editMode = useSelector<any, boolean>((state) => state.editMode.value);
  const toggleMode = () => {dispatch(setEditMode(!editMode));};


  return (
    <HeaderView
      editMode={editMode}
      toggleMode={toggleMode}
    />
  );
}
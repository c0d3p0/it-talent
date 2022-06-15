import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAppActionData } from "../../features/AppActionData";
import { NavLinkView } from "./NavLinkView";
import navLinkMap from "../../data/NavLinkMap";


export default function NavLink() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onSectionClick = (section: string) => {
    const navLinkData = navLinkMap.get(section);

    if(navLinkData) {
      const key = section;
      const params: string[] = [];
      dispatch(setAppActionData({key, params}));
      navigate(navLinkData.path);
    }
  }


  return (
    <NavLinkView
      onSectionClick={onSectionClick}
    />
  );
}

import { useNavigate } from "react-router-dom";

import { NavLinkView } from "./NavLinkView";
import navLinkMap from "../../data/NavLinkMap";


export default function NavLink() {
  const navigate = useNavigate();


  const onSectionClick = (section: string) => {
    const navLinkData = navLinkMap.get(section);

    if(navLinkData)
      navigate(navLinkData.path);
  }


  return (
    <NavLinkView
      onSectionClick={onSectionClick}
    />
  );
}

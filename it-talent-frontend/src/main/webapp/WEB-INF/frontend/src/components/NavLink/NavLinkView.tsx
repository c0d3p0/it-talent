import navLinkMap, { INavLinkData } from "../../data/NavLinkMap";

import "./NavLink.css";


export function NavLinkView(props: IProps) {
  const sectionElements = createSectionElements(props);


  return (
    <div className="nav-link">
      {sectionElements}
    </div>
  );
}


const createSectionElements = (props: IProps) => {
  const elements: JSX.Element[] = [];
  navLinkMap.forEach((v: INavLinkData, k: string) => {
    elements.push(
      <button
        key={k}
        className="button"
        onClick={(e) => {props.onSectionClick(k)}}
      >
        {v.label}
      </button>
    );
  });
  return elements
}


interface IProps {
  onSectionClick(section: string): void;
}
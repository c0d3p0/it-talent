import Search from "../Search/Search";

import logoFull from "../../images/logo_full.svg";

import "./Header.css";


export default function HeaderView(props: IProps) {
  const {editMode, toggleMode} = props;

  return (
    <header className="header">
      <div className="logo">
        <img src={logoFull} />
      </div>
      <Search />
      <div className="app-mode">
        <button
          className={`squared-button bi ${editMode ? "bi-unlock" : "bi-lock"}`}
          title={`${editMode ? "Deactivate" : "Activate"} Edit Mode`}
          onClick={(e) => toggleMode()}
        />
      </div>
    </header>
  );
}


interface IProps {
  editMode: boolean;
  toggleMode(): void;
}
import { ISearchData } from "../../data/SearchMap";

import "./Search.css";


export default function SearchView(props: IProps) {
  if(props.searchDataList && props.searchDataList.length > 0) {
    return (
      <div className="search">
        <form onSubmit={(e) => {e.preventDefault(); props.onSearchClick()}}>
          <input
            type="text"
            value={props?.search ? props.search : ""}
            onChange={(e) => props?.setSearch(e.target.value)}
            placeholder="Search"
          />
          {createSearchTypeElement(props)}
          <button className="button-border" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }

  return (null);
}


const createSearchTypeElement = (props: IProps) => {
  const options = createSearchTypeOptions(props.searchDataList);

  if(options) {
    return (
      <select
        className="button-border"
        value={props.searchType}
        onChange={(e) => props?.setSearchType(e.target.value)}
      >
        {options}
      </select>
    );
  }

  return null;
}

const createSearchTypeOptions = (searchDataList?: ISearchData[]) => {
  return searchDataList?.map((searchData) => {
    return (
      <option key={searchData.key} value={searchData.key}>
        {searchData.label}
      </option>
    );
  });
}


interface IProps {
  searchDataList?: ISearchData[];
  search: string;
  searchType: string;
  setSearch(search: string): void;
  setSearchType(searchType: string): void;
  onSearchClick(): void;
}
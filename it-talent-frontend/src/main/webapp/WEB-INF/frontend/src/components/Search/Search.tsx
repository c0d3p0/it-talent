import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import searchMap, { ISearchData } from "../../data/SearchMap";
import SearchView from "./SearchView";
import appService from "../../service/AppService";


export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchDataList, setSearchDataList] = useState<ISearchData[]>([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  useEffect(() => refereshSearchComponent(), [location]);


  const refereshSearchComponent = () => {
    const key = getSection();
    const searchDataList = searchMap.get(key);
    const searchData = searchDataList?.filter((sd) => sd.key === searchType)[0];
    let newSearchType = searchData ? searchData.key : undefined;
    newSearchType = newSearchType ?? searchDataList?.[0]?.key;
    setSearchDataList(searchDataList ?? []);
    setSearchType(newSearchType ?? "");
  }

  const onSearchClick = () => {
    const params = search ? [search] : null;
    const searchData = searchDataList.filter((sd) => sd.key === searchType)[0];
    const validSearch = params && searchData ? true : false;
    const section = getSection();
    const type = validSearch ? searchData.path : "";
    const path = validSearch ? `/${section}${type}/${search}` : `/${section}`;
    navigate(path);
  }


  return (
    <SearchView
      searchDataList={searchDataList}
      search={search}
      searchType={searchType}
      setSearch={setSearch}
      setSearchType={setSearchType}
      onSearchClick={onSearchClick}
    />
  )
}


const getSection = () => {
  const urlParams = appService.getCurrentURLParameters();
  const aux = urlParams[1] ? urlParams[1].split("-")[0] : "skill";
  return validSectionSet.has(aux) ? aux : "skill";
}

const validSectionSet = new Set(["person", "skill"]);
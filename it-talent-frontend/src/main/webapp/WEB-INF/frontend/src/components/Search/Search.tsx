import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IAppActionData, setAppActionData } from "../../features/AppActionData";
import searchMap, { ISearchData } from "../../data/SearchMap";
import appActionMap from "../../data/AppActionMap";
import SearchView from "./SearchView";


export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchDataList, setSearchDataList] = useState([] as ISearchData[]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const appActionData = useSelector((state: any) =>
      state.appActionData.value as IAppActionData);
  const appAction = appActionMap.get(appActionData.key);
  useEffect(() => refereshSearchComponent(), [appActionData]);


  const refereshSearchComponent = () => {
    const key = appAction?.section ?? "";
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
    const key = validSearch ? searchType : appAction?.section;
    const section = appAction?.section;
    const path = validSearch ?
        `/${section}${searchData.path}/${search}` : `/${section}`;
    dispatch(setAppActionData({key, params}));
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
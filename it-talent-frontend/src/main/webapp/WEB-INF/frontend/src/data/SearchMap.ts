const searchMap = new Map<string, ISearchData[]>([
  [
    "person",
    [
      {key: "person-find-by-name", label: "By Name", path: "/name"},
      {key: "person-find-by-id", label: "By Id", path: "/id"}
    ]
  ],
  [
    "skill",
    [
      {key: "skill-find-by-title", label: "By Title", path: "/title"},
      {key: "skill-find-by-id", label: "By Id", path: "/id"}
    ]
  ]
]);


interface ISearchData {
  key: string;
  label: string;
  path: string;
}


export type { ISearchData };
export default searchMap;
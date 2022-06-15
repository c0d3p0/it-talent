const navLinkMap = new Map<string, INavLinkData>([
  ["skill", {label: "Skill", path: "/skill"}],
  ["person", {label: "Person", path: "/person"}]
]);


interface INavLinkData {
  label: string;
  path: string;
}


export type { INavLinkData }
export default navLinkMap;
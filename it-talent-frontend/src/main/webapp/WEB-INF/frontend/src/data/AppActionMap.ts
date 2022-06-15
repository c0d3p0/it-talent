const baseURL = "http://localhost:3000/frontend";


const appActionMap = new Map<string, IAppAction>([
  [
    "person", 
    {
      section: "person",
      url: baseURL + "/person-skill/person",
      method: "GET"
    }
  ],
  [
    "person-find", 
    {
      section: "person",
      url: baseURL + "/person-skill/person",
      method: "GET"
    }
  ],
  [
    "person-find-by-id", 
    {
      section: "person",
      url: baseURL + "/person-skill/person",
      method: "GET"
    }
  ],
  [
    "person-find-by-name", 
    {
      section: "person",
      url: baseURL + "/person-skill/person/name-with",
      method: "GET"
    }
  ],
  [
    "person-find-by-skill-id", 
    {
      section: "person",
      url: baseURL + "/person-skill/person/with-skill",
      method: "GET"
    }
  ],
  [
    "person-add", 
    {
      section: "person",
      url: baseURL + "/person",
      method: "POST"
    }
  ],
  [
    "person-edit", 
    {
      section: "person",
      url: baseURL + "/person",
      method: "PUT"
    }
  ],
  [
    "person-remove", 
    {
      section: "person",
      url: baseURL + "/person-skill/person",
      method: "DELETE"
    }
  ],



  [
    "skill", 
    {
      section: "skill",
      url: baseURL + "/skill",
      method: "GET"
    }
  ],
  [
    "skill-find", 
    {
      section: "skill",
      url: baseURL + "/skill",
      method: "GET"
    }
  ],
  [
    "skill-find-by-id", 
    {
      section: "skill",
      url: baseURL + "/skill",
      method: "GET"
    }
  ],
  [
    "skill-find-by-title", 
    {
      section: "skill",
      url: baseURL + "/skill/title-with",
      method: "GET"
    }
  ],
  [
    "skill-find-by-person-id", 
    {
      section: "skill",
      url: baseURL + "/person-skill/skill/by-person",
      method: "GET"
    }
  ],
  [
    "skill-add", 
    {
      section: "skill",
      url: baseURL + "/skill",
      method: "POST"
    }
  ],
  [
    "skill-edit", 
    {
      section: "skill",
      url: baseURL + "/skill",
      method: "PUT"
    }
  ],
  [
    "skill-remove", 
    {
      section: "skill",
      url: baseURL + "/person-skill/skill",
      method: "DELETE"
    }
  ],


  [
    "person-skill-add", 
    {
      section: "person",
      url: baseURL + "/person-skill/person-skill",
      method: "POST"
    }
  ],
  [
    "person-skill-remove", 
    {
      section: "person",
      url: baseURL + "/person-skill/person-skill/by-id",
      method: "DELETE"
    }
  ],
]);


interface IAppAction {
  section: string;
  url: string;
  method: string;
}


export type { IAppAction };
export default appActionMap;
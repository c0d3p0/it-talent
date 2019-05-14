const apiAccessMap = 
{
  person:
  {
    get0: "getAllPeople",
    get1: "getPersonById",
    get2: "getPeopleByName",
    get3: "getPeopleBySkillId",
    get4: "getAllSkills",
    add0: "addPerson",
    add1: "addPersonSkill",
    edit0: "editPerson",
    remove0: "removePerson",
    remove1: "removePersonSkill",
  },
  skill:
  {
    get0: "getAllSkills",
    get1: "getSkillById",
    get2: "getSkillByTitle",
    add0: "addSkill",
    edit0: "editSkill",
    remove0: "removeSkill",
  }
}


export default apiAccessMap;
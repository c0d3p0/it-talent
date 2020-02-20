const port = 3000;

const apiDataMap =
{
  getAllPeople:
  {
    method: "GET",
    url:    "http://localhost:" + port +
            "/frontend/person-skill/person",
    dataKey: 'person'
  },
  getPersonById:
  {
    method: "GET",
    url:    "http://localhost:" + port +
            "/frontend/person-skill/person",
    dataKey: 'person',
    appendData: true
  },
  getPeopleByName:
  {
    method: "GET",
    url:    "http://localhost:" + port +
            "/frontend/person-skill/person/name-with",
    dataKey: 'person',
    appendData: true
  },
  getPeopleBySkillId:
  {
    method: "GET",
    url:    "http://localhost:" + port +
            "/frontend/person-skill/person/with-skill",
    dataKey: 'person',
    appendData: true
  },
  addPerson:
  {
    method: "POST",
    url:    "http://localhost:" + port +
            "/frontend/person",
  },
  editPerson:
  {
    method: "PUT",
    url:    "http://localhost:" + port +
            "/frontend/person",
    dataKey: 'person',
    appendData: true
  },
  removePerson:
  {
    method: "DELETE",
    url:    "http://localhost:" + port +
            "/frontend/person",
    dataKey: 'person',
    appendData: true
  },
  getAllSkills:
  {
    method: "GET",
    url:    "http://localhost:" + port +
            "/frontend/skill",
    dataKey: 'skill'
  },
  getSkillById:
  {
    method: "GET",
    url:    "http://localhost:" + port +
            "/frontend/skill",
    dataKey: 'skill',
    appendData: true
  },
  getSkillByTitle:
  {
    method : "GET",
    url:    "http://localhost:" + port +
            "/frontend/skill/title-with",
    dataKey: 'skill',
    appendData: true
  },
  addSkill:
  {
    method: "POST",
    url:    "http://localhost:" + port +
            "/frontend/skill",
    dataKey: 'skill'
  },
  editSkill:
  {
    method: "PUT",
    url:    "http://localhost:" + port +
            "/frontend/skill",
    dataKey: 'skill',
    appendData: true
  },
  removeSkill:
  {
    method: "DELETE",
    url:    "http://localhost:" + port +
            "/frontend/skill",
    dataKey: 'skill',
    appendData: true
  },
  addPersonSkill:
  {
    method: "POST",
    url:    "http://localhost:" + port +
            "/frontend/person-skill",
    dataKey: 'personSkill'
  },
  removePersonSkill:
  {
    method: "DELETE",
    url:    "http://localhost:" + port +
            "/frontend/person-skill",
    dataKey: 'personSkill',
    appendData: true
  }
}


export default apiDataMap;
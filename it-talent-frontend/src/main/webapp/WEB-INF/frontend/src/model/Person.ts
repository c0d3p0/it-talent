import Skill from "./Skill";


class Person {
  constructor(id?: number, name?: string, age?: number,
      country?: string, email?: string, skillList?: Skill[]) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.country = country;
    this.email = email;
    this.skillList = skillList;
  }


  id?: number;
  name?: string;
  age?: number;
  country?: string;
  email?: string;
  skillList?: Skill[];
}


export default Person;
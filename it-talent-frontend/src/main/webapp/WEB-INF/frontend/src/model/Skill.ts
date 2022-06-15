import Person from "./Person";


class Skill {
  constructor(id?: number, title?: string,
      description?: string, peopleList?: Person[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.peopleList = peopleList;
  }


  id?: number;
  title?: string;
  description?: string;
  peopleList?: Person[];
}


export default Skill;
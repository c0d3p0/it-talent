import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import appActionMap from "../../data/AppActionMap";
import appService from "../../service/AppService";
import PersonListView from "./PersonListView";
import Person from "../../model/Person";


export default function PersonList() {
  const navigate = useNavigate();
  const location = useLocation();
  const editMode = useSelector<any, boolean>((state) => state.editMode.value);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [message, setMessage] = useState("");
  const [refreshTime, setRefreshTime] = useState(Date.now());
  useEffect(() => fetchData(), [location, refreshTime]);


  const fetchData = () => {
    const urlParams = appService.getCurrentURLParameters();
    const appAction = getAppAction(urlParams);
    const params = urlParams[3] ? [urlParams[3]] : [];
    appService.exchange(appAction, params).then((response) => {
      const data = appService.convertResponseToArray<Person>(response.data);
      const m = data.length < 1 ? "Not a single person was found!": "";
      setMessage(m);
      setPeople(data);
    }).catch((error) => {
      const m = "An error happened when trying to request the data!";
      setMessage(m);
      setPeople([]);
      console.log(m);
      console.log(appAction);
      console.log(error);
    });
  }
  
  const onAddPersonClick = () => {
    navigate("/person-form");
  }

  const onSkillClick = (id?: string) => {
    if(id)
      navigate(`/skill/id/${id}`);
  }

  const onShowPersonSkillsClick = (id?: string) => {
    if(id)
      navigate(`/skill/by-person/${id}`);
  }

  const onEditPersonSkillsClick = (id?: string) => {
    if(id)
      navigate(`/person-skill-form/${id}`);
  }

  const onEditClick = (id?: string) => {
    if(id)
      navigate(`/person-form/${id}`);
  }

  const onRemoveClick = (person: Person) => {
    const suffix = person.name ? `the person ${person.name}` : "this person";
    const question = `Are you sure you want to remove ${suffix}?`

    if(confirm(question)) {
      const appAction = appActionMap.get("person-remove");
      const params = [person.id?.toString() ?? "-1"];
      appService.exchange<Person>(appAction, params).then((response) => {
        setRefreshTime(Date.now());
        navigate("/person");
      }).catch((error) => {
        let message = `An error happened removing ${suffix}!`;
        setMessage(message);
        console.log(message);
        console.log(error);
      });
    }
  }


  return (
    <PersonListView
      editMode={editMode}
      people={people}
      message={message}
      onAddPersonClick={onAddPersonClick}
      onEditClick={onEditClick}
      onRemoveClick={onRemoveClick}
      onSkillClick={onSkillClick}
      onShowPersonSkillsClick={onShowPersonSkillsClick}
      onEditPersonSkillsClick={onEditPersonSkillsClick}
    />
  );
}


const getAppAction = (urlParams: string[]) => {
  let aux = appActionKeyMap.get(urlParams[2]);
  let key = aux ? aux : appActionKeyMap.entries().next().value[1];
  return appActionMap.get(key);
}

const appActionKeyMap = new Map<string, string>([
  ["", "person-find"],
  ["id", "person-find-by-id"],
  ["name", "person-find-by-name"],
  ["with-skill", "person-find-by-skill-id"]
]);
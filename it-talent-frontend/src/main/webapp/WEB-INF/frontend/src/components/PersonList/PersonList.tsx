import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IAppActionData, setAppActionData } from "../../features/AppActionData";
import appActionMap from "../../data/AppActionMap";
import appService from "../../service/AppService";
import PersonListView from "./PersonListView";
import Person from "../../model/Person";


export default function PersonList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [people, setPeople] = useState([] as Person[]);
  const [message, setMessage] = useState("Please wait, loading the data...");
  const editMode = useSelector((state: any) => state.editMode.value as boolean);
  const appActionData = useSelector((state: any) =>
      state.appActionData.value as IAppActionData);
  const appAction = appActionMap.get(appActionData?.key);
  useEffect(() => fetchData(), [appActionData]);
  useEffect(() => fixAppActionData(), []);


  const fixAppActionData = () => {
    if(!validAppActionSet.has(appActionData.key))
      dispatch(setAppActionData({key: "person", params: []}));
  }

  const fetchData = () => {
    if(appAction) {
      appService.exchange(appAction, appActionData.params).then((response) => {
        const data = appService.convertResponseToArray<Person>(response.data);
        const m = data.length < 1 ? "Not a single person was found!": "";
        setMessage(m);
        setPeople(data);
      }).catch((error) => {
        const m = "An error happened when trying to request the data!";
        setMessage(m);
        console.log(m);
        console.log(appAction);
        console.log(error);
      });
    }
  }
  
  const onAddPersonClick = () => {
    const key = "person-add";
    dispatch(setAppActionData({key, params: [], previous: appActionData}));
    navigate("/person-form");
  }

  const onSkillClick = (id?: string) => {
    if(id) {
      const key = "skill-find-by-id";
      dispatch(setAppActionData({key, params: [id]}));
      navigate(`/skill/id/${id}`);
    }
  }

  const onShowPersonSkillsClick = (id?: string) => {
    if(id) {
      const key = "skill-find-by-person-id";
      dispatch(setAppActionData({key, params: [id]}));
      navigate(`/skill/by-person/${id}`);
    }
  }

  const onEditPersonSkillsClick = (id?: string) => {
    if(id) {
      const key = "person-skill-add";
      dispatch(setAppActionData({key, params: [id], previous: appActionData}));
      navigate(`/person-skill-form/id/${id}`);
    }
  }

  const onEditClick = (id?: string) => {
    if(id) {
      const key = "person-edit";
      dispatch(setAppActionData({key, params: [id], previous: appActionData}));
      navigate(`/person-form/id/${id}`);
    }
  }

  const onRemoveClick = (person: Person) => {
    const suffix = person.name ? `the person ${person.name}` : "this person";
    const question = `Are you sure you want to remove ${suffix}?`

    if(confirm(question)) {
      const appAction = appActionMap.get("person-remove");
      const params = [person.id?.toString() ?? "-1"];
      appService.exchange<Person>(appAction, params).then((response) => {
        dispatch(setAppActionData({key: "person-find", params: []}));
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
      appAction={appAction}
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


const validAppActionSet = new Set(["person", "person-find",
    "person-find-by-id", "person-find-by-name", "person-find-by-skill-id"]);



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IAppActionData, setAppActionData } from "../../features/AppActionData";
import appActionMap from "../../data/AppActionMap";
import appService from "../../service/AppService";
import SkillListView from "./SkillListView";
import Skill from "../../model/Skill";


export default function SkillList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([] as Skill[]);
  const [message, setMessage] = useState("Please wait, loading the data...");
  const editMode = useSelector((state: any) => state.editMode.value as boolean);
  const appActionData = useSelector((state: any) =>
      state.appActionData.value as IAppActionData);
  const appAction = appActionMap.get(appActionData?.key);
  useEffect(() => fetchData(), [appActionData]);
  useEffect(() => fixAppActionData(), []);


  const fixAppActionData = () => {
    if(!validAppActionSet.has(appActionData.key))
      dispatch(setAppActionData({key: "skill-find", params: []}));
  }

  const fetchData = () => {
    if(validAppActionSet.has(appActionData.key)) {
      appService.exchange(appAction, appActionData.params).then((response) => {
        const data = appService.convertResponseToArray<Skill>(response.data);
        const m = data.length < 1 ? "Not a single skill was found!": "";
        setMessage(m);
        setSkills(data);
      }).catch((error) => {
        const m = "An error happened when trying to request the data!";
        setMessage(m);
        console.log(m);
        console.log(appAction);
        console.log(error);
      });
    }
  }
  
  const onAddSkillClick = () => {
    const key = "skill-add";
    dispatch(setAppActionData({key, params: [], previous: appActionData}));
    navigate("/skill-form");
  }

  const onShowPeopleWithThisSkillClick = (id?: string) => {
    if(id) {
      const key = "person-find-by-skill-id";
      dispatch(setAppActionData({key, params: [id]}));
      navigate(`/person/with-skill/${id}`);
    }
  }

  const onEditClick = (id?: string) => {
    if(id) {
      const key = "skill-edit";
      dispatch(setAppActionData({key, params: [id], previous: appActionData}));
      navigate(`/skill-form/id/${id}`);
    }
  }

  const onRemoveClick = (skill: Skill) => {
    const suffix = skill.title ? `the skill ${skill.title}` : "this skill";
    const question = `Are you sure you want to remove ${suffix}?`

    if(confirm(question)) {
      const appAction = appActionMap.get("skill-remove");
      const params = [skill.id?.toString() ?? "-1"];
      appService.exchange<Skill>(appAction, params).then((response) => {
        dispatch(setAppActionData({key: "skill-find", params: []}));
        navigate("/skill");
      }).catch((error) => {
        let message = `An error happened removing ${suffix}!`;
        setMessage(message);
        console.log(message);
        console.log(error);
      });
    }
  }


  return (
    <SkillListView
      editMode={editMode}
      appAction={appAction}
      skills={skills}
      message={message}
      onAddSkillClick={onAddSkillClick}
      onShowPeopleWithThisSkillClick={onShowPeopleWithThisSkillClick}
      onEditClick={onEditClick}
      onRemoveClick={onRemoveClick}
    />
  );
}


const validAppActionSet = new Set(["skill", "skill-find",
    "skill-find-by-id", "skill-find-by-title", "skill-find-by-person-id"]);

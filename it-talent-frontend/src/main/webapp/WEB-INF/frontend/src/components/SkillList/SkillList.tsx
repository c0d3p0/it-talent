import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import appActionMap from "../../data/AppActionMap";
import appService from "../../service/AppService";
import SkillListView from "./SkillListView";
import Skill from "../../model/Skill";


export default function SkillList() {
  const navigate = useNavigate();
  const location = useLocation();
  const editMode = useSelector<any, boolean>((state) => state.editMode.value);
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [message, setMessage] = useState("");
  const [refreshTime, setRefreshTime] = useState(Date.now());
  useEffect(() => fetchData(), [location, refreshTime]);


  const fetchData = () => {
    const urlParams = appService.getCurrentURLParameters();
    const appAction = getAppAction(urlParams);
    const params = urlParams[3] ? [urlParams[3]] : [];
    appService.exchange(appAction, params).then((response) => {
      const data = appService.convertResponseToArray<Skill>(response.data);
      const m = data.length < 1 ? "Not a single skill was found!": "";
      setMessage(m);
      setSkills(data);
    }).catch((error) => {
      const m = "An error happened when trying to request the data!";
      setMessage(m);
      setSkills([]);
      console.log(m);
      console.log(error);
    });
  }
  
  const onAddSkillClick = () => {
    navigate("/skill-form");
  }

  const onShowPeopleWithSkillClick = (id?: string) => {
    if(id)
      navigate(`/person/with-skill/${id}`);
  }

  const onEditClick = (id?: string) => {
    if(id)
      navigate(`/skill-form/${id}`);
  }

  const onRemoveClick = (skill: Skill) => {
    const suffix = skill.title ? `the skill ${skill.title}` : "this skill";
    const question = `Are you sure you want to remove ${suffix}?`

    if(confirm(question)) {
      const appAction = appActionMap.get("skill-remove");
      const params = [skill.id?.toString() ?? "-1"];
      appService.exchange<Skill>(appAction, params).then((response) => {
        setRefreshTime(Date.now());
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
      skills={skills}
      message={message}
      onAddSkillClick={onAddSkillClick}
      onShowPeopleWithSkillClick={onShowPeopleWithSkillClick}
      onEditClick={onEditClick}
      onRemoveClick={onRemoveClick}
    />
  );
}


const getAppAction = (urlParams: string[]) => {
  let aux = appActionKeyMap.get(urlParams[2]);
  let key = aux ? aux : appActionKeyMap.entries().next().value[1];
  return appActionMap.get(key);
}

const appActionKeyMap = new Map<string, string>([
  ["", "skill-find"],
  ["id", "skill-find-by-id"],
  ["title", "skill-find-by-title"],
  ["by-person", "skill-find-by-person-id"]
]);
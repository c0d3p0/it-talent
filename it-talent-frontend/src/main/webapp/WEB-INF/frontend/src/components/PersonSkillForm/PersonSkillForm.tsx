import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IAppActionData, setAppActionData } from "../../features/AppActionData";
import PersonSkillFormView from "./PersonSkillFormView";
import appService from "../../service/AppService";
import appActionMap from "../../data/AppActionMap";
import Person from "../../model/Person";
import Skill from "../../model/Skill";
import PersonSkill from "../../model/PersonSkill";


export default function PersonSkillForm() {
  const globalDispatch = useDispatch();
  const navigate = useNavigate();
  const editMode = useSelector((state: any) => state.editMode.value as boolean);
  const appActionData = useSelector((state: any) =>
      state.appActionData.value as IAppActionData);
  const [state, dispatch] = useReducer(reducer, createEmptyState());
  useEffect(() => handleFormAccess(), [editMode]);
  useEffect(() => fetchSkills(), [editMode]);
  useEffect(() => fetchPerson(), [editMode, state.refreshForm]);
  useEffect(() => createAvailableSkills(), [state.person, state.skills]);


  const handleFormAccess = () => {
    if(!editMode) {
      const message = "You don't have permission to change any data!";
      dispatch({type: "error", value: message});
    } else
      dispatch({type: "error", value: ""});
  }

  const fetchPerson = () => {
    if(editMode) {
      const appAction = appActionMap.get("person-find-by-id");
      const params = appActionData.params;
      appService.exchange<Person>(appAction, params).then((response) => {
        if(response.data.id)
          dispatch({type: "person", value: response.data});
        else
          dispatch({type: "error", value: "Person to edit not found!"});
      }).catch((error) => {
        const errorMessage = "An error happened getting the people!";
        dispatch({type: "error", value: errorMessage});
        console.log(errorMessage);
        console.log(error);
      });
    }
  }

  const fetchSkills = () => {
    if(editMode) {
      const appAction = appActionMap.get("skill-find");
      appService.exchange(appAction, []).then((response) => {
        const skills = appService.convertResponseToArray<Skill>(response.data);
        dispatch({type: "skills", value: skills});
      }).catch((error) => {
        const errorMessage = "An error happened getting the skills!";
        dispatch({type: "error", errorMessage});
        console.log(errorMessage);
        console.log(error);
      });
    }
  }

  const createAvailableSkills = () => {
    const {skills, person} = state as IState;

    if(skills && person) {
      const addedSet = new Set(person.skillList?.map((skill) => skill.id));
      const availableSkills = skills.filter((s) => !addedSet.has(s.id));
      const newState = {...state, availableSkills, error: ""};
      dispatch({type: "state", value: newState});
    }
  }

  const onAddSkillClick = (skill: Skill) => {
    const appAction = appActionMap.get("person-skill-add");
    const body = new PersonSkill(state.person.id, skill.id);
    appService.exchange<PersonSkill>(appAction, [], body).then((response) => {
      const error = "Refreshing data, wait a minute...";
      const refreshForm = state.refreshForm + 1;
      dispatch({type: "state", value: {...state, error, refreshForm}});
    }).catch((error) => {
      const errorMessage = "An error happened sending the data to the system!";
      console.log(errorMessage);
      console.log(error);
      alert(errorMessage);
    });
  }

  const onRemoveSkillClick = (skill: Skill) => {
    const appAction = appActionMap.get("person-skill-remove");
    const param = [state.person?.id?.toString(), skill.id?.toString()];
    const body = new PersonSkill(state.person?.id, skill.id);
    appService.exchange<PersonSkill>(appAction, param, body).then((response) => {
      const error = "Refreshing data, wait a minute...";
      const refreshForm = state.refreshForm + 1;
      dispatch({type: "state", value: {...state, error, refreshForm}});
    }).catch((error) => {
      const errorMessage = "An error happened sending the data to the system!";
      console.log(errorMessage);
      console.log(error);
      alert(errorMessage);
    });
  }

  const onReturnClick = () => {
    const key = appActionData.previous?.key ?? "person";
    const params = appActionData.previous?.params ?? [];
    const newAppAction = appActionMap.get(key);
    globalDispatch(setAppActionData({key, params}));
    navigate(`/${newAppAction?.section}`);
  }


  return (
    <PersonSkillFormView
      editMode={editMode}
      state={state}
      onAddSkillClick={onAddSkillClick}
      onRemoveSkillClick={onRemoveSkillClick}
      onReturnClick={onReturnClick}
    />
  );
}


const createEmptyState = () => {
  return {
    error: "Please wait, loading the data...", 
    refreshForm: 0
  } as IState;
}

const reducer = (state: any, action: any) => {
  if(action.type === "state")
    return action.value;
  if(action.type === "clear")
    return  {...state, name: "", age: "", country: "", email: ""};
  else
    return {...state, [action.type]: action.value};
}

interface IState {
  person?: Person;
  skills: Skill[];
  availableSkills?: Skill[];
  error: string;
  refreshForm: number;
}


export type { IState }
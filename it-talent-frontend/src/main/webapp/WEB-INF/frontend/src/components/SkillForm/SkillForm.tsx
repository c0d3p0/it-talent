import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import SkillFormView from "./SkillFormView";
import appActionMap from "../../data/AppActionMap";
import appService from "../../service/AppService";
import Skill from "../../model/Skill";


export default function SkillForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const editMode = useSelector<any, boolean>((state) => state.editMode.value);
  const [state, dispatch] = useReducer(reducer, createEmptyState());
  useEffect(() => handleFormAccess(), [editMode]);
  useEffect(() => fetchData(), [editMode, location]);


  const handleFormAccess = () => {
    if(!editMode) {
      const message = "You don't have permission to change any data!";
      dispatch({type: "message", value: message});
    } else
      dispatch({type: "state", value: createEmptyState()});
  }

  const fetchData = () => {
    if(editMode && state.isEditing) {
      const urlParams = appService.getCurrentURLParameters();
      const appAction = appActionMap.get("skill-find-by-id");
      const params = urlParams[2] ? [urlParams[2]] : ["-1"];
      appService.exchange<Skill>(appAction, params).then((response) => {
        const isEditing = state.isEditing;
        const newState = {...response.data, message: "", isEditing};
        dispatch({type: "state", value: newState});
      }).catch((error) => {
        const errorMessage = "An error happened getting the skill to edit!";
        dispatch({type: "message", value: errorMessage});
        console.log(errorMessage);
        console.log(error);
      });
    }
  }

  const onSubmit = () => {
    const {title, description} = state;
    const skill = new Skill(undefined, title, description);
    const validation = validateSkill(skill);

    if(validation.valid) {
      const urlParams = appService.getCurrentURLParameters();
      const key = state.isEditing ? "skill-edit" : "skill-add";
      const appAction = appActionMap.get(key);
      const params = state.isEditing ? [urlParams[2]] : [];
      appService.exchange<Skill>(appAction, params, skill).then((response) => {
        alert(`Skill ${state.isEditing ? "edited" : "added"} in the system!`);

        if(!state.isEditing)
          dispatch({type: "clear", value: null});
      }).catch((error) => {
        const errorMessage = "An error happened sending the data to the system!";
        console.log(errorMessage);
        console.log(error);
        alert(errorMessage);
      });
    } else {
      console.log(validation.error);
      alert(validation.error);
    }
  }

  const onReturnClick = () => {
    navigate(-1);
  }

  const onClearClick = () => {
    dispatch({type: "clear"});
  }

  const updateState = (type: string, value: string) => {
    dispatch({type, value});
  }

  const validateSkill = (skill: Skill) => {
    if(!skill.title)
      return {valid: false, error: "You need to inform a title!"};

    if(!skill.description)
      return {valid: false, error: "You need to inform a description!"};

    return {valid: true, error: ""};
  }


  return (
    <SkillFormView
      editMode={editMode}
      state={state}
      updateState={updateState}
      onSubmit={onSubmit}
      onClearClick={onClearClick}
      onReturnClick={onReturnClick}
    />
  );
}


const createEmptyState = () => {
  const urlParams = appService.getCurrentURLParameters();
  const isEditing = urlParams[2] ? true : false;
  const message = isEditing ? "Please wait, loading the data..." : "";

  return {
    isEditing, message,
    id: undefined, title: "", description: ""
  } as IState;
}

const reducer = (state: any, action: any) => {
  if(action.type === "state")
    return action.value;
  if(action.type === "clear")
    return  {...state, title: "", description: ""};
  else
    return {...state, [action.type]: action.value};
}

interface IState {
  isEditing: boolean;
  message?: string;

  id?: number;
  title?: string;
  description?: string;
}


export type { IState }
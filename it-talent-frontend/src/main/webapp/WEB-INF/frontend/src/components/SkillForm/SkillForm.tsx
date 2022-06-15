import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IAppActionData, setAppActionData } from "../../features/AppActionData";
import SkillFormView from "./SkillFormView";
import appActionMap from "../../data/AppActionMap";
import appService from "../../service/AppService";
import Skill from "../../model/Skill";


export default function SkillForm() {
  const globalDispatch = useDispatch();
  const navigate = useNavigate();
  const editMode = useSelector((state: any) => state.editMode.value as boolean);
  const appActionData = useSelector((state: any) =>
      state.appActionData.value as IAppActionData);
  const isAdding = appActionData.key !== "skill-edit";
  const [state, dispatch] = useReducer(reducer, createEmptyState(isAdding));
  const title = `${isAdding ? "Add" : "Edit"} Skill`;
  useEffect(() => handleFormAccess(), [editMode]);
  useEffect(() => fetchData(), [editMode, appActionData]);


  const handleFormAccess = () => {
    if(!editMode) {
      const message = "You don't have permission to change any data!";
      dispatch({type: "error", value: message});
    } else
      dispatch({type: "state", value: createEmptyState(isAdding)});

    if(!validAppActionSet.has(appActionData.key)) {
      const key = "skill-add";
      const previous = appActionData.previous;
      globalDispatch(setAppActionData({key, params: [], previous}));
    }
  }

  const fetchData = () => {
    if(editMode && !isAdding) {
      const appAction = appActionMap.get("skill-find-by-id");
      const params = appActionData.params;
      appService.exchange<Skill>(appAction, params).then((response) => {
        const state = {...response.data, error: ""};
        dispatch({type: "state", value: state});
      }).catch((error) => {
        const errorMessage = "An error happened getting the skill to edit!";
        dispatch({type: "error", value: errorMessage});
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
      const appAction = appActionMap.get(appActionData.key);
      const params = appActionData.params;
      appService.exchange<Skill>(appAction, params, skill).then((response) => {
        alert(`Skill ${isAdding ? "added" : "edited"} in the system`);

        if(isAdding)
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
    const key = appActionData.previous?.key ?? "skill";
    const params = appActionData.previous?.params ?? [];
    const newAppAction = appActionMap.get(key);
    globalDispatch(setAppActionData({key, params}));
    navigate(`/${newAppAction?.section}`);
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
      isAdding={isAdding}
      title={title}
      state={state}
      updateState={updateState}
      onSubmit={onSubmit}
      onClearClick={onClearClick}
      onReturnClick={onReturnClick}
    />
  );
}


const createEmptyState = (isAdding: boolean) => {
  const error = isAdding ? "" : "Please wait, loading the data...";
  return {id: undefined, title: "", description: "", error} as IState;
}

const reducer = (state: any, action: any) => {
  if(action.type === "state")
    return action.value;
  if(action.type === "clear")
    return  {...state, title: "", description: ""};
  else
    return {...state, [action.type]: action.value};
}

const validAppActionSet = new Set(["skill-add", "skill-edit"]);

interface IState {
  id?: number;
  title?: string;
  description?: string;
  error?: string;
}


export type { IState }
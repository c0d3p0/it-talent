import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IAppActionData, setAppActionData } from "../../features/AppActionData";
import PersonFormView from "./PersonFormView";
import appActionMap from "../../data/AppActionMap";
import Person from "../../model/Person";
import appService from "../../service/AppService";


export default function PersonForm() {
  const globalDispatch = useDispatch();
  const navigate = useNavigate();
  const editMode = useSelector((state: any) => state.editMode.value as boolean);
  const appActionData = useSelector((state: any) =>
      state.appActionData.value as IAppActionData);
  const isAdding = appActionData.key !== "person-edit";
  const [state, dispatch] = useReducer(reducer, createEmptyState(isAdding));
  const title = `${isAdding ? "Add" : "Edit"} Person`;
  useEffect(() => handleFormAccess(), [editMode]);
  useEffect(() => fetchData(), [editMode, appActionData]);


  const handleFormAccess = () => {
    if(!editMode) {
      const message = "You don't have permission to change any data!";
      dispatch({type: "error", value: message});
    } else
      dispatch({type: "state", value: createEmptyState(isAdding)});

    if(!validAppActionSet.has(appActionData.key)) {
      const key = "person-add";
      const previous = appActionData.previous;
      globalDispatch(setAppActionData({key, params: [], previous}));
    }
  }

  const fetchData = () => {
    if(editMode && !isAdding) {
      const appAction = appActionMap.get("person-find-by-id");
      const params = appActionData.params;
      appService.exchange<Person>(appAction, params).then((response) => {
        const state = {...response.data, error: ""};
        dispatch({type: "state", value: state});
      }).catch((error) => {
        const errorMessage = "An error happened getting the person to edit!";
        dispatch({type: "error", value: errorMessage});
        console.log(errorMessage);
        console.log(error);
      });
    }
  }

  const onSubmit = () => {
    const {name, age, country, email} = state;
    const decimalAge = parseInt(age); 
    const person = new Person(undefined, name, decimalAge, country, email);
    const validation = validatePerson(person);

    if(validation.valid) {
      const appAction = appActionMap.get(appActionData.key);
      const params = appActionData.params;
      appService.exchange<Person>(appAction, params, person).then((response) => {
        alert(`Person ${isAdding ? "added" : "edited"} in the system`);

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
    const key = appActionData.previous?.key ?? "person";
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

  const validatePerson = (person: Person) => {
    if(!person.name)
      return {valid: false, error: "You need to inform a name!"};

    if(!person.age || isNaN(person.age))
      return {valid: false, error: "You need to inform an age number!"};

    if(person.age < 16)
      return {valid: false, error: "Only 16+ people can be part of our system!"};

    if(!person.country)
      return {valid: false, error: "You need to inform a country!"};

    if(!person.email)
      return {valid: false, error: "You need to inform an email!"};

    if(!person.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
      return {valid: false, error: "Invalid email format, it must look like abcde@mnopq.xyz"};

    return {valid: true, error: ""};
  }


  return (
    <PersonFormView
      editMode={editMode}
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
  return {
    id: undefined,
    name: "", age: "", country: "",
    email: "", error
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

const validAppActionSet = new Set(["person-add", "person-edit"]);

interface IState {
  id?: number;
  name?: string;
  age?: string;
  country?: string;
  email?: string;
  error?: string;
}


export type { IState }
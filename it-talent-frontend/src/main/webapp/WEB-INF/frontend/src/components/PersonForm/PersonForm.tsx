import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import PersonFormView from "./PersonFormView";
import appActionMap from "../../data/AppActionMap";
import Person from "../../model/Person";
import appService from "../../service/AppService";


export default function PersonForm() {
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
    } else {
      dispatch({type: "state", value: createEmptyState()});
    }
  }

  const fetchData = () => {
    if(editMode && state.isEditing) {
      const urlParams = appService.getCurrentURLParameters();
      const appAction = appActionMap.get("person-find-by-id");
      const params = urlParams[2] ? [urlParams[2]] : ["-1"];
      appService.exchange<Person>(appAction, params).then((response) => {
        const isEditing = state.isEditing;
        const newState = {...response.data, message: "", isEditing};
        dispatch({type: "state", value: newState});
      }).catch((error) => {
        const errorMessage = "An error happened getting the person to edit!";
        dispatch({type: "message", value: errorMessage});
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
      const urlParams = appService.getCurrentURLParameters();
      const key = state.isEditing ? "person-edit" : "person-add";
      const appAction = appActionMap.get(key);
      const params = state.isEditing ? [urlParams[2]] : [];
      appService.exchange<Person>(appAction, params, person).then((response) => {
        alert(`Person ${state.isEditing ? "edited" : "added"} in the system!`);

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
    id: undefined, name: "", age: "", country: "", email: ""
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
  isEditing: boolean;
  message?: string;

  id?: number;
  name?: string;
  age?: string;
  country?: string;
  email?: string;
}


export type { IState }
import axios, { AxiosRequestHeaders } from "axios";

import appActionMap, { IAppAction } from "../data/AppActionMap";


class AppService {
  exchange = <T>(appAction?: IAppAction, params?: string[], body?: any) => {
    if(appAction) {
      const config = this.createAxiosConfig({});
      const url = this.addParametersToURL(appAction.url, params);
      const method = appAction.method.toLowerCase();

      if(method === "get")
        return axios.get<T>(url, config);

      if(method === "post")
        return axios.post<T>(url, body, config);

      if(method === "put")
        return axios.put<T>(url, body, config);

      if(method === "patch")
        return axios.patch<T>(url, body, config);

      if(method === "delete")
        return axios.delete<T>(url, config);
    }

    throw Error("Invalid request");
  }

  convertResponseToArray = <T>(data: any | Catalogue<any> | any[]) => {
    if(Array.isArray(data))
      return data as T[];
    
    if(data) {
      const c = data as Catalogue<T>;

      if(c?.list)
        return c.list;

      if(Object.keys(data).length > 1)
        return [data] as T[];
    }

    return [] as T[];
  }

  addParametersToURL = (url: string, params?: string[]) => {
    return params && params.length > 0 ? `${url}/${params.join("/")}` : url; 
  }

  createAxiosConfig = (attributes: Record<string, string | number | boolean>) => {
    const headers: AxiosRequestHeaders = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
    return {headers: Object.assign(headers, attributes)};
  }

  getCurrentOrDefaultSection = (currentKey: string, section: string) => {
    if(section === "person" || section === "skill") {
      const apiAction = appActionMap.get(currentKey);
      return apiAction ? apiAction : appActionMap.get(section);
    }

    throw Error("Invalid section!");
  }
}


interface Catalogue<T> {
  list: T[];
}


const appService = new AppService();
export default appService;
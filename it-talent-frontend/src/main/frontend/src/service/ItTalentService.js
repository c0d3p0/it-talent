import sectionsInfo from '../config/SectionsInfo';
import operationsInfo from '../config/OperationsInfo';
import componentMap from '../config/ComponentMap';
import searchOptionsMap from '../config/SearchOptionsMap';
import apiAccessMap from '../config/ApiAccessMap';
import apiDataMap from '../config/ApiDataMap';
import formDisabledFieldMap from '../config/FormDisabledFieldMap';
import formFieldNameMap from '../config/FormFieldNameMap';
import jsUtil from '../util/JSUtil';


class ItTalentService
{
  setSectionState = (sectionState) =>
  {
    if(!sectionState)
      return;

    this.sectionState = sectionState;
    const {sectionInfoId, operationInfoId} = sectionState;

    if(jsUtil.isNumber(sectionInfoId))
      this.sectionInfo = sectionsInfo[sectionInfoId];

    if(jsUtil.isNumber(operationInfoId))
      this.operationInfo = operationsInfo[operationInfoId];
  }

  getSearchData = () =>
  {
    if(this.sectionState)
      return this.sectionState.searchData;
  }

  getComponent = () =>
  {
    if(this.sectionInfo && this.operationInfo)
    {
      return componentMap[this.sectionInfo
        .key][this.operationInfo.componentKey];
    }
  }

  getComponentMap = () =>
  {
    if(this.sectionInfo)
      return componentMap[this.sectionInfo.key];
  }

  getSearchOptions = () =>
  {
    if(this.sectionInfo)
      return searchOptionsMap[this.sectionInfo.key];
  }

  getApiData = (apiAccessKey) =>
  {
    if(apiAccessKey)
    {
      const apiAccess = apiAccessMap[this.sectionInfo.key];
      const apiDataKey = apiAccess[apiAccessKey];
    
      if(apiDataKey)
        return apiDataMap[apiDataKey];
    }
  }

  getSendApiDataMap = () =>
  {
    return this.getApiDataMap("sendApiAccessKeys");
  }

  getRequestApiDataMap = () =>
  {
    return this.getApiDataMap("requestApiAccessKeys");
  }

  getApiDataMap = (apiAcessKeysField) =>
  {
    const apiDataMap = {};

    if(this.sectionInfo && this.operationInfo)
    {
      let apiAccessKeys = this.operationInfo[apiAcessKeysField];
      apiAccessKeys = apiAccessKeys ? apiAccessKeys : [];
      apiAccessKeys.forEach((apiAccessKey) =>
        apiDataMap[apiAccessKey] = this.getApiData(apiAccessKey)
      );
    }

    return apiDataMap;
  }

  getDisabledFieldMap = () =>
  {
    if(!this.sectionInfo || !this.operationInfo)
      return;

    const fdfm = formDisabledFieldMap[this.sectionInfo.key];

    if(!fdfm)
      return;

    const dfm = fdfm[this.operationInfo.type];
    return dfm ? dfm : {};
  }

  getFormFieldsNames()
  {
    if(this.sectionInfo)
    {
      const ffn = formFieldNameMap[this.sectionInfo.key];

      if(ffn && Array.isArray(ffn))
        return ffn;  
    }

    return [];
  }

  getSectionName = (sectionState) =>
  {
    const si = this.getSectionInfo(sectionState);

    if(si && si.name)
        return si.name;

    return "Unknown";
  }

  getSectionInfo = () =>
  {
    return this.sectionInfo;
  }

  getOperationInfo = (sectionState) =>
  {
    return this.operationInfo;
  }
}

const itTalentService = new ItTalentService();

export default itTalentService;
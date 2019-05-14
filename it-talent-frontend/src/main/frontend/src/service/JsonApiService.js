class JsonApiService
{
  _createRequestObject = (method, headers, body) =>
  {
    const ro = {};
    ro.method = method ? method : "GET";
    ro.headers = headers ? headers :
      {"Content-Type": "application/json"};
    ro.body = body;
    return ro;
  }

  _getFinalUrl = (url, appendData) =>
  {
    let u = url;

    if(appendData)
    {
      if(typeof appendData === 'object')
      {
        const fields = Object.keys(appendData);
        fields.forEach((item) => u += "/" + appendData[item]);
      }
      else if(Array.isArray(appendData))
        appendData.forEach((item) => u += "/" + item);
      else
      u += "/" + appendData;
    }
    
    return u;
  }

  _executeFetch = (url, requestObject,
    responseCallback, errorCallback, extras) =>
  {
    const finalExtras = extras ? extras : {};

    fetch(url, requestObject).then((response) =>
    {
      finalExtras.response = response;
      return response.json();
    })
    .then((data) => responseCallback(data, finalExtras))
    .catch((error) =>
    {
      if(errorCallback)
        errorCallback(error, extras);
    });
  }

  executeRequest = (url, method, appendData, headers,
    requestBody, responseCallback, errorCallback, extras) =>
  {
    const finalUrl = this._getFinalUrl(url, appendData);

    const ro = this._createRequestObject(method,
      headers, requestBody);
    return this._executeFetch(finalUrl, ro, responseCallback,
      errorCallback, extras);
  }
}

const jsonApiService = new JsonApiService();

export default jsonApiService;
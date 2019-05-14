class JSUtil
{
  isEmptyObject = (object) =>
  {
    if(object === null || object === undefined)
      return true;

    return false;
  }

  isNumber = (object) =>
  {
    if(typeof object === 'number')
      return true;

    return false;
  }
}

const jsUtil = new JSUtil();

export default jsUtil;
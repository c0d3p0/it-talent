const formDisabledFieldMap =
{
  person:
  {
    remove:
    {
      name: true,
      age: true,
      country: true,
      email: true
    }
  },
  skill:
  {
    edit:
    {
      title: true
    },
    remove:
    {
      title: true,
      description: true
    }
  }
}


export default formDisabledFieldMap;
import FormArea from '../component/formarea/FormArea';
import PersonForm from '../component/personform/PersonForm';
import SkillForm from '../component/skillform/SkillForm';
import ItemEditArea from '../component/itemeditarea/ItemEditArea';
import ListArea from '../component/listarea/ListArea';
import ListView from '../component/listview/ListView';
import PersonListItem from
  '../component/personlistitem/PersonListItem';
import SkillListItem from
  '../component/skilllistitem/SkillListItem';
import PersonSkillEdit from
  '../component/personskillitemedit/PersonSkillItemEdit';

const componentMap = 
{
  person:
  {
    listArea: ListArea,
    listView: ListView,
    listItem: PersonListItem,
    formArea: FormArea,
    form: PersonForm,
    itemEditArea: ItemEditArea,
    itemEditManager: PersonSkillEdit
  },
  skill:
  {
    listArea: ListArea,
    listView: ListView,
    listItem: SkillListItem,
    formArea: FormArea,
    form: SkillForm
  }
}


export default componentMap;
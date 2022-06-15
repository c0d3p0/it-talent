import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NavLink from '../NavLink/NavLink';
import InvalidPath from '../InvalidPath/InvalidPath';
import PersonForm from '../PersonForm/PersonForm';
import PersonList from '../PersonList/PersonList';
import SkillList from '../SkillList/SkillList';
import SkillForm from '../SkillForm/SkillForm';
import PersonSkillForm from '../PersonSkillForm/PersonSkillForm';

import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <NavLink />
        <Routes>
          <Route path="/" element={<SkillList />} />
          <Route path="/index" element={<SkillList />} />
          <Route path="/skill/*" element={<SkillList />} />
          <Route path="/person/*" element={<PersonList />} />
          <Route path="/skill-form/*" element={<SkillForm />} />
          <Route path="/person-form/*" element={<PersonForm />} />
          <Route path="/person-skill-form/*" element={<PersonSkillForm />} />
          <Route path="/*" element={<InvalidPath />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;

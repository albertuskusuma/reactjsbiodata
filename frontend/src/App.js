import { Routes,Route } from 'react-router-dom';
import AddBiodata from './components/AddBiodata';
import Biodata from './components/Biodata';
import EditBiodata from './components/EditBiodata';
import BiodataRedux from './components/BiodataRedux';
import AddBiodataRedux from './components/AddBiodataRedux';
import EditBiodataRedux from './components/EditBiodataRedux';
import LoginBiodata from './components/LoginBiodata';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* biasa */}
        <Route path="/login" element={<LoginBiodata/>}/>
        <Route path="/" element={<Biodata/>}/>
        <Route path="/add" element={<AddBiodata/>}/>
        <Route path="/edit/:id" element={<EditBiodata/>}/>

        {/* redux */}
        <Route path="/editbiodataredux/:id" element={<EditBiodataRedux/>}/>
        <Route path="/listbiodataredux" element={<BiodataRedux/>}/>
        <Route path="/addbiodataredux" element={<AddBiodataRedux/>}/>

      </Routes>
    </div>
  );
}

export default App;

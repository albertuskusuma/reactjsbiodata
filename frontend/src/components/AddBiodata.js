import axios from 'axios'
import React,{useEffect, useState} from 'react'
import Select from 'react-select'
import {useNavigate} from "react-router-dom"

function AddBiodata() {

  // initialize router
  const navigate = useNavigate();

  // initialize 
  const [dataProdi, setDataProdi] = useState([]);
  const [dataJenisKelamin, setDataJenisKelamin] = useState([]);
  const [dataFakultas, setDataFakultas] = useState([]);

  const [onChangeNama, setOnChangeNama] = useState('');
  const [onChangeUmur, setOnChangeUmur] = useState('');
  const [onChangeJenisKelamin, setOnChangeJenisKelamin] = useState(0);
  const [onChangeFakultas, setOnChangeFakultas] = useState(0);
  const [onChangeProdi, setOnChangeProdi] = useState(0);

  // jenis kelamin
  useEffect(()=>{
    if(localStorage.getItem('token') === ""){
      navigate("/login",{replace:true})
    }else{
      axios
      .get(`http://localhost:901/biodata/getJenisKelamin`,
        { 
          headers: {"x-access-token" : `${localStorage.getItem('token')}`} 
        }
      ).then((response) => {
        // console.log(response.data);
        // setDataJenisKelamin(response.data.data);

        if(response.status === 200){
          if(response.data.code === 1){
            const data = response.data;
            const options = data?.data.map((e)=>({
              "value": e.id_jenis_kelamin,
              "label": e.jenis_kelamin
            }));
    
            setDataJenisKelamin(options);
          }
        }else{
          if(response.data.code === 9){
            navigate("/login",{replace:true})
          }
        }
       
      });
    }
  },[navigate]);
  // jenis kelamin

  // fakultas
  useEffect(()=>{
    if(localStorage.getItem('token') === ""){
      navigate("/login",{replace:true})
    }
    axios
      .get(`http://localhost:901/biodata/fakultas`, {
        headers:{"x-access-token":`${localStorage.getItem('token')}`}
      })
      .then((response)=>{
        if(response.status === 200){
          if(response.data.code === 1){
            const data = response.data;
            const options = data?.data.map((e)=>({
              "value":e.id_fakultas,
              "label":e.nama_fakultas
            }));
    
            setDataFakultas(options);
          }
        }
        else{
          if(response.data.code === 9){
            navigate("/login",{replace:true})
          }
        }
      });
  },[navigate])
  // fakultas

  // handle on change Nama
  const handleChangeNama = (event) =>{
    setOnChangeNama(event.target.value);
  }

  // handle on change umur
  const handleChangeUmur = (event) =>{
    setOnChangeUmur(event.target.value);
  }

  // handle on change jenis kelamin
  const handleChangeJenisKelamin = (event)=>{
    setOnChangeJenisKelamin(event);
  }

  // handle on change fakultas
  const handleFakultas=(event)=>{
    if(localStorage.getItem('token') === ""){
      navigate("/login",{replace:true})
    }
    const get_id_fakultas = event.value;
   
    axios
    .post(`http://localhost:901/biodata/prodi`,{id_fakultas:get_id_fakultas},{
      headers:{"x-access-token":`${localStorage.getItem('token')}`}
    })
    .then((response)=>{
      // console.log(response.data.data);

      if(response.status === 200){
        if(response.data.code === 1){
          const data = response.data;
          const options = data?.data.map((e)=>({
            "value" : e.id_prodi,
            "label" : e.nama_prodi
          }));
          setDataProdi(options);
          setOnChangeFakultas(event);
        }
      }else{
        if(response.data.code === 9){
          navigate("/login",{replace:true})
        }
      }
      
    });
  }

  // handle on change prodi
  const handleProdi=(event)=>{
    setOnChangeProdi(event);
  }

  // handle submit
  const handleSubmit=()=>{
    // console.log(onChangeNama);
    // console.log(onChangeUmur);
    // console.log(onChangeJenisKelamin.value);
    // console.log(onChangeFakultas.value);
    // console.log(onChangeProdi.value);

    if(localStorage.getItem('token') === ""){
      navigate("/login",{replace:true})
    }

    const dataAddBiodata = {
      nama:onChangeNama,
      umur:onChangeUmur,
      id_jenis_kelamin:onChangeJenisKelamin.value,
      id_fakultas : onChangeFakultas.value,
      id_prodi : onChangeProdi.value
    }

    // post data
    axios
      .post(`http://localhost:901/biodata/addBiodata`,dataAddBiodata,{
        headers: {"x-access-token" : `${localStorage.getItem('token')}`}
      })
      .then((response)=>{
        if(response.status === 200){
          // console.log(response.data.code);
          if(response.data.code === 1){
            navigate("/");
          }else{
            if(response.data.code === 0){
              console.log("Error : "+response.data.message);
            }
            if(response.data.code === 9){
              navigate("/login",{replace:true})
            }
          }
        }
      });
  }

  return (
    <div>
       <div className="container-fluid my-5">
        <div className="row">
            <div className="col-md-12">
                {/* card */}
                  <div className="card">
                    <div className="card-header">Add Biodata</div>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label>Nama</label>
                          <input type="text" className="form-control" id="nama" 
                          defaultValue={onChangeNama}
                          onChange={handleChangeNama}
                          placeholder="Masukkan Nama..."/>
                        </div>
                        <div className="form-group">
                          <label>Umur</label>
                          <input type="number" className="form-control" id="umur" value={onChangeUmur}
                          onChange={handleChangeUmur}
                          placeholder="Masukkan Umur..."/>
                        </div>
                        <div className="form-group">
                          <label>Jenis Kelamin</label>
                          <Select 
                            value={onChangeJenisKelamin}
                            id='id_jenis_kelamin'
                            options={dataJenisKelamin} 
                            onChange={handleChangeJenisKelamin}
                            placeholder="Pilih Jenis Kelamin ... "
                          />
                        </div>
                        <div className="form-group">
                          <label>Fakultas</label>
                          <Select 
                            value={onChangeFakultas}
                            options={dataFakultas} 
                            id="id_fakultas" 
                            onChange={handleFakultas}
                            placeholder="Pilih Fakultas ..."
                          />
                        </div>
                        <div className="form-group">
                          <label>Prodi</label>
                          <Select
                            options={dataProdi} 
                            id="id_prodi" 
                            onChange={handleProdi}
                            placeholder="Pilih Prodi ..."
                          />
                        </div>
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                      </form>
                    </div>
                  </div>  
                {/* card */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddBiodata
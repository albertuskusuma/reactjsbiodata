import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Select from 'react-select'
import swal from 'sweetalert'

function EditBiodata() {

  // initialize
  const {id} = useParams();
  const navigate = useNavigate();
  const [dataJenisKelamin, setDataJenisKelamin] = useState([]);
  const [dataFakultas, setDataFakultas] = useState([]);
  const [dataProdi, setDataProdi] = useState([]);

  const [onChangeJenisKelamin, setOnChangeJenisKelamin] = useState(0);
  const [onChangeFakultas, setOnChangeFakultas] = useState(0);
  const [onChangeProdi, setOnChangeProdi] = useState(0);
  const [onChangeUmur, setOnChangeUmur] = useState('');
  const [onChangeNama, setOnChangeNama] = useState('');

  // get data by id_mhs
  useEffect(() => {
    if(localStorage.getItem('token') === ""){
      navigate("/login",{replace:true})
    }
    axios
    .post(`http://localhost:901/biodata/getBiodataById`,{id_mhs:id},{
      headers: {"x-access-token" : `${localStorage.getItem('token')}`}
    })
    .then((response)=>{
      if(response.status === 200){
        if(response.data.code === 1){
          // console.log(response.data);
          setOnChangeJenisKelamin(response.data.data[0].id_jenis_kelamin);
          setOnChangeFakultas(response.data.data[0].id_fakultas);
          setOnChangeProdi(response.data.data[0].id_prodi);
          setOnChangeUmur(response.data.data[0].umur);
          setOnChangeNama(response.data.data[0].nama);
        }
      }else{
        if(response.data.code === 9){
          navigate("/login",{replace:true})
        }
      }
    });
  },[id,navigate]);

  // handle on change jenis kelamin
  const handleChangeJenisKelamin=(event)=>{
    setOnChangeJenisKelamin(event.value);
  }

  // get data jenis kelamin
  useEffect(()=>{
    if(localStorage.getItem('token') === ""){
      navigate("/login",{replace:true})
    }
    axios
      .get(`http://localhost:901/biodata/getJenisKelamin`,{
        headers: {"x-access-token" : `${localStorage.getItem('token')}`}
      })
      .then((response)=>{
        if(response.status === 200){
          if(response.data.code === 1){
            const data = response.data;
            const options = data.data?.map((e)=>({
              "value": e.id_jenis_kelamin,"label":e.jenis_kelamin
            }))
            setDataJenisKelamin(options);
          }
        }else{
          navigate("/login",{replace:true})
        }
      });
  },[navigate]);

  // get data fakultas
  useEffect(() => {
    if(localStorage.getItem('token') === ""){
      navigate("/login",{replace:true})
    }
    axios
      .get(`http://localhost:901/biodata/fakultas`,{
        headers: {"x-access-token" : `${localStorage.getItem('token')}`}
      })
      .then((response) => {
        if(response.status === 200){
          if(response.data.code === 1){
            const data = response.data;
            const options = data.data?.map((e)=>({
              "value":e.id_fakultas, "label":e.nama_fakultas
            }))
            setDataFakultas(options);
          }
        }else{
          if(response.code === 9){
            navigate("/login",{replace:true})
          }
        }
      })
  },[navigate])

  // get data prodi
  useEffect(() => {
    if(localStorage.getItem('token') === ""){
      navigate("/login",{replace:true})
    }
    axios
      .get(`http://localhost:901/biodata/getProdi`,{
        headers: {"x-access-token" : `${localStorage.getItem('token')}`}
      })
      .then((response) => {
        if(response.status === 200){
          if(response.data.code === 1){
            const data = response.data;
            const options = data.data?.map((e)=>({
              "value":e.id_prodi,"label":e.nama_prodi
            }))
            setDataProdi(options);
          }
        }else{
          navigate("/login",{replace:true})
        }
      })
  },[navigate])

  // handle on change fakultas
  const handleChangeFakultas=(event)=>{
    if(localStorage.getItem('token') === ""){
      navigate("/login",{replace:true})
    }
    const get_id_fakultas = event.value;

    axios
      .post(`http://localhost:901/biodata/prodi`,{id_fakultas:get_id_fakultas},{
        headers: {"x-access-token" : `${localStorage.getItem('token')}`}
      })
      .then((response)=>{
        if(response.status === 200){
          if(response.data.code === 1){
            const data = response.data;
            const options = data.data?.map((e)=>({
              "value":e.id_prodi, "label":e.nama_prodi
            }))
            setDataProdi(options);
            setOnChangeFakultas(event.value);
            setOnChangeProdi(0);
          }
        }else{
          navigate("/login",{replace:true})
        }
        
      });
  }

  // handle on change prodi
  const handleChangeProdi=(event)=>{
    setOnChangeProdi(event.value);
  }

  // handle on change umur
  const handleChangeUmur=(event)=>{
    setOnChangeUmur(event.target.value);
  }

  // handle on change nama
  const handleChangeNama=(event)=>{
    setOnChangeNama(event.target.value);
  }

  // handle submit
  const handleSubmit=(e)=>{
    // console.log(onChangeNama);
    // console.log(onChangeUmur);
    // console.log(onChangeJenisKelamin);
    // console.log(onChangeFakultas);
    // console.log(onChangeProdi);

    if(localStorage.getItem('token') === ""){
      navigate("/login",{replace:true})
    }

    if(onChangeNama === undefined || onChangeNama === "")
    {
      swal("Warning","Nama Tidak Boleh Kosong","warning");
    }

    if(onChangeUmur === undefined || onChangeUmur === 0)
    {
      swal("Warning","Umur Tidak Boleh Kosong","warning");
    }

    if(onChangeJenisKelamin === undefined || onChangeJenisKelamin === 0)
    {
      swal("Warning","Jenis Kelamin Tidak Boleh Kosong","warning");
    }

    if(onChangeFakultas === undefined || onChangeFakultas === 0)
    {
      swal("Warning","Fakultas Tidak Boleh Kosong","warning");
    }

    if(onChangeProdi === undefined || onChangeProdi === 0)
    {
      swal("Warning","Prodi Tidak Boleh Kosong","warning");
    }

    else
    {
      const editBiodata = {
        id:id,
        nama:onChangeNama,
        umur:onChangeUmur,
        id_jenis_kelamin:onChangeJenisKelamin,
        id_fakultas:onChangeFakultas,
        id_prodi:onChangeProdi
      };

      // console.log(editBiodata);

      axios
        .post(`http://localhost:901/biodata/editBiodata`,editBiodata,{
          headers: {"x-access-token" : `${localStorage.getItem('token')}`}
        })
        .then((response) =>{
          if(response.status === 200){
            if(response.data.code === 1){
              swal("Success","Data berhasil diupdate","success");
              navigate("/");
            }else{
              if(response.status === 0){
                swal("Error",""+response.data.message,"error");
              }
              if(response.data.code === 9){
                navigate("/login",{replace:true})
              }
            }
          }
        });
    }
  }
  
  return (
    <div>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-12">
            {/* card */}
              <div className="card">
                <div className="card-header">Edit Biodata</div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Nama</label>
                      <input type="text" className="form-control"
                        id="nama" placeholder="Masukkan Nama ..."
                        defaultValue={onChangeNama ?? ""} onChange={handleChangeNama}
                      />
                    </div>
                    <div className="form-group">
                      <label>Umur</label>
                      <input type="number" className="form-control"
                        id="umur" placeholder="Masukkan Umur ..."
                        defaultValue={onChangeUmur ?? ""}
                        onChange={handleChangeUmur}
                      />
                    </div>
                    <div className="form-group">
                      <label>Jenis Kelamin</label>
                      <Select
                        value={dataJenisKelamin.filter(obj => obj.value === onChangeJenisKelamin)}
                        options={dataJenisKelamin}
                        onChange={handleChangeJenisKelamin}
                        id="id_jenis_kelamin"
                        placeholder="Pilih Jenis Kelamin ..."
                      />
                    </div>
                    <div className="form-group">
                      <label>Fakultas</label>
                      <Select 
                        options={dataFakultas}
                        value={dataFakultas.filter(obj => obj.value === onChangeFakultas)}
                        onChange={handleChangeFakultas}
                        id="id_fakultas"
                        placeholder="Pilih Fakultas ..."
                      />
                    </div>
                    <div className="form-group">
                      <label>Prodi</label>
                      <Select 
                        options={dataProdi}
                        onChange={handleChangeProdi}
                        value={ (dataProdi.filter(obj => obj.value === onChangeProdi))}
                        id="id_prodi"
                        placeholder="Pilih Prodi ..."
                      />
                    </div>
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">Simpan</button>
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

export default EditBiodata
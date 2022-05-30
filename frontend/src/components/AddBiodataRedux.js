import React,{useEffect, useState, useRef} from 'react';
import Select from 'react-select'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {
    getListJenisKelamin, 
    getListFakultas, 
    getListProdiByIdFakultas,
    postAddBiodata
} from '../actions/biodataAction'
import swal from 'sweetalert';

function AddBiodataRedux() {

    // initialize reducer
    const {
        getListJenisKelaminResult,
        getListFakultasResult,
        getListProdiByIdFakultasResult,
        postAddBiodataResult,
        postAddBiodataError
    } = useSelector((state)=>state.BiodataReducer)

    const [onChangeJenisKelamin, setOnChangeJenisKelamin] = useState(0);
    const [onChangeNama, setOnChangeNama] = useState('');
    const [onChangeUmur, setOnChangeUmur] = useState('')
    const [onChangeFakultas, setOnChangeFakultas] = useState(0);
    const [onChangeProdi, setOnChangeProdi] = useState(0);

    const dispatch = useDispatch();
   
    // initialize router 
    const navigate = useNavigate();

    // handle on change nama
    const handleChangeNama = (event) =>{
        setOnChangeNama(event.target.value);
    }

    // handle on change umur
    const handleChangeUmur = (event) =>{
        setOnChangeUmur(event.target.value);
    }

    // handle on change jenis kelamin
    const handleChangeJenisKelamin = (event) => {
        setOnChangeJenisKelamin(event);
    }

    // handle on change fakultas
    const handleChangeFakultas = (event) => {
        const get_id_fakultas = event.value;

        dispatch(getListProdiByIdFakultas(get_id_fakultas));
        setOnChangeFakultas(event);
        setOnChangeProdi(null);
    }

    // handle on change prodi
    const handleOnChangeProdi = (event) => {
        setOnChangeProdi(event);
    }

    // handle submit
    const handleSubmit = (event) => {

        console.log("masuk submit")
        event.preventDefault();
        const dataAddBiodata = {
            nama:onChangeNama,
            umur:onChangeUmur,
            id_jenis_kelamin:onChangeJenisKelamin.value,
            id_fakultas:onChangeFakultas.value,
            id_prodi:onChangeProdi.value
        }

        // console.log(dataAddBiodata);

        dispatch(postAddBiodata(dataAddBiodata));
    }
  
    useEffect(()=>{
        // panggil action getListJenisKelamin
        console.log("1. use effect component did mount");
        dispatch(getListJenisKelamin());    
        dispatch(getListFakultas());

        if(postAddBiodataResult){
            if(postAddBiodataResult.length > 0){
                console.log("5. masuk component did update ketika post data success");
                navigate("/listbiodataredux");
                setOnChangeNama('');
                setOnChangeUmur('');
                setOnChangeProdi(0);
                setOnChangeJenisKelamin(0);
                setOnChangeFakultas(0);
            }
        }else{
            if(postAddBiodataError){
                console.log("5. masuk component did update ketika post error");
                swal("error","Error : "+postAddBiodataError,"error");
            }
        }
    },[postAddBiodataResult,postAddBiodataError,navigate,dispatch])

    return (
        <div>
            <div className="container-fluid my-5">
            <div className="row">
                <div className="col-md-12">
                    {/* card */}
                        <div className="card">
                            <div className="card-header">Add Biodata Redux</div>
                            <div className="card-body">
                                <form onSubmit={(event) => handleSubmit(event)}>
                                    <div className="form-group">
                                        <label>Nama</label>
                                        <input type="text" 
                                            className="form-control"
                                            id="nama" 
                                            defaultValue={onChangeNama}
                                            onChange={handleChangeNama}
                                            placeholder="Masukkan Nama ..."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Umur</label>
                                        <input type="number" 
                                            className="form-control"
                                            id="umur"
                                            placeholder="Masukkan Umur ..."
                                            defaultValue={onChangeUmur}
                                            onChange={handleChangeUmur}
                                            />
                                    </div>
                                    <div className="form-group">
                                        <label>Jenis Kelamin</label>
                                        <Select 
                                            id='id_jenis_kelamin'
                                            onChange={handleChangeJenisKelamin}
                                            value={onChangeJenisKelamin}
                                            options={
                                                getListJenisKelaminResult 
                                                ? getListJenisKelaminResult.map((e)=>({
                                                    "value": e.id_jenis_kelamin,
                                                    "label": e.jenis_kelamin
                                                }))
                                                : []
                                            }
                                            placeholder="Pilih Jenis Kelamin ..."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Fakultas</label>
                                        <Select 
                                            id="id_fakultas"
                                            placeholder="Pilih Fakultas ..."
                                            onChange={handleChangeFakultas}
                                            value={onChangeFakultas}
                                            options={
                                                getListFakultasResult
                                                ? getListFakultasResult.map((e)=>({
                                                    "value": e.id_fakultas,
                                                    "label": e.nama_fakultas
                                                }))
                                                : []
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Prodi</label>
                                        <Select
                                            id="id_prodi"
                                            placeholder="Pilih Prodi"
                                            onChange={handleOnChangeProdi}
                                            value={onChangeProdi}
                                            options={
                                                getListProdiByIdFakultasResult
                                                    ? getListProdiByIdFakultasResult.map((e)=>({
                                                        "value":e.id_prodi,
                                                        "label":e.nama_prodi
                                                    }))
                                                    : []
                                            }
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
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

export default AddBiodataRedux
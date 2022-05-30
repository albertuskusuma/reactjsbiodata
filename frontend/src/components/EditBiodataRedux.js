import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Select from 'react-select'
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import { 
    getListBiodataByIdMhs,
    getListJenisKelamin,
    getListFakultas,
    getListProdiByIdFakultas,
    getListProdi,
    postEditBiodata
} from '../actions/biodataAction'

function EditBiodataRedux() {

    // initialize
    const {id} = useParams();
    const navigate = useNavigate();
    const [onChangeJenisKelamin, setOnChangeJenisKelamin] = useState(0);
    const [onChangeFakultas, setOnChangeFakultas] = useState(0);
    const [onChangeProdi, setOnChangeProdi] = useState(0);
    const [onChangeUmur, setOnChangeUmur] = useState('');
    const [onChangeNama, setOnChangeNama] = useState('');

    const [dataJenisKelamin, setDataJenisKelamin] = useState([]);
    const [dataFakultas, setDataFakultas] = useState([]);
    const [dataProdi, setDataProdi] = useState([]);

    const {
        getListBiodataByIdMhsResult,
        getListBiodataByIdMhsError,

        getListJenisKelaminResult,
        getListFakultasResult,
        getListProdiByIdFakultasResult,
        getListProdiResult,

        postEditBiodataResult,
        postEditBiodataError
    } = useSelector((state)=>state.BiodataReducer)
    
    const dispatch = useDispatch();

    // get data by id_mhs
    useEffect(()=>{
        dispatch(getListBiodataByIdMhs({id_mhs:id}));
        dispatch(getListJenisKelamin());
        dispatch(getListFakultas());
        dispatch(getListProdi());
    },[id,dispatch]);

    useEffect(()=>{
        if(getListBiodataByIdMhsError){
            swal("error","Error : "+getListBiodataByIdMhsError,"error");
        }
        else{
            if(getListBiodataByIdMhsResult.length > 0){
                setOnChangeNama(getListBiodataByIdMhsResult[0].nama)
                setOnChangeUmur(getListBiodataByIdMhsResult[0].umur);
                setOnChangeJenisKelamin(getListBiodataByIdMhsResult[0].id_jenis_kelamin);
                setOnChangeFakultas(getListBiodataByIdMhsResult[0].id_fakultas)
                setOnChangeProdi(getListBiodataByIdMhsResult[0].id_prodi);
            }
        }
    },[
        getListBiodataByIdMhsResult,
        getListBiodataByIdMhsError
    ]);

    // get data jenis kelamin, fakultas, all prodi, prodi by id_fakultas
    useEffect(()=>{
        if(getListJenisKelaminResult.length > 0){
            const options = getListJenisKelaminResult.map((e)=>({
                "value": e.id_jenis_kelamin,
                "label": e.jenis_kelamin
            }))

            setDataJenisKelamin(options)
        }

        if(getListFakultasResult.length > 0) {
            const options = getListFakultasResult.map((e)=>({
                "value": e.id_fakultas,
                "label": e.nama_fakultas
            }))

            setDataFakultas(options);
        }

        if(getListProdiResult.length > 0){
            const options = getListProdiResult.map((e)=>({
                "value":e.id_prodi,
                "label":e.nama_prodi
            }))

            setDataProdi(options)
        }

        if(getListProdiByIdFakultasResult.length > 0){
            const options = getListProdiByIdFakultasResult.map((e)=>({
                "value": e.id_prodi,
                "label": e.nama_prodi
            }))

            setDataProdi(options);
            setOnChangeProdi(0);
        }

        if(postEditBiodataError){
            swal("error","Error : "+postEditBiodataError,"error")
        }

        if(postEditBiodataResult.length > 0){
            swal("success","Success Update Data","success").then((response)=>{
                if(response){
                    navigate("/listbiodataredux")
                }
            })
        }
    },[
        getListJenisKelaminResult, 
        getListFakultasResult, 
        getListProdiResult, 
        getListProdiByIdFakultasResult,
        postEditBiodataResult,
        postEditBiodataError,
        navigate
    ])

    // handle on change nama
    const handleChangeNama = (event) =>{
        setOnChangeNama(event.target.value);
    }

    // handle on change umur
    const handleChangeUmur = (event) =>{
        setOnChangeUmur(event.target.value);
    }

    // handle on change jenis kelamin
    const handleChangeJenisKelamin = (event) =>{
        setOnChangeJenisKelamin(event.value);
    }

    // handle on change fakultas
    const handleChangeFakultas = (event) => {
        const get_id_fakultas = event.value;

        dispatch(getListProdiByIdFakultas(get_id_fakultas));
        setOnChangeFakultas(event.value);
    }

    // handle on change prodi
    const handleChangeProdi = (event) => {
        setOnChangeProdi(event.value);
    }

    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(onChangeNama);
        // console.log(onChangeUmur);
        // console.log(onChangeJenisKelamin);
        // console.log(onChangeFakultas);
        // console.log(onChangeProdi);

        if(onChangeNama === ""
            || onChangeUmur === ""
            || onChangeJenisKelamin === ""
            || onChangeFakultas === ""
            || onChangeProdi === ""
        ){
            swal("Warning","Warning : Please Filled the form","warning");
        }else{
            // console.log("update");
            const editBiodata = {
                id:id,
                nama:onChangeNama,
                umur:onChangeUmur,
                id_jenis_kelamin:onChangeJenisKelamin,
                id_fakultas:onChangeFakultas,
                id_prodi:onChangeProdi
            }
            dispatch(postEditBiodata(editBiodata))
        }
    }

  return (
    <div>
        <div className="container-fluid my-5">
            <div className="row">
                <div className="col-md-12">
                    {/* card */}
                    <div className="card">
                        <div className="card-header">Edit Biodata Redux</div>
                        <div className="card-body">
                            <form onSubmit={(event) =>handleSubmit(event)}>
                                <div className="form-group">
                                    <label>Nama</label>
                                    <input type="text" 
                                        className="form-control"
                                        id="nama" 
                                        value={onChangeNama ?? ""}
                                        onChange={handleChangeNama}
                                        placeholder="Masukkan Nama ..."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Umur</label>
                                    <input type="number" 
                                        className="form-control"
                                        id="umur"
                                        value={onChangeUmur ?? ""}
                                        onChange={handleChangeUmur}
                                        placeholder="Masukkan Umur ..."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Jenis Kelamin</label>
                                    <Select 
                                        id="id_jenis_kelamin"
                                        placeholder="Pilih Jenis Kelamin ..."
                                        onChange={handleChangeJenisKelamin}
                                        value={dataJenisKelamin.filter(obj => obj.value === onChangeJenisKelamin)}
                                        options={dataJenisKelamin}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fakultas</label>
                                    <Select
                                        id="id_fakultas"
                                        placeholder="Pilih Fakultas ..."
                                        onChange={handleChangeFakultas}
                                        value={dataFakultas.filter(obj => obj.value === onChangeFakultas)}
                                        options={dataFakultas}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Prodi</label>
                                    <Select
                                        id="id_prodi"
                                        placeholder="Pilih Prodi ..."
                                        onChange={handleChangeProdi}
                                        value={dataProdi.filter(obj => obj.value === onChangeProdi)}
                                        options={dataProdi}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success btn-md">Update</button>
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

export default EditBiodataRedux
import axios from "axios";
import {useNavigate} from 'react-router-dom'


export const GET_LIST_BIODATA = "GET_LIST_BIODATA";

export const GET_LIST_JENIS_KELAMIN = "GET_LIST_JENIS_KELAMIN";

export const GET_LIST_FAKULTAS = "GET_LIST_FAKULTAS";

export const GET_LIST_PRODI_BY_ID_FAKULTAS = "GET_LIST_PRODI_BY_ID_FAKULTAS";

export const POST_ADD_BIODATA = "POST_ADD_BIODATA";

export const POST_DELETE_BIODATA = "POST_DELETE_BIODATA";

export const GET_LIST_BIODATA_BY_ID_MHS = "GET_LIST_BIODATA_BY_ID_MHS";

export const GET_LIST_PRODI = "GET_LIST_PRODI";

export const POST_EDIT_BIODATA = "POST_EDIT_BIODATA";

export const getListBiodata = () => {
    console.log("2. Masuk Action");
    return (dispatch) => {

        if(localStorage.getItem('token') === ""){
            // useNavigate('/login',{replace:true})
            // dispatch ketambahan auth
        }

        // loading
        dispatch({
            type: GET_LIST_BIODATA,
            payload:{
                loading:true,
                data:false,
                errorMessage:false
            }
        })

        // get API
        axios({
            method:'GET',
            url:"http://localhost:901/biodata/",
            timeout:120000,
            headers:{
                "x-access-token":`${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                if(response.status === 200){
                    if(response.data.code === 1){
                        console.log("3. Berhasil dapat data");
                        console.log(response.data?.data)
                        // berhasil get api
                        dispatch({
                            type:'GET_LIST_BIODATA',
                            payload:{
                                loading:false,
                                data:response.data?.data,
                                errorMessage:false
                            }
                        })
                    }
                    if(response.data.code === 9){
                        // useNavigate('/login',{replace:true})
                        // dispatch ketambahan auth
                    }
                }
            })
            .catch((error) => {
                // gagal get api
                console.log("3. Error");
                dispatch({
                    type:'GET_LIST_BIODATA',
                    payload:{
                        loading:false,
                        data:false,
                        errorMessage:error.message
                    }
                })
            })
    }
}

export const getListJenisKelamin = () => {
    console.log("2. masuk jenis kelamin");

    return (dispatch) => {
        // loading
        dispatch({
            type:'GET_LIST_JENIS_KELAMIN',
            payload:{
                loading:true,
                data:false,
                errorMessage:false
            }
        });

        // get jk from api
        axios({
            method:'GET',
            timeout:120000,
            url: 'http://localhost:901/biodata/getJenisKelamin'
        })
            .then((response)=>{
                if(response.status === 200){
                    // if(response.data.code === 1){
                        console.log("3. dapet data JK");
                        // console.log(response.data?.data);
                        dispatch({
                            type: 'GET_LIST_JENIS_KELAMIN',
                            payload:{
                                loading:false,
                                data:response.data?.data,
                                errorMessage:false
                            }
                        })
                    // }
                }
            })
            .catch((error)=>{
                console.error("3. error");
                dispatch({
                    type: 'GET_LIST_JENIS_KELAMIN',
                    payload: {
                        loading: false,
                        data:false,
                        errorMessage: error.message
                    }
                });
            })
    }
}

export const getListFakultas = () => {
    console.log('2. masuk fakultas');
    return (dispatch) => {
        
        // loading
        dispatch(() => ({
            type:'GET_LIST_FAKULTAS',
            payload: {
                loading:true,
                data:false,
                errorMessage: false
            }
        }))

        axios({
            method:'GET',
            url:"http://localhost:901/biodata/fakultas",
            timeout:120000
        })
            .then((response) => {
                if(response.status === 200){
                    if(response.data.code === 1){
                        // dapet api
                        console.log("3. dapat data fakultas");
                        dispatch(({
                            type:'GET_LIST_FAKULTAS',
                            payload: {
                                loading:false,
                                data:response.data?.data,
                                errorMessage:false
                            }
                        }))
                    }
                }
            })
            .catch((err) => {
                dispatch(({
                    type:'GET_LIST_FAKULTAS',
                    payload: {
                        loading:false,
                        data:false,
                        errorMessage: err.message
                    }
                }))
            })
    }
}

export const getListProdiByIdFakultas = (data) => {
    console.log('2. masuk prodi by id fakultas');

    const id_fakultas = {
        id_fakultas:data
    }

    return(dispatch)=> {

        // loading
        dispatch({
            type: 'GET_LIST_PRODI_BY_ID_FAKULTAS',
            payload: {
                loading: true,
                data:false,
                errorMessage:false
            }
        });

        axios({
            method:'post',
            url:"http://localhost:901/biodata/prodi",
            timeout:120000,
            data:id_fakultas
        })
            .then((response) =>{
                if(response.status === 200){
                    if(response.data.code === 1){
                        // dapat data prodi by id_fakultas
                        console.log("3. dapat data prodi by id_fakultas");
                        dispatch({
                            type:'GET_LIST_PRODI_BY_ID_FAKULTAS',
                            payload:{
                                loading:false,
                                errorMessage:false,
                                data:response.data?.data
                            }
                        })
                    }
                }
            })
            .catch((error) =>{
                dispatch({
                    type:'GET_LIST_PRODI_BY_ID_FAKULTAS',
                    payload:{
                        loading:false,
                        errorMessage:error.message,
                        data:false
                    }
                })
            })
    }
}

export const postAddBiodata = (data) => {

    console.log('2. masuk post biodata');
    return (dispatch) => {
        // loading
        dispatch({
            type:'POST_ADD_BIODATA',
            payload:{
                loading:true,
                data:false,
                errorMessage:false
            }
        })

        axios({
            method:'POST',
            timeout:120000,
            url:"http://localhost:901/biodata/addBiodatas",
            data:data
        })
            .then((response) => {
                if(response.status === 200){
                    if(response.data.code === 1){
                        // dapet data
                        console.log("3. post data")
                        dispatch({
                            type:'POST_ADD_BIODATA',
                            payload:{
                                data: response.data?.data,
                                loading:false,
                                errorMessage:false
                            }
                        })
                    }
                }
            })
            .catch((error)=>{
                dispatch({
                    type:'POST_ADD_BIODATA',
                    payload:{
                        errorMessage:error.message,
                        loading:false,
                        data:false
                    }
                })
            })
    }
}

export const postDeleteBiodata = (data) => {
    
    console.log("2. masuk post edit");

    return (dispatch) => {
        
        dispatch({
            type:'POST_DELETE_BIODATA',
            payload:{
                loading:true,
                data:false,
                errorMessage:false
            }
        });

        axios({
            method: 'POST',
            url:"http://localhost:901/biodata/deleteBiodata",
            data:data,
            timeout:120000,
        })
            .then((response) => {
                if(response.status === 200){
                    if(response.data.code === 1){
                        // success edit
                        console.log("3. dapet data post edit");
                        dispatch({
                            type: 'POST_DELETE_BIODATA',
                            payload:{
                                loading:false,
                                data:response.data?.data,
                                errorMessage:false
                            }
                        });
                    }
                }
            })
            .catch((error) => {
                dispatch({
                    type:'POST_DELETE_BIODATA',
                    payload:{
                        loading:false,
                        data:false,
                        errorMessage:error.message
                    }
                })
            })
    }
}

export const getListBiodataByIdMhs = (data) => {

    console.log("2. masuk get biodata by id_mhs");
    return (dispatch) => {
        // loading
        dispatch({
            type:'GET_LIST_BIODATA_BY_ID_MHS',
            payload:{
                loading:true,
                data:false,
                errorMessage:false,
            }
        });

        axios({
            method:'POST',
            url:"http://localhost:901/biodata/getBiodataById",
            timeout:120000,
            data:data
        })
            .then((response) =>{
                if(response.status === 200){
                    if(response.data.code === 1){
                        // dapat data biodata by id_mhs
                        console.log("3. dapat biodata by id_mhs");
                        dispatch({
                            type:'GET_LIST_BIODATA_BY_ID_MHS',
                            payload:{
                                loading:false,
                                data:response.data?.data,
                                errorMessage:false
                            }
                        });
                    }
                }
            })
            .catch((error)=>{
                // error
                dispatch({
                    type:'GET_LIST_BIODATA_BY_ID_MHS',
                    payload:{
                        loading:false,
                        data:false,
                        errorMessage:false
                    }
                })
            })
    }
}

export const getListProdi = () => {
    return (dispatch) => {
        dispatch({
            type:'GET_LIST_PRODI',
            payload:{
                loading:true,
                data:false,
                errorMessage:false
            }
        })

        axios({
            method:'GET',
            timeout:120000,
            url:"http://localhost:901/biodata/getProdi"
        })
            .then((response) => {
                if(response.status === 200){
                    if(response.data.code === 1){
                        dispatch({
                            type:'GET_LIST_PRODI',
                            payload:{
                                data:response.data?.data,
                                loading:false,
                                errorMessage:false
                            }
                        })
                    }
                }
            })
            .catch((error) => {
                dispatch({
                    type:'GET_LIST_PRODI',
                    payload:{
                        data:false,
                        loading:false,
                        errorMessage:error.message
                    }
                })
            })
    }
}

export const postEditBiodata = (data) => {
    return (dispatch) => {
        dispatch({
            type:'POST_EDIT_BIODATA',
            payload:{
                loading:true,
                data:false,
                errorMessage:false
            }
        });

        axios({
            method:'POST',
            url:"http://localhost:901/biodata/editBiodata",
            timeout:120000,
            data:data
        })
            .then((response) =>{
                if(response.status === 200){
                    if(response.data.code === 1){
                        dispatch({
                            type:'POST_EDIT_BIODATA',
                            payload:{
                                loading:false,
                                data:response.data?.data,
                                errorMessage:false
                            }
                        })
                    }
                }
            })
            .catch((error)=>{
                dispatch({
                    type:'POST_EDIT_BIODATA',
                    payload:{
                        loading:false,
                        data:false,
                        errorMessage:error.message
                    }
                })
            })
    }
}
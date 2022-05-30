import {React,useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {getListBiodata, postDeleteBiodata} from '../actions/biodataAction'
import swal from 'sweetalert'

function BiodataRedux() {

  const {
    getListBiodataResult, 
    getListBiodataLoading, 
    getListBiodataError,

    postDeleteBiodataResult,
    postDeleteBiodataError
  } = useSelector((state)=>state.BiodataReducer)
  
  const dispatch = useDispatch();

  useEffect(()=>{
    // panggil action getListBiodata
    console.log("1. use effect component did mount");
    dispatch(getListBiodata());

    if(postDeleteBiodataResult){
      if(postDeleteBiodataResult.length > 0){
        swal({
          title: "Success",
          icon: "success",
          buttons:true
        }).then((response)=>{
          if(response){
            dispatch(getListBiodata());
          }
        })
      }
    }else{
      if(postDeleteBiodataError){
        swal("error","Error : "+postDeleteBiodataError,"error");
      }
    }
  },[postDeleteBiodataResult,postDeleteBiodataError,dispatch])

  const handleDelete = (e, id) => {
    e.preventDefault();
    const deleteBiodata = {
      id:id
    };

    swal({
      title: 'Are you sure you want to delete ?',
      icon:"warning",
      allowClearOutside:false,
      buttons:true,
      dangerMode:false,
    }).then((willDelete)=>{
      if(willDelete){
        dispatch(postDeleteBiodata(deleteBiodata));  
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
              <div className="card-header text-left">
                <h5>Data Biodata Redux</h5>
              </div>
              <div className="card-body text-left">
                <Link to="/addbiodataredux">
                  <button className="btn btn-info btn-md my-3">Add Biodata Redux</button>
                </Link>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-check">
                          <input className="form-control-input" type="checkbox"/>
                          <label className="form-check-label"></label>
                        </div>
                      </th>
                      <th scope="col">No.</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Umur</th>
                      <th scope="col">Jenis Kelamin</th>
                      <th scope="col">Fakultas</th>
                      <th scope="col">Prodi</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getListBiodataResult 
                      ? (
                        getListBiodataResult.map((biodata, i)=>{
                          return (
                            <tr key={biodata.id}>
                              <td>
                                <div className="form-check">
                                  <input 
                                    type="checkbox"
                                    className="form-check-input"
                                  />
                                </div>
                              </td>
                              <td>{i+1}</td>
                              <td>{biodata.nama}</td>
                              <td>{biodata.umur}</td>
                              <td>{biodata.jenis_kelamin}</td>
                              <td>{biodata.nama_fakultas}</td>
                              <td>{biodata.nama_prodi}</td>
                              <td>
                                <Link to={`/editbiodataredux/${biodata.id}`}>
                                  <button className="btn btn-warning btn-xs mx-3">
                                    Edit
                                  </button>
                                </Link>
                                <button className="btn btn-danger btn-xs" onClick={(e) => handleDelete(e,biodata.id)}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      )
                      : getListBiodataLoading 
                        ? (
                          <tr>
                            <td rowSpan="8" align='center'>Loading</td>
                          </tr>
                      )
                        : (
                          <tr>
                            <td>{getListBiodataError ? getListBiodataError : "Empty Data"}</td>
                          </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>  
            </div>
            {/* card */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BiodataRedux
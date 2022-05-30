import { React,useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import axios from 'axios'

function Biodata() {

  // initialize
  
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [idCheckBox, setIdCheckBox] = useState([]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheckSingle, setIsCheckSingle] = useState({});

  const [isCheck, setIsCheck] = useState([]);

  // get data
  const loadData=(e)=>{
    // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJpYXQiOjE2NTMxMDcxMDUsImV4cCI6MTY1MzExNDMwNX0.0J_MeeYhaxOXJb3qWUvSozVk6PmOhDcechozLqpsQh8`;
    
    // console.log(localStorage.getItem('token'))
    if(localStorage.getItem('access_token') === ""){
      navigate("/login",{replace:true})
    }
    else{
      setLoading(true);
      // console.log(localStorage.getItem('access_token'));
      // console.log(localStorage.getItem('refresh_token'));
      axios({
        method:'POST',
        url:"http://localhost:901/biodata/",
        headers:{
          "x-access-token" : `${localStorage.getItem('access_token')}`,
          "x-access-refreshtoken" : `${localStorage.getItem('refresh_token')}`
        }
      })
        .then((response) =>{
          if(response.status === 200){
            if(response.data.code === 1){
              setData(response.data);
            }
          }
          else{
            if(response.data.code === 9){
              navigate("/login",{replace:true})
            }
          }
        })
        .catch((error) =>{
          if(error.response.status !== 403)
          {
            setError(error);
          }

          // invalid token if status = 401, back to login
          else
          {
            navigate("/login",{replace:true})  
          }
        })
        .finally(()=>{
          setLoading(false);
        })
    }
  }

  useEffect(()=>{
    loadData();
  },[])

  if(loading) return <h1>LOADING ... </h1>
  if(error) console.log(error);

  // handle delete
  const handleDelete=(e, id)=>{
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Deleting';
    // console.log(id);

    const deleteData = { 
      id:id
    };
    
    swal({
      title:'Are you sure you want to delete ?',
      icon:"warning",
      allowClearOutside:false,
      buttons:true,
      dangerMode:true
    }).then((willDelete)=>{
      if(willDelete){
        if(localStorage.getItem('token') === ""){
          navigate("/login",{replace:true})
        }
        axios
          .post(`http://localhost:901/biodata/deleteBiodata`, deleteData)
          .then((response)=>{
            if(response.status === 200){
              if(response.data.code === 1){
                swal("Success","Data Deleted","success");
                loadData();
              }else{
                if(response.data.code === 0){
                  swal("Error",""+response.data.message,"warning");
                }
              }
            }
          });
      }
    })
    
  }

  // check all
  const handleClickCheckBox=(e)=>{
    const {name, checked} = e.target;
    if(name === "check_all"){
      let tempId = data.data.map((data)=>{
        return { ...data.id, isChecked: checked}
      });
      setIdCheckBox(tempId);
    }

    console.log(idCheckBox)
  }

  const handleSelectAll = e =>{
    // setIsCheckAll(!isCheckAll);
    // setIsCheck(data?.data.map(li=>li.id));
    // if(isCheckAll){
    //   setIsCheck([]);
    // }
    // console.log(e);

    if(e.target.name === "check_all"){
      setIsCheckAll(!isCheckAll);
      setIsCheck(data?.data.map(li=>li.id));
      // e.target.name = true;
      if(isCheckAll){
        setIsCheck([]);
      }

      console.log(e.target.checked)
    }

    else{
      if(e.target.name === "checkbox_single"){
        if(isCheck.includes(e.target.id)){
          console.log(isCheck);
          e.target.name = false;
        }else{
          setIsCheckAll(isCheckAll);
          setIsCheck([...isCheck, e.target.id]);
          e.target.name = true;
        }
      }
   
    }
  }

  return (
    <div>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-12">
            {/* card */}
            <div className="card">
              <div className="card-header text-left">
                <h5>Data Biodata</h5>
              </div>
              <div className="card-body text-left">
                <Link to="/add">
                  <button className="btn btn-info btn-md my-3">Add Data</button>
                </Link>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-check">
                          <input className="form-control-input" 
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={isCheckAll}
                          name="check_all" />
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
                    {data?.data.map((e, i) => {
                      return (
                        <tr key={e.id}>
                          <th>
                            <div className="form-check">
                              {/* <input className="form-check-input" 
                               type="checkbox"
                               name={e.id} 
                               id={e.id}
                               onChange={handleClick}
                               checked={isCheck.includes(e.id)}
                               /> */}
                               <input className="form-check-input" 
                                type="checkbox"
                                name="checkbox_single" 
                                id={e.id}
                                // checked={isCheckAll}
                                onChange={handleSelectAll}
                                // checked={isCheck.includes(e.id)}
                                // onChange={(checked)=>handleClick(checked,e.id)}
                                // defaultValue={checked}
                                // checked={isCheck.includes(e.id) || false}
                               />
                              <label className="form-check-label"></label>
                            </div>
                          </th>
                          <th scope="row" key={e}>{i+1}</th>
                          <td>{e.nama}</td>
                          <td>{e.umur}</td>
                          <td>{e.jenis_kelamin}</td>
                          <td>{e.nama_fakultas}</td>
                          <td>{e.nama_prodi}</td>
                          <td>
                            <Link to={`/edit/${e.id}`}>
                              <button className="btn btn-warning btn-xs mx-3">
                                Edit
                              </button>
                            </Link>
                            <button className="btn btn-danger btn-xs" onClick={(event)=>handleDelete(event, e.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* card */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Biodata;

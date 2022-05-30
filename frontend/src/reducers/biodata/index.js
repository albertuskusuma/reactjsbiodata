import { GET_LIST_BIODATA, 
    GET_LIST_JENIS_KELAMIN, 
    GET_LIST_FAKULTAS, 
    GET_LIST_PRODI_BY_ID_FAKULTAS,
    POST_ADD_BIODATA,
    POST_DELETE_BIODATA,
    GET_LIST_BIODATA_BY_ID_MHS,
    GET_LIST_PRODI,
    POST_EDIT_BIODATA
} from "../../actions/biodataAction";

const initialState = {
    getListBiodataResult : false,
    getListBiodataLoading : false,
    getListBiodataError : false,

    getListJenisKelaminResult : false,
    getListJenisKelaminLoading : false,
    getListJenisKelaminError : false,

    getListFakultasResult :false,
    getListFakultasLoading :false,
    getListFakultasError :false,

    getListProdiByIdFakultasResult:false,
    getListProdiByIdFakultasLoading:false,
    getListProdiByIdFakultasError:false,

    postAddBiodataResult:false,
    postAddBiodataLoading:false,
    postAddBiodataError:false,

    postDeleteBiodataResult : false,
    postDeleteBiodataLoading : false,
    postDeleteBiodataError :false,

    getListBiodataByIdMhsResult : false,
    getListBiodataByIdMhsLoading : false,
    getListBiodataByIdMhsError : false,

    getListProdiResult:false,
    getListProdiError : false,
    getListProdiLoading : false,

    postEditBiodataResult:false,
    postEditBiodataError:false,
    postEditBiodataLoading:false,
}

const biodata = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_BIODATA :
            console.log("4. Masuk reducers : ",action);
            // dari biodataAction masuk ke return
            return {
                ...state,
                getListBiodataResult : action.payload.data,
                getListBiodataLoading : action.payload.loading,
                getListBiodataError : action.payload.errorMessage
            }
        case GET_LIST_JENIS_KELAMIN :
            console.log("4. Masuk reducers : ",action);
            // dari biodataAction masuk ke return
            return {
                ...state,
                getListJenisKelaminResult : action.payload.data,
                getListJenisKelaminLoading : action.payload.loading,
                getListJenisKelaminError : action.payload.errorMessage
            }
        case GET_LIST_FAKULTAS :
            console.log("4. Masuk reducers : ",action);
            // dari biodataAction masuk ke return
            return {
                ...state,
                getListFakultasResult : action.payload.data,
                getListFakultasLoading : action.payload.loading,
                getListFakultasError : action.payload.errorMessage
            }
        case GET_LIST_PRODI_BY_ID_FAKULTAS :
            console.log("4. Masuk reducers : ",action);
            // dari biodataAction masuk ke return
            return {
                ...state,
                getListProdiByIdFakultasResult : action.payload.data,
                getListProdiByIdFakultasLoading:action.payload.loading,
                getListProdiByIdFakultasError:action.payload.errorMessage
            }
        case POST_ADD_BIODATA :
            console.log("4. masuk reducers : ",action)
            // dari biodataAction masuk ke return
            return {
                ...state,
                postAddBiodataResult:action.payload.data,
                postAddBiodataError:action.payload.errorMessage,
                postAddBiodataLoading : action.payload.loading
            }
        case POST_DELETE_BIODATA : 
            console.log("4. masuk reducers : ",action);
            // dari biodataAction masuk ke return
            return {
                ...state,
                postDeleteBiodataResult:action.payload.data,
                postDeleteBiodataError:action.payload.errorMessage,
                postDeleteBiodataLoading:action.payload.loading
            }
        case GET_LIST_BIODATA_BY_ID_MHS :
            console.log("4. masuk reducers : ",action);
            // dari biodataAction masuk ke return
            return {
                ...state,
                getListBiodataByIdMhsResult:action.payload.data,
                getListBiodataByIdMhsError:action.payload.errorMessage,
                getListBiodataByIdMhsLoading:action.payload.loading
            }
        case GET_LIST_PRODI :
            console.log("4. masuk reducer : ",action)
            // dari biodata masuk ke return
            return {
                ...state,
                getListProdiResult:action.payload.data,
                getListProdiError:action.payload.error,
                getListProdiLoading:action.payload.loading
            }
        case POST_EDIT_BIODATA :
            console.log("4. masuk reducers : ", action)
            // dari biodata masuk ke return
            return {
                ...state,
                postEditBiodataResult : action.payload.data,
                postEditBiodataError:action.payload.errorMessage,
                postEditBiodataLoading:action.payload.loading
            }
        default: 
            return state;
    }
}

export default biodata;
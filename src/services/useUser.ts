import { loadingStart,  infoUpdateSuccess, infoUpdateFailure  } from "@store/features/user/userSlice";
import { AppThunk, AppDispatch, RootState } from "@store/store";
import { API_BASE_URL } from "@config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const getUserInfo = (token: string): AppThunk => async (dispatch) => {
    dispatch(loadingStart());
    const user = await AsyncStorage.getItem('user');
    if (user) {
        console.log(user)
        //dispatch(infoUpdateSuccess(JSON.parse(user)));
    }else{
        await axios.get( API_BASE_URL + 'userinfo')
        .then((response) => {
            console.log(response.data);
            //dispatch(infoUpdateSuccess(JSON.parse(user)));
        })
        .catch((error) => {
            console.log('Error: ' + error.message);
        });
    }
    
};

export const udapteUserInfo = (token: string, data: { firstname: string, lastname: string}): AppThunk => async (dispatch) => {
    await axios.get( API_BASE_URL + 'userinfo')
    .then((response) => {
        //AsyncStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
    })
    .catch((error) => {
        console.log('Error: ' + error.message);
    });
        
};

export const createPoolerAccount = (phoneNumber: string): AppThunk => async (dispatch) => {
    await axios.put( API_BASE_URL + 'pollers/addPoller')
    .then((response) => {
       // AsyncStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
    })
    .catch((error) => {
        console.log('Error: ' + error.message);
    });
        
};

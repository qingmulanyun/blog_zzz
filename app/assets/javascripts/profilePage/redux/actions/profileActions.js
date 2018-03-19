import { fetchingServerData } from './rootActions'

export function fetchProfileInfo() {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/setting/api/profile_info',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertProfileInfo(data.profile_info));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function handleChangeUserName(name) {
    return {
        type: "HANDLE_CHANGE_USER_NAME",
        data: name
    }
}

export function handleChangeProfile(key, value) {
    return {
        type: "HANDLE_CHANGE_USER_INFO",
        key: key,
        value: value
    }
}

export function insertProfileInfo(data) {
    return {
        type: "INSERT_PROFILE_INFO",
        data: data
    }
}

export function submitUpdateProfile(){
    return  function(dispatch, getState) {
        const currentState = getState();
        $.ajax({
            url: '/setting/api/profile_info',
            dataType: 'json',
            type: 'PATCH',
            data: {
                user: {
                    name: currentState.profile.name,
                    phone: currentState.profile.phone
                }
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertProfileInfo(data.profile_info));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}


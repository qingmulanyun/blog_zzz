import { fetchingServerData } from './rootActions';

export function fetchAllAddresses(){
    return  function(dispatch, getState) {
        $.ajax({
            url: '/setting/api/addresses',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertAddressesInfo(data.addresses));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function submitAddNewAddress(params){
    return  function(dispatch, getState) {
        $.ajax({
            url: '/setting/api/address',
            dataType: 'json',
            type: 'POST',
            data: {
                address: params
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertAddressesInfo(data.addresses));
                dispatch(createNewAddressSuccessfully());
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}


export function createNewAddressSuccessfully(){
    return {
        type: "CREAT_NEW_ADDRESS_SUCCESSFULLY"
    }
}

export function insertAddressesInfo(data){
    return {
        type: "INSERT_ADDRESSES_INFO",
        data: data
    }
}
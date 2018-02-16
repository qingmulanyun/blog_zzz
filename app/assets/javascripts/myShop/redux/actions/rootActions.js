import { fetchingServerData } from './gridActions'

export function switchBuildComponent(tab_index) {
    return {
        type: 'SWITCH_BUILD_COMPONENT',
        data: tab_index
    }
}

export function toggleCreateItemPage() {
    return {
        type: "TOGGLE_CREATE_ITEM_PAGE"
    }
}

export function fetchShopInfoSuccessfully(data) {
    return {
        type: "FETCH_SHOP_INFO_SUCCESSFULLY",
        data: data
    }
}

export function fetchShopInfo() {
    return  function(dispatch, getState) {
        const currentState = getState();
        $.ajax({
            url: '/shops/my_shop',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(fetchShopInfoSuccessfully(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}



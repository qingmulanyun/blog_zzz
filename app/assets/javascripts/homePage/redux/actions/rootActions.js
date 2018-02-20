export function fetchHomePageInfo() {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/home/api/home_page_info',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(fetchHomePageInfoSuccessfully(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function fetchingServerData(bool) {
    return {
        type: 'FETCHING_SEVER_DATA',
        isFetching: bool
    }
}

export function fetchHomePageInfoSuccessfully(data) {
    return {
        type: "FETCH_HOME_PAGE_INFO_SUCCESSFULLY",
        data: data
    }
}
export function fetchingServerData(bool) {
    return {
        type: 'FETCHING_SEVER_DATA',
        isFetching: bool
    }
}

export function fetchReportData() {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/shops/sale_report',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertReportData(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function insertReportData(data) {
    return {
        type: 'INSERT_REPORT_DATA',
        data: data
    }
}
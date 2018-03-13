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

export function handleSearchKeywordsChange(keyWords) {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/home/api/search_items',
            dataType: 'json',
            type: 'GET',
            data: {
                key_words: keyWords
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
                dispatch(storeKeyWords(keyWords))
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(searchItemsWithKeyWords(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function searchItemsWithKeyWords(data){
    return {
        type: "SEARCH_ITEMS_WITH_KEY_WORDS",
        data: data
    }
}

export function storeKeyWords(keyWords) {
    return {
        type: "STORE_KEY_WORDS",
        data: keyWords
    }
}
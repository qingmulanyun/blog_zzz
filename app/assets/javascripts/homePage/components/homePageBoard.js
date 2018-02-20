import React from 'react';
import { withStyles } from 'material-ui/styles';
import { fetchHomePageInfo } from '../redux/actions/rootActions'
import { connect } from 'react-redux'
import  ItemsListBoard  from './itemsListBoard'
import StarItemsListBoard from './starItemsListBoard'
import AdsListBoard from './adsListBoard'
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
        backgroundColor: theme.palette.background.paper,
    },
    rightBtn: {
        float: 'right',
        padding: 0,
    },
    title: {
        display: 'inline-block',
        paddingLeft: 20
    },
    titleContainer: {
        flex: 1,
        height: 36,
        lineHeight: '36px'
    }

});


class homePageBoard extends React.Component{

    componentWillMount() {
        this.props.fetchHomePageInfo();
    }

    render(){
        const {classes, allItems, ads} = this.props;

        const starredItems = allItems.filter(function(item) {
            return item.starred;
        });

        return(
            <div>
                {ads.length > 0 &&  <AdsListBoard ads={ads}/>}
                {starredItems.length > 0 && <StarItemsListBoard starredItems={starredItems}/>}
                {allItems.length > 0 && <ItemsListBoard allItems={allItems}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    allItems: state.root.items,
    loading: state.root.loading,
    ads: state.root.ads
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHomePageInfo: ()=> {
            dispatch(fetchHomePageInfo())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(homePageBoard));
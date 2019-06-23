import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { fetchHomePageInfo } from '../redux/actions/rootActions'
import { connect } from 'react-redux'
import  ItemsListBoard  from './itemsListBoard'
import StarItemsListBoard from './starItemsListBoard'
import AdsListBoard from './adsListBoard'
import SearchBar from './searchBar'

const styles = theme => ({ });


class homePageBoard extends React.Component{

    componentWillMount() {
        this.props.fetchHomePageInfo();
    }

    render(){
        const {starredItems, allItems, ads} = this.props;


        return(
            <div>
                {ads.length > 0 &&  <AdsListBoard ads={ads}/>}
                {ads.length > 0 &&  <div className="divider"></div>}
                {starredItems.length > 0 && <StarItemsListBoard starredItems={starredItems}/>}
                {starredItems.length > 0 && <div className="divider"></div>}
                <SearchBar />
                <ItemsListBoard allItems={allItems}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    allItems: state.root.items,
    loading: state.root.loading,
    ads: state.root.ads,
    starredItems: state.root.starredItems
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHomePageInfo: ()=> {
            dispatch(fetchHomePageInfo())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(homePageBoard));
import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import ItemCard from './itemCard'
import Typography from '@material-ui/core/Typography';
import { handleSearchKeywordsChange } from '../redux/actions/rootActions'
import { Loading } from '../../utilities/loadingComponent/loading'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '2em !important',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "100%"
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    container: {
        paddingTop: theme.spacing.unit,
        minHeight: 500
    },
    titleBar: {
        display: "flex",
        alignItems: "center"
    },
    searchLable: {
        margin: "unset !important"
    },
    errorTips: {
        display: "block",
        marginLeft:  theme.spacing.unit
    }
});

class SearchBar extends React.Component{

    handleSearchItems = keyWords => {
        this.props.searchKeywordsChange(keyWords);
    };

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className={classes.titleBar}>
                        <Typography variant="headline">
                            商品列表
                        </Typography>
                    </Grid>
                    <Grid item xs={10} sm={6} md={6} lg={9} xl={9} >
                        <div className="input-field">
                            <input type="text" id="autocomplete-input" className="autocomplete" onChange={(e)=>this.handleSearchItems(e.target.value)}/>
                            <i className="material-icons prefix">search</i>
                            <label className={classes.searchLable}>搜索商品</label>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.root.loading
});

const mapDispatchToProps = (dispatch) => {
    return {
        searchKeywordsChange: (keyWords)=> {
            dispatch(handleSearchKeywordsChange(keyWords))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchBar));
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';

import { connect } from 'react-redux'


const styles = theme => ({

});



class AdsListBoard extends React.Component{

    componentDidMount(prevProps, prevState){
        $('.carousel.carousel-slider').carousel({fullWidth: true});
    }
    render(){
        const { classes, ads } = this.props;
        return (
        <div className="carousel carousel-slider center" style={{marginBottom: '2em'}} data-indicators="true">
            <div className="carousel-fixed-item center"></div>
            <div className="carousel-item red white-text">
                <h2>欢迎来到WaLa代购平台！</h2>
                <p className="white-text">本平台所有入驻商家均居住澳洲本地，保证澳洲正品货源。</p>
            </div>
            {
                ads.map(function(ad,index){
                    return <div key={index} className="carousel-item blue white-text">
                        <h2>{ad.title}</h2>
                        <p className="white-text">{ad.content}</p>
                        <img src={ad.image} onError={ (e)=>{e.target.src="/assets/blog/profile.jpeg"}} />
                    </div>
                })
            }
            <div className="carousel-item blue white-text" href="#four!">
                <h2>广告位招租</h2>
                <p className="white-text">详情咨询请邮件至E-mail: wenbo199019@gmail.com</p>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    allItems: state.root.items,
    loading: state.root.loading
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

AdsListBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdsListBoard));
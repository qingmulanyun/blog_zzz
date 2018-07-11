import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import { connect } from 'react-redux'


const styles = theme => ({
    adContainer: {
        height: '100%'
    },
    adBackground: {
        height: '100%',
        backgroundPosition: "center center",
        position: "relative",
        '&:before': {
            content: '',
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        }
    },
    firstAdContent:{
        paddingTop: '2em',
        background: "rgba(0,0,0,0.5)",
        height: '100%',
    },
    adContent: {
        background: "rgba(0,0,0,0.5)",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "unset",
        textAlign: "left",
        paddingLeft: "1em"
    }
});



class AdsListBoard extends React.Component{

    componentDidMount(prevProps, prevState){
        $('#ads-list-container').carousel();
    }

    render(){
        const { classes, ads } = this.props;
        return (
        <div className="carousel carousel-slider center" id="ads-list-container" style={{marginBottom: '2em'}} data-indicators="true">
            <div className="carousel-fixed-item center"></div>
            <div className="carousel-item white-text">
                <div className={classes.adContainer}>
                    <div className={classes.adBackground} style={{ backgroundImage: "url('/assets/login-bk.jpg')"  }}>
                        <div className={classes.firstAdContent}>
                            <h2>欢迎来到WaLa代购平台！</h2>
                            <p className="white-text">本平台所有入驻商家均居住澳洲本地，保证澳洲正品货源。</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                ads.map(function(ad,index){
                    return <div key={index} className="carousel-item grey lighten-2  white-text">
                        <div className={classes.adContainer}>
                            <div className={classes.adBackground} style={{ backgroundImage: `url(${ad.image})`,  backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
                                <div className={classes.adContent}>
                                    <h2>{ad.title}</h2>
                                    <p className="white-text">{ad.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }

            <div className="carousel-item blue lighten-2 white-text">
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
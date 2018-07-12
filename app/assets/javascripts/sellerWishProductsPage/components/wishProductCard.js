import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import classnames from 'classnames';
import Card, { CardHeader, CardContent, CardActions } from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from "@material-ui/core/colors/red";

import RingIcon from '@material-ui/icons/RoomService';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux'
import moment from 'moment'
import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';
import { toggleProposalPage } from '../redux/actions/rootActions'

moment.locale('ZH_CN');

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 280,
        width: "100%"
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    cardTitle: {
    overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        width: "100%",
        display: "inline-block"
},cardTitleContent: {
        width: '80%'
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});


class WishProductCard extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const { classes, wishProduct, toggleProposalPage } = this.props;

        return (
            <Grow in={true} timeout={1000}>
                <Card className={classes.card}>
                    <CardHeader
                        classes={{
                            title: classes.cardTitle,
                            content: classes.cardTitleContent
                        }}
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                H/C
                            </Avatar>
                        }
                        title={wishProduct.name}
                        subheader={moment(wishProduct.updated_at).fromNow()}
                    />
                    <img
                        onError={ (e)=>{e.target.src="/assets/blog/profile.jpeg"}}
                        className={classes.media}
                        src={wishProduct.image}
                        title={wishProduct.name}

                    />
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            {wishProduct.name}
                        </Typography>
                    </CardContent>

                    <CardActions className={classes.actions} disableActionSpacing>
                        <Tooltip id="tooltip-right" title="向买家报价" placement="right">
                            <IconButton aria-label="make a proposal" onClick={(e)=> toggleProposalPage(true)}>
                                <RingIcon />
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                               {wishProduct.description}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grow>
        );
    }
}

WishProductCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    loading: state.root.loading,
    proposalPageOpen: state.root.proposalPageOpen
});

const mapDispatchToProps = (dispatch) => {
    return {
        toggleProposalPage: (boolean) => {
            dispatch(toggleProposalPage(boolean))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WishProductCard));
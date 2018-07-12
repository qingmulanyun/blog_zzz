import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from "@material-ui/core/colors/red";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import moment from 'moment'
import Grow from '@material-ui/core/Grow';
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


class ItemCard extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const { classes, item } = this.props;

        return (
            <Grow in={true} timeout={1000}>
                <Card className={classes.card}>
                    <a href={`/items/${item.id}`} target="_blank">
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
                        title={item.name}
                        subheader={moment(item.updatedAt).fromNow()}
                    />
                    <img
                        onError={ (e)=>{e.target.src="/assets/blog/profile.jpeg"}}
                        className={classes.media}
                        src={item.image}
                        title={item.name}

                    />
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            ¥ {item.price}
                        </Typography>
                    </CardContent>
                    </a>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <Chip label={`销量：${item.sales_number} 件`} className={classes.chip} />
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
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
                               {item.description}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grow>
        );
    }
}

ItemCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard);
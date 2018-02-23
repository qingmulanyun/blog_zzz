import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import red from 'material-ui/colors/red';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    headingHighlight: {
        fontSize: theme.typography.pxToRem(18),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: red[500],
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    oneColFlex: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '90%',
        flexShrink: 0,
    }
});

class ItemDetailsCard extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes, item } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.oneColFlex}>{item.name}</Typography>
                        {/*<Typography className={classes.secondaryHeading}>{item.type}</Typography>*/}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                           {item.name_details}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.secondaryHeading}>原价：</Typography>
                        <Typography className={classes.heading}>
                            ¥ {item.original_price}
                        </Typography>
                        <Typography className={classes.secondaryHeading}>促销价：</Typography>
                        <Typography className={classes.headingHighlight}>
                            ¥ {item.price}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            价格随购买时汇率浮动。
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.secondaryHeading}>运费：</Typography>
                        <Typography className={classes.heading}>
                            ¥ {item.transport_cost}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            澳洲空运，5-7 天到达国内，清关18-25 天左右。发货后平均28天左右到货。
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')} >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography className={classes.secondaryHeading}>简介：</Typography>
                        <Typography className={classes.oneColFlex}>
                            {item.description}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {item.warning}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

ItemDetailsCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemDetailsCard);
import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import {
    Template, TemplatePlaceholder, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';

import Button from 'material-ui/Button';

import Typography from 'material-ui/Typography';

import blue from 'material-ui/colors/blue';

const styles = theme => ({
    button: {
        marginLeft: theme.spacing.unit,
    },
    highLight: {
        fontSize: "18px",
        color: blue[700],
        fontWeight: "bold"
    }
});

class CheckoutButton extends React.Component {

    render (){
        const { classes, selectedIndexes, rows } = this.props;

        var selectedIds =[];
        var totalPrice = 0;
        selectedIndexes.map(function(index){
            selectedIds.push(rows[index].id)
            totalPrice += rows[index].total_price
        });

        return (
            <Plugin name="AddNewItem">
                <Template name="toolbarContent">
                    <TemplatePlaceholder />
                    <TemplateConnector>
                        {({}) => (
                            <React.Fragment>

                                <div>
                                    <Typography variant="caption">
                                        已选商品 <span className={classes.highLight}> {selectedIds.length} </span> 件
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="caption">
                                        合计（不含运费）<span className={classes.highLight}> ¥{totalPrice} </span>
                                    </Typography>
                                </div>
                                <div>
                                    <Button
                                        variant="raised"
                                        color="primary"
                                        className={classes.button}
                                        disabled={selectedIds.length === 0}
                                    >
                                        结算
                                    </Button>
                                </div>

                            </React.Fragment>
                        )}
                    </TemplateConnector>
                </Template>
            </Plugin>
        );
    }
}


const mapStateToProps = (state) => ({
    selectedIndexes: state.grid.selection,
    rows: state.grid.rows,
    loading: state.root.loading
});

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CheckoutButton));
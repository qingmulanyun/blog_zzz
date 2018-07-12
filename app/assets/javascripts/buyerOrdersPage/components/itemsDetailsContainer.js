import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux';
import {
    Grid,
    Table, TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';

import { FormatItemImageCell } from '../../utilities/tableCellComponent/formatItemImageCell'
import { FormatItemNameCell } from '../../utilities/tableCellComponent/formatItemNameCell'
import { FormatCurrencyCell } from '../../utilities/tableCellComponent/formatCurrencyCell'
const Cell = (props) => {
    if (props.column.name === 'price' || props.column.name === 'total_price' ) {
        return <FormatCurrencyCell {...props} />;
    }
    if (props.column.name === 'image'  ) {
        return <FormatItemImageCell {...props} />;
    }
    if (props.column.name === 'item_info'  ) {

        return <FormatItemNameCell {...props} />;
    }
    if (props.column.name === 'actions'  ) {
        return <FormatActionCell {...props} />;
    }
    return <Table.Cell {...props} />;
};


const styles = theme => ({
    title: {
        color: theme.palette.text.primary,
    },
    container: {
        boxShadow: "unset !important"
}
});
class ItemDetailContainer extends React.Component {

    render(){
        const { row, classes, itemsColumns, itemsColumnsExtensions } = this.props;

        return (
            <div style={{ margin: 20 }}>
                <Paper className={classes.container}>
                    <Grid
                        rows={row.items}
                        columns={itemsColumns}
                    >
                        <Table
                            cellComponent={Cell}
                            columnExtensions={itemsColumnsExtensions}
                        />
                        <TableHeaderRow />
                    </Grid>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => state.grid;

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemDetailContainer));


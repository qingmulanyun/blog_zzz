import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TableCell } from '@material-ui/core/Table';
import { withStyles } from "@material-ui/core/styles";
import moment from 'moment'
moment.locale('ZH_CN');

const getColor = (amount) => {
    if (amount < 3000) {
        return '#F44336';
    }
    if (amount < 5000) {
        return '#FFC107';
    }
    if (amount < 8000) {
        return '#FF5722';
    }
    return '#009688';
};

const styles = theme => ({
    formatDateCell: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
});

const FormatDateCellBase = ({
    tableColumn, value, classes, style,
}) => (
    <TableCell
        className={classes.formatDateCell}
    >
        {moment(value).format("YYYY-MM-DD")}
    </TableCell>
);

FormatDateCellBase.propTypes = {
    value: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    tableColumn: PropTypes.object,
};
FormatDateCellBase.defaultProps = {
    style: {},
    tableColumn: {},
};

export const FormatDateCell = withStyles(styles, { name: 'FormatDateCell' })(FormatDateCellBase);
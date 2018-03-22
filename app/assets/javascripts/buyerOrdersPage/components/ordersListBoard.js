import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    SortingState, SelectionState, FilteringState, PagingState, GroupingState, RowDetailState,
    IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow, TableRowDetail, ColumnChooser, TableColumnVisibility,
    GroupingPanel, PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';


import { createGridAction, fetchBuyerOrders } from '../redux/actions/gridActions';

import { FormatCurrencyCell } from '../../utilities/tableCellComponent/formatCurrencyCell'
import { FormatItemImageCell } from '../../utilities/tableCellComponent/formatItemImageCell'
import { FormatItemNameCell } from '../../utilities/tableCellComponent/formatItemNameCell'
import { FormatAddressCell } from '../../utilities/tableCellComponent/formatAddressCell'
import { FormatActionCell } from './shared/formatActionCell'
import { FormatDateCell } from './shared/formatDateCell'
import { FormatStatusCell } from './shared/formatStatusCell'

import ItemDetailContainer from './itemsDetailsContainer'
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
    if (props.column.name === 'created_at'  ) {
        return <FormatDateCell {...props} />;
    }
    if (props.column.name === 'status'  ) {
        return <FormatStatusCell {...props} />;
    }
    if (props.column.name === 'delivery_address'  ) {
        return <FormatAddressCell {...props} />;
    }
    return <Table.Cell {...props} />;
};

class OrdersListBoard extends React.Component {

    componentDidMount() {
        this.props.fetchBuyerOrders();
    }

    render (){
        const {rows,
            columns,
            sorting,
            onSortingChange,
            selection,
            onSelectionChange,
            expandedRows,
            onExpandedRowsChange,
            grouping,
            onGroupingChange,
            expandedGroups,
            onExpandedGroupsChange,
            filters,
            onFiltersChange,
            currentPage,
            onCurrentPageChange,
            pageSize,
            onPageSizeChange,
            allowedPageSizes,
            columnOrder,
            onColumnOrderChange,
            columnWidths,
            onColumnWidthsChange,
        } = this.props;

        return(
            <div>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <FilteringState
                        filters={filters}
                        onFiltersChange={onFiltersChange}
                    />
                    <SortingState
                        sorting={sorting}
                        onSortingChange={onSortingChange}
                    />
                    <GroupingState
                        onGroupingChange={onGroupingChange}
                        expandedGroups={expandedGroups}
                        onExpandedGroupsChange={onExpandedGroupsChange}
                        grouping={grouping}
                    />
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={onCurrentPageChange}
                        pageSize={pageSize}
                        onPageSizeChange={onPageSizeChange}
                    />
                    <RowDetailState
                        defaultExpandedRowIds={[0]}
                        expandedRows={expandedRows}
                        onExpandedRowsChange={onExpandedRowsChange}
                    />
                    <SelectionState
                        selection={selection}
                        onSelectionChange={onSelectionChange}
                    />


                    <IntegratedFiltering />
                    <IntegratedSorting />

                    <IntegratedPaging />
                    <IntegratedSelection />

                    <DragDropProvider />

                    <Table
                        cellComponent={Cell}
                    />

                    <TableColumnReordering
                        order={columnOrder}
                        onOrderChange={onColumnOrderChange}
                    />

                    <TableColumnResizing
                        columnWidths={columnWidths}
                        onColumnWidthsChange={onColumnWidthsChange}
                    />

                    <TableHeaderRow showSortingControls />

                    <TableSelection showSelectAll />
                    <TableRowDetail
                        contentComponent={ItemDetailContainer}
                    />
                    <Toolbar />

                    <PagingPanel
                        pageSizes={allowedPageSizes}
                    />
                </Grid>
            </div>
        );
    }
}

OrdersListBoard.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    // detailColumns: PropTypes.array.isRequired,
    sorting: PropTypes.array.isRequired,
    onSortingChange: PropTypes.func.isRequired,
    selection: PropTypes.array.isRequired,
    onSelectionChange: PropTypes.func.isRequired,
    expandedRows: PropTypes.array.isRequired,
    onExpandedRowsChange: PropTypes.func.isRequired,
    grouping: PropTypes.array.isRequired,
    onGroupingChange: PropTypes.func.isRequired,
    expandedGroups: PropTypes.array.isRequired,
    onExpandedGroupsChange: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    onCurrentPageChange: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    allowedPageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    columnOrder: PropTypes.array.isRequired,
    onColumnOrderChange: PropTypes.func.isRequired,
    columnWidths: PropTypes.array.isRequired,
    onColumnWidthsChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.grid;

const mapDispatchToProps = dispatch => ({
    onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
    onSelectionChange: selection => dispatch(createGridAction('selection', selection)),
    onExpandedRowsChange: expandedRows => dispatch(createGridAction('expandedRows', expandedRows)),
    onGroupingChange: grouping => dispatch(createGridAction('grouping', grouping)),
    onExpandedGroupsChange: expandedGroups => dispatch(createGridAction('expandedGroups', expandedGroups)),
    onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
    onCurrentPageChange: currentPage => dispatch(createGridAction('currentPage', currentPage)),
    onPageSizeChange: pageSize => dispatch(createGridAction('pageSize', pageSize)),
    onColumnOrderChange: order => dispatch(createGridAction('columnOrder', order)),
    onColumnWidthsChange: widths => dispatch(createGridAction('columnWidths', widths)),
    fetchBuyerOrders: () => dispatch(fetchBuyerOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersListBoard);
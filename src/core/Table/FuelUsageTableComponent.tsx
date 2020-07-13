import React, { useEffect } from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { ICollapsibleTableProps, IRowProps, IHeaderProps, IDashboardModel, IDashboardSubModel, IDashboardDateFilterModel } from '../../models/dashboard';
import { IDriverServiceTimeModel, } from '../../models/driverServiceTime';
import { isDashboard } from '../../containers/DashboardContainer';
import { isoToLocal } from '../../utils/date';
import { TablePagination, TableSortLabel, Grid, Select } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { groupBy } from '../../utils/database';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_PAGINATION_ROW_COUNT } from '../../constants/Actions';
import RangeFilter from '../../components/shared/DropdownComponent';

const dateFormat = 'DD/MM/YYYY hh:mm:ss A';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  search: {
    marginBottom: '1%',
  },
  collapsibleDates:{
    width:"100%"
  }
});

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
        backgroundColor: theme.palette.action.hover,
        '&$selected, &$selected:hover': {
          backgroundColor: "#bdbdbd"
        },
      },
    selected:{},
  }),
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const Header = (props: IHeaderProps) => {
  const { headers, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: any) => (event: unknown) => {
    onRequestSort(event, property);
  };

  function sortingOrder(columnName: string){
    if(orderBy === columnName)
      return order;
    else
      return 'asc'
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell />
        {
          headers.map((header, index) => <StyledTableCell key={index} align="left"><TableSortLabel active={orderBy === header.columnName}
          direction= {sortingOrder(header.columnName) == 'asc'? 'asc':'desc'} //{orderBy === header.columnName ? orderBy : 'asc'}
          onClick={createSortHandler(header.columnName)}>{header.columnValue}
              </TableSortLabel></StyledTableCell>)
        }
      </TableRow>
    </TableHead>
  );
};

const Row = (rowProps: IRowProps) => {
  const { data, handleDriverId, driverId } = rowProps;
  let dashboardModel = data as IDashboardModel;
  const [isSelected, setIsSelected] = React.useState(false);

   useEffect(()=>{
     if(data.DriverId === driverId){
       setIsSelected(true)
      }else{
        setIsSelected(false)
      }
    },[driverId])

  return (
    <>
      <StyledTableRow selected={isSelected} onClick={()=>handleDriverId(data.DriverId)}>
      <StyledTableCell></StyledTableCell>
      <StyledTableCell component="th" scope="row">{dashboardModel.DriverId}</StyledTableCell>
      <StyledTableCell align="left">{dashboardModel.DriverName}</StyledTableCell>
      <StyledTableCell align="left">{dashboardModel.VehicleName}</StyledTableCell>
      <StyledTableCell align="left">{dashboardModel.VehicleLicenseNo}</StyledTableCell>
      </StyledTableRow >
    </>
  )
};

const SRow = (rowProps: IRowProps) => {
  const data = rowProps.data as IDriverServiceTimeModel;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <StyledTableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {data.DriverId}
        </StyledTableCell>
        <StyledTableCell align="left">{data.DriverName}</StyledTableCell>
        <StyledTableCell align="left">{data.DriverMobile}</StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
};

const CollapsibleTable = (props: ICollapsibleTableProps) => {
  const { driverCondition, headers, barData, data, rangeFilter, handleDriverId, driverId } = props;
  const classes = useRowStyles();
  const [page, setPage] = React.useState(0);
  const rowCount = useSelector((store:any)=>store.rowCount.rowCount);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowCount);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('DriverId');
  const packetTimeFormat = 'HH:mm:ss';
  const dispatch = useDispatch();

  /* In DateFilterModel, filter the driver data by date.
  Sort by time on each date */
   data.forEach((arr :any,i :number)=>{
     if(!arr.PacketTime){
       return
     }
     arr.DateFilterModel = groupBy(arr.SubModel,"Date");
     const DateFilterModelClone = JSON.parse(JSON.stringify(arr.DateFilterModel));
     for (let key in DateFilterModelClone){
      DateFilterModelClone[key].sort((d1:any, d2:any) => new Date(d1.PacketTime).getTime() - new Date(d2.PacketTime).getTime());
      DateFilterModelClone[key].forEach((el:any) => el.PacketTime = isoToLocal(el.PacketTime,packetTimeFormat));
    }
    arr.DateFilterModel = DateFilterModelClone
  })
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    dispatch({
      type: UPDATE_PAGINATION_ROW_COUNT,
      payload: +event.target.value
    })
  };

  const handleRequestSort = (event: unknown, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [filteredData, setFilteredData] = React.useState(data);
  useEffect(() => { setFilteredData(data)}, [data])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
   
    const data = props.data as IDashboardModel[]
    const searchText = event.target.value
    const filteredData = data.filter(e => e.DriverName.toLowerCase().includes(searchText.toLowerCase()) || e.VehicleName.toLowerCase().includes(searchText.toLowerCase()))
  
    setFilteredData(filteredData)
  };

  function getComparator(order: string, orderBy: string) {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }
  
  function descendingComparator(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array: any[], comparator: any) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <>
      <div>
      <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={2}>
        <Grid item={true} xs={10}>
        <TextField
          className={classes.search}
          placeholder="Search"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        </Grid>
        <Grid item={true} xs={2}>
        <RangeFilter {...rangeFilter} />
        </Grid>
      </Grid>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <Header headers={headers} onRequestSort={handleRequestSort} orderBy={orderBy} order={order} />
          <TableBody style={{cursor:"pointer"}}>
          {
            (isDashboard(filteredData[0])) &&
            (stableSort(filteredData as Array<IDashboardModel>, getComparator(order, orderBy)))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((driver: IDashboardModel, index: number): JSX.Element => {
              const rowProps = {
                data: driver as IDashboardModel,
                driverCondition,
                barData,
                driverId,
                handleDriverId
              } as IRowProps;
              return (<Row key={driver.DriverId} {...rowProps} />)
              })
            }
            {
              (!isDashboard(filteredData[0])) &&
              (stableSort(filteredData as  Array<IDriverServiceTimeModel>, getComparator(order, orderBy)))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((driverService: IDriverServiceTimeModel, index: number) => {
                const rowProps = {
                  data: driverService,
                  driverCondition
                } as IRowProps;
                return (<SRow key={driverService.DriverId} {...rowProps} />);
              })
            }       
            {
              filteredData.length === 0 &&
              <StyledTableRow className={classes.root}>
                <StyledTableCell component="th" scope="row" style={{ textAlign: 'center' }} colSpan={10}>No Data Available</StyledTableCell>
              </StyledTableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      {filteredData.length > 0 &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={filteredData.length}
          labelRowsPerPage="Records per page"
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      }
    </>
  );
};

export default CollapsibleTable;
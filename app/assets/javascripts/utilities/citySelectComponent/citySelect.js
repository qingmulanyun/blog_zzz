import React from 'react';
import PropTypes from 'prop-types';
import { provinceData } from './data/stateCityData';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import findIndex from 'lodash.findindex';
const style = theme => ({
    rootContainer: {
        marginTop: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginRight: theme.spacing.unit,
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginRight: theme.spacing.unit * 4,
        width: 100,
    },
    addressLine: {
        width: 450,
    },
    menu: {
        width: 200,
    },
});

const propTypes={
    defaultValue:PropTypes.object,//{ province:'北京',city:'北京',area:'东城区'}
    value:PropTypes.object,//{ province:'北京',city:'北京',area:'东城区'}
    onChange:PropTypes.func
}

const defaultProps={
    defaultValue:{ province:'山东',city:'滨州',area:'博兴县'},
    value:null,
    onChange:()=>{}
}
class CitySelect extends React.Component {
    constructor() {
        super();
        this.state = {
            province:'山东',
            provinceIndex: 0,
            cityIndex: 0,
            cities: provinceData[0].city,
            secondCity: provinceData[0].city[0].name,
            areas: provinceData[0].city[0].area,
            secondArea: provinceData[0].city[0].area[0],
        }
    }
    componentDidMount(){
        const {defaultValue:_defaultValue,value} = this.props;
        let defaultValue=value?value:_defaultValue;
        let province=defaultValue.province;
        let provinceIndex=this.getIndex('province',defaultValue.province);
        let cityIndex=this.getIndex('city',defaultValue.city,provinceIndex);
        let cities=provinceData[provinceIndex].city;
        let secondCity=defaultValue.city;
        let areas=cities[cityIndex].area;
        let secondArea=defaultValue.area;
        this.setState({
            province,
            provinceIndex,
            cityIndex,
            cities,
            secondCity:secondCity,
            areas,
            secondArea
        })
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.value)return;
        const {province,city,area} = nextProps.value;
        this.setState({
            province,
            secondCity:city,
            secondArea:area
        })
        this.handleProvinceChange(province);
    }

    getIndex=(type,name,provinceIndex)=>{
        let provinceI=provinceIndex||this.state.provinceIndex;
        switch (type){
            case 'province':
                return findIndex(provinceData, function(province) {
                    return province.name == name;
                });
                break;
            case 'city':
                return findIndex(provinceData[provinceI].city, function(city) {
                    return city.name == name;
                });
                break;
        }
    }
    handleProvinceChange=(value)=> {
        let index=this.getIndex('province',value);
        let city=provinceData[index].city[0].name;
        let area=provinceData[index].city[0].area[0];
        this.setState({
            province:value,
            cities: provinceData[index].city,
            secondCity: city,
            provinceIndex : index,
            areas: provinceData[index].city[0].area,
            secondArea: area,
        });
        this.onChange(value,city,area)
    }
    handleCityChange=(value)=> {
        let index=this.getIndex('city',value);
        let provinceIndex = this.state.provinceIndex;
        let area=provinceData[provinceIndex].city[index].area[0];
        this.setState({
            secondCity: provinceData[provinceIndex].city[index].name,
            areas: provinceData[provinceIndex].city[index].area,
            secondArea: area,
            cityIndex : value
        });
        this.onChange(undefined,value,area);
    }
    onSecondAreaChange=(value)=> {
        this.setState({
            secondArea: value,
        });
        this.onChange(undefined,undefined,value);
    }
    onChange=(province,city,area)=>{
        this.props.onChange({
            province:province||this.state.province,
            city:city||this.state.secondCity,
            area:area
        })
    }

    render() {
        const {classes } = this.props;
        const provinceOptions = provinceData.map((option, index)=> (
            <MenuItem key={index} value={option.name}>
                {option.name}
            </MenuItem>
        ));
        const cityOptions = this.state.cities.map((option, index) => (
            <MenuItem key={index} value={option.name}>
                {option.name}
            </MenuItem>
        ));
        const areaOptions = this.state.areas.map((option, index) => (
            <MenuItem key={index} value={option}>
                {option}
            </MenuItem>
        ));
        return (
            <div>
                <TextField
                    id="country"
                    label="所在地区"
                    className={classes.textField}
                    value='中国'
                    type="textarea"
                    margin="normal"
                    disabled
                    required
                />
                <TextField
                    id="province"
                    select
                    label="请选择省份"
                    className={classes.textField}
                    value={this.state.province}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    onChange={(e)=>this.handleProvinceChange(e.target.value)}
                    required
                    helperText=""
                    margin="normal"
                >
                    {provinceOptions}
                </TextField>

                <TextField
                    id="province"
                    select
                    label="请选择市区"
                    className={classes.textField}
                    value={this.state.secondCity}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    onChange={(e)=>this.handleCityChange(e.target.value)}
                    required
                    helperText=""
                    margin="normal"
                    >
                    {cityOptions}
                </TextField>

                <TextField
                    id="province"
                    select
                    label="请选择地区"
                    className={classes.textField}
                    value={this.state.secondArea}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    onChange={(e)=>this.onSecondAreaChange(e.target.value)}
                    required
                    helperText=""
                    margin="normal"
                >
                    {areaOptions}
                </TextField>
            </div>
        );
    }
}
CitySelect.propTypes = propTypes;
CitySelect.defaultProps = defaultProps;

export default withStyles(style)(CitySelect);
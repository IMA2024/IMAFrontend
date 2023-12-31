import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text } from '@mantine/core';
import { IconFilter, IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({

  
  
    responsiveSearchRow: {
      display:'flex',
       flexDirection: 'row-reverse',
        gap:'20px',
         marginLeft:'-5px',
         //backgroundColor:'pink',
      [theme.fn.smallerThan('sm')]: {
        justifyContent: 'space-between',
        width:'100%',
        marginLeft:'0px',
        //float:'left',
      },
  
    },
  
    responsiveAddUserBtn: {
     
      [theme.fn.smallerThan('sm')]: {
        //backgroundColor:'pink',
      },
  
    },
  
    responsiveActiveBlock: {
  
      [theme.fn.smallerThan('sm')]: {
        display: 'none'
      },
  
  
    },
  
    responsiveUserType: {
     [theme.fn.smallerThan('sm')]: {
        display: 'none'
      },
  
    },
  
    responsiveSearch: {
     [theme.fn.smallerThan('sm')]: {
        display: 'none'
      },
  
    },

     responsiveClear: {
     [theme.fn.smallerThan('sm')]: {
        display: 'none'
      },
  
    },

    responsiveFilterIcon: {
        [theme.fn.largerThan('sm')]: {
           display: 'none'
         },
     
       },
  
  }))
  

const CountriesTable = () => {

const { classes } = useStyles();

const [countries, setCountries] =  useState([]);
const [search, setSearch] =  useState('');
const [region, setRegion] =  useState('');
const [filteredCountries, setFilteredCountries] =  useState([]);

const getCountries = async () => {
try {
const response = await axios.get('https://restcountries.com/v2/all');
setCountries(response.data);
setFilteredCountries(response.data);
} catch (error) {
console.log(error);
}
}

//const exportCsv = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

const columns = [
    {
        name: 'Country Name',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Country Native Name',
        selector: (row) => row.nativeName,
    },
    {
        name: 'Country Capital',
        selector: (row) => row.capital,
    },
    {
        name: 'Country Flag',
        selector: (row) => <img width={50} height={50} src={row.flag} />,
    },
    {
        name: 'Region',
        selector: (row) => row.region,
    },
    {
        name: 'Action',
        cell: (row) => <Box><IconEdit color='gray' /><IconEye color='gray' /><IconTrash color='gray' /></Box>,
    },
   

]

useEffect(() => {
getCountries();
}, []);

useEffect(() => {
const result = countries.filter(country => {
    return country.name.toLowerCase().match(search.toLowerCase());
});

setFilteredCountries(result);
}, [search]);

useEffect(() => {
    const resultSelect = countries.filter(country => {
        return country.region.toLowerCase().match(region.toLowerCase());
    });
    
    setFilteredCountries(resultSelect);
    }, [region]);



  return (
    <DataTable title='Practicing Table' columns={columns} data={filteredCountries}
    pagination
    fixedHeader
    fixedHeaderScrollHeight='300px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover

    subHeader
    subHeaderComponent={
      <Box className={classes.responsiveSearchRow}>
        <Box className={classes.responsiveFilterIcon} >
          <Menu shadow="" width={200} closeOnItemClick={false} >
            <Menu.Target>
            <Button size='md'>
        <IconFilter />
        </Button >
            </Menu.Target>
            <Menu.Dropdown bg={'#FAF9F6'}> 
    <Menu.Item>
    <TextInput
        
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
       
         />
         </Menu.Item>
         <Menu.Item>
         <Select
        
        onSearchChange={setRegion}
        searchValue={region}
        searchable
        placeholder="Select User Type"
        data={[
        { value: 'americas', label: 'americas' },
        { value: 'africa', label: 'africa' },
        { value: 'europe', label: 'europe' },
        { value: 'asia', label: 'asia' },
      ]}
    />
    </Menu.Item>
    <Menu.Item>
         <Select
        
        onSearchChange={setRegion}
        searchValue={region}
        searchable
        placeholder="Active/Block"
        data={[
        { value: 'americas', label: 'americas' },
        { value: 'africa', label: 'africa' },
        { value: 'europe', label: 'europe' },
        { value: 'asia', label: 'asia' },
      ]}
    />
    </Menu.Item>
    <Menu.Item>
    <Button variant="outline" miw={165}>
            Clear
        </Button>
    </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
        <Button variant="outline" size='md' className={classes.responsiveClear}>
            Clear
        </Button>
        <TextInput
        size='md'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={classes.responsiveSearch}
         />
         <Select
         size='md'
        onSearchChange={setRegion}
        searchValue={region}
        searchable
        placeholder="Select User Type"
        data={[
        { value: 'americas', label: 'americas' },
        { value: 'africa', label: 'africa' },
        { value: 'europe', label: 'europe' },
        { value: 'asia', label: 'asia' },
      ]}
      className={classes.responsiveUserType}
    />
         <Select
         size='md'
        onSearchChange={setRegion}
        searchValue={region}
        searchable
        placeholder="Active/Block"
        data={[
        { value: 'americas', label: 'americas' },
        { value: 'africa', label: 'africa' },
        { value: 'europe', label: 'europe' },
        { value: 'asia', label: 'asia' },
      ]}
      className={classes.responsiveActiveBlock}
    />
    <Button 
    size='md'
    className={classes.responsiveAddUserBtn}
    >
    Add User
    </Button>
        </Box>
    }
    responsive
     />
  )
}

export default CountriesTable
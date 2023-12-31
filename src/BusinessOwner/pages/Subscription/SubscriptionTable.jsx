import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Box, createStyles, Menu, Text, Modal, Badge, Image, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEye, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { deleteSubscriptionRecord } from '../../../api/businessOwner/subscription';
import { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';
import { notifications } from '@mantine/notifications';
import {  Hourglass } from 'react-loader-spinner';

const useStyles = createStyles((theme) => ({

  responsiveSearchContainer: {
    width:'100%',
    display: 'flex',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
  },

    responsiveSearchRow: {
      display:'flex',
      flexDirection: 'row-reverse',
      gap:'20px',
      marginLeft:'-5px',
      paddingTop: '20px',
      paddingBottom: '20px',
      [theme.fn.smallerThan('sm')]: {
        justifyContent: 'space-between',
        width:'100%',
        marginLeft:'0px',
      },
  
    },
  
    responsiveAddUserBtn: {
      marginTop:'20px',
     
      [theme.fn.smallerThan('sm')]: {
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
  

const BusinessSubscriptionTable = () => {

const { classes } = useStyles();
const { user } = useContext(UserContext);
const [subscriptions, setSubscriptions] =  useState([]);
const [search, setSearch] =  useState('');
const [type, setType] =  useState('');
const [filteredSubscriptions, setFilteredSubscriptions] =  useState([]);
const [opened, { open, close }] = useDisclosure(false); 
const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
const [specificTitle, setSpecificTitle] =  useState('');
const [specificType, setSpecificType] =  useState('');
const [specificBusiness, setSpecificBusiness] =  useState('');
const [specificAmount, setSpecificAmount] =  useState('');
const [specificMethod, setSpecificMethod] =  useState('');
const [specificDate, setSpecificDate] =  useState('');
const [modalDeletion, SetModalDeletion] = useState('');
const [dataLoaded, setDataLoaded] = useState(false);

const navigate = useNavigate();

const handleClear = () => {
  setSearch('');
  setType('');
  };

const handleDelete = async (id) => {
  try {
    await deleteSubscriptionRecord(id);
    const updatedSubscriptions = subscriptions.filter(subscription => subscription?._id !== id);
    setSubscriptions(updatedSubscriptions);
    setFilteredSubscriptions(updatedSubscriptions);
    notifications.show({ message: "Subscription Deleted Successfully", color: 'red' });
    setSlowTransitionOpened(false);
  } catch (error) {
    console.log(error);
  }
};

const deletionConfirmation = (id) => {
  setSlowTransitionOpened(true);
  SetModalDeletion(id);
};

const getSubscriptions = async () => {
  try {
    const response = await axios.get('https://imaa-2585bbde653a.herokuapp.com/businessOwner/viewSubscriptionRecord');
    const allSubscriptions = response?.data?.subscriptions;
    const mySubscriptions = allSubscriptions?.filter((subscription) => subscription?.business?.businessOwner === user?._id);
    setSubscriptions(mySubscriptions);
    setFilteredSubscriptions(mySubscriptions);
  } catch (error) {
    console.log(error);
  }
  finally {
    setDataLoaded(true);
  }
}


const handleViewSpecific = (row) => {
  open();
  setSpecificTitle(row?.title || 'N/A');
  setSpecificType(row?.type || 'N/A');
  setSpecificBusiness(row?.business?.name || 'N/A');
  setSpecificDate(row?.date || 'N/A');
  setSpecificAmount(row?.amount || 'N/A');
  setSpecificMethod(row?.method || 'N/A');

};

const columns = [
  {
    name: <strong>#</strong>,
    selector: (row, index) => index + 1, // Generate serial numbers dynamically
    sortable: true,
    width: '60px', // Set the width of the serial number column
  },
    {
        name: <strong>Business Name</strong>,
        width: '150px',
        selector: (row) => row?.business?.name || "N/A",
        sortable: true,
    },
    {
        name: <strong>Subscription Title</strong>,
        width: '170px',
        selector: (row) => row?.title || "N/A",
        sortable: true,
    },
    {
        name: <strong>Subscription Type</strong>,
        width: '170px',
        selector: (row) => row?.type || "N/A",
        sortable: true,
    },
    {
        name: <strong>Payment Method</strong>,
        width: '170px',
        selector: (row) => row?.method || "N/A",
        sortable: true,
    },
    {
      name: <strong>Amount</strong>,
      width: '150px',
      selector: (row) => row?.amount + " $"|| "N/A",
      sortable: true,
  },
 
    {
        name: <strong>Action</strong>,
        width: '150px',
        cell: (row) => <Box><IconEye color='gray' onClick={() => handleViewSpecific(row)} /><IconTrash color='gray' onClick={() => deletionConfirmation(row?._id)} /></Box>    },
]

useEffect(() => {
getSubscriptions();
}, []);

useEffect(() => {
const result = subscriptions.filter(subscription => {
    return subscription?.business?.name.toLowerCase().match(search.toLowerCase());
});

setFilteredSubscriptions(result);
}, [search]);

useEffect(() => {
    const resultSelect = subscriptions.filter(subscription => {
        return subscription?.type.toLowerCase().match(type.toLowerCase());
    });
    
    setFilteredSubscriptions(resultSelect);
    }, [type]);

useEffect(() => {
    getSubscriptions().then((data) => {
        const subscriptionsData = data.map((subscription) => ({ ...subscription, status: 'active' }));
        setSubscriptions(subscriptionsData);
        setFilteredSubscriptions(subscriptionsData);
      });
    }, []);

  return (
    <Box 
    sx={{
      fontFamily:'Poppins'
    }}
    >
      {dataLoaded ? (  
    <DataTable columns={columns} data={filteredSubscriptions}
    pagination
    fixedHeader
    fixedHeaderScrollHeight='650px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    subHeader
    subHeaderComponent={
      <Box className={classes.responsiveSearchContainer}>
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
    <Button variant="outline" miw={165} onClick ={() => {handleClear()}} >
            Clear
        </Button>
    </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
        <Button variant="outline" size='md' className={classes.responsiveClear} onClick ={() => {handleClear()}} >
            Clear
        </Button>
        <TextInput
        size='md'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={classes.responsiveSearch}
         />
         </Box>
     <Button
              size='md'
              className={classes.responsiveAddUserBtn}
              onClick={() => navigate('/BuySubscription')}
            >
              Buy Subscription
      </Button>
      </Box>   
    }
    responsive
     />
     ) : (
      // Render the loading spinner when data is not yet loaded
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#0096FF', '	#FF5F1F']}
      />
      </div>
    )}
    <Modal title={<Text style={{fontWeight:'bold', fontSize:'20px'}}>Subscription Details</Text>} radius={'md'}  opened={opened} onClose={close}  size={'md'}  >
  <Box mb={30}  style={{display:'flex', flexDirection:'column'}}>
    <Box  mah={800}><Image maw={800}radius="md" src={'https://img.freepik.com/premium-vector/happy-business-colleagues-team-portrait_179970-1271.jpg?w=2000'} alt="Random image" /></Box>
    <Box  mah={380} miw={250}  style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Business Name:</Text><Text fw={'bold'} ml={5}>{specificBusiness}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Subscription Title:</Text><Text fw={'bold'} ml={5}>{specificTitle}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Subscription Type:</Text><Text fw={'bold'} ml={5}>{specificType}</Text></Box>
    {/*<Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Date:</Text><Text fw={'bold'} ml={5}>{specificDate}</Text></Box>*/}
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Amount:</Text><Text fw={'bold'} ml={5}>{specificAmount} $</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Method:</Text><Text fw={'bold'} ml={5}>{specificMethod}</Text></Box>
    </Box>
  </Box>
      </Modal>
      <Modal  opened={slowTransitionOpened} onClose={() => setSlowTransitionOpened(false)} title={<Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Deletion Confirmation</Text>} transitionProps={{ transition: 'rotate-left' }}>
            <Text>Are you sure you want to delete?</Text>
            <Box mt={'xl'} style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
            <Button size='sm' color='green.9' onClick={() => setSlowTransitionOpened(false)}>Cancel</Button>
            <Button type="submit" size='sm' color='red.8' onClick={() => handleDelete(modalDeletion)} >Delete</Button>
            </Box>
        </Modal>
     </Box>
  )
}
export default BusinessSubscriptionTable
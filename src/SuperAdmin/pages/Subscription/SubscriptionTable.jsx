import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Button, TextInput, Select, Box, createStyles, Menu, Text, Modal, Badge, Image, ScrollArea, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconEdit, IconEye, IconTrash, IconUser, IconPhone, IconMail, IconHome  } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { modals } from '@mantine/modals';
import { deleteSubscription } from '../../../api/admin/subscriptions';
import { notifications } from '@mantine/notifications';

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
        //display: 'none'
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
  

const SubscriptionTable = () => {

const { classes } = useStyles();
const [subscriptions, setSubscriptions] =  useState([]);
const [search, setSearch] =  useState('');
const [filteredSubscriptions, setFilteredSubscriptions] =  useState([]);
const [opened, { open, close }] = useDisclosure(false);
const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
const [specificTitle, setSpecificTitle] =  useState('');
const [specificType, setSpecificType] =  useState('');
const [specificPrice, setSpecificPrice] =  useState('');
const [specificLimit, setSpecificLimit] =  useState('');
const [specificDescription, setSpecificDescription] =  useState('');
const navigate = useNavigate();

const handleClear = () => {
  setSearch('');
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubscription(id);
      const updatedSubscriptions = subscriptions.filter(subscription => subscription._id !== id);
      setSubscriptions(updatedSubscriptions);
      setFilteredSubscriptions(updatedSubscriptions);
      notifications.show({ message: "Subscription Deleted Successfully", color: 'red' });
      setSlowTransitionOpened(false);
    } catch (error) {
      console.log(error);
    }
  };

const getSubscriptions = async () => {
try {
const response = await axios.get('http://localhost:5000/admin/viewSubscriptions');
setSubscriptions(response?.data?.subscriptions);
console.log(response?.data?.subscriptions);
setFilteredSubscriptions(response?.data?.subscriptions);
} catch (error) {
console.log(error);
}
}

const handleViewSpecific = (row) => {
  open();
  setSpecificTitle(row?.title || 'N/A');
  setSpecificType(row?.type || 'N/A');
  setSpecificPrice(row?.price || 'N/A');
  setSpecificLimit(row?.limit || 'N/A');
  setSpecificDescription(row?.description || 'N/A');
};

const handleViewSpecificBusinesSubscriptions = (row) => {
  setSlowTransitionOpened(true);
};

const columnsBusinessOwnerSubscriptions = [
  {
    name: '#',
    selector: (row, index) => index + 1, // Generate serial numbers dynamically
    sortable: true,
    width: '60px', // Set the width of the serial number column
  },
    {
        name: <strong>Business Name</strong>,
        selector: (row) => row?.name || 'N/A',
        width: '190px',
        sortable: true,
        allowOverflow: 'yes',
    },
    {
        name: <strong>Business Owner Name</strong>,
        selector: (row) => row?.capital || 'N/A',
       width: '190px',
        sortable: true,
        allowOverflow: 'yes',
      },
    {
        name: <strong>Subscription Title</strong>,
        width: '190px',
        allowOverflow: 'yes',
        selector: (row) => row?.name || 'N/A',
        sortable: true,
    },
    {
        name: <strong>Subscription Type</strong>,
        width: '190px',
        allowOverflow: 'yes',
        selector: (row) => row?.region || 'N/A',
        sortable: true,
    },
    {
        name: <strong>Payment Method</strong>,
        width: '190px',
        allowOverflow: 'yes',
        selector: (row) => row?.nativeName || 'N/A',
        sortable: true,

    },
 
    {
        name: <strong>Action</strong>,
        width: '190px',
        allowOverflow: 'yes',
        cell: (row) => <Box><IconEye color='gray' onClick={() => handleViewSpecificBusinesSubscriptions(row)} /><IconTrash color='gray' /></Box>
    },
]

const columnsSuperAdminSubscriptions = [
  {
    name: '#',
    selector: (row, index) => index + 1, // Generate serial numbers dynamically
    sortable: true,
    width: '60px', // Set the width of the serial number column
  },
    {
        name: <strong>Subscription Title</strong>,
        selector: (row) => row?.title || 'N/A',
        sortable: true,
    },
    {
        name: <strong>Subscription Type</strong>,
        selector: (row) => row?.type || 'N/A',
        width: '170px',
        sortable: true,
      },
    {
        name: <strong>Subscription Price</strong>,
        width: '180px',
        //allowOverflow: 'yes',
        selector: (row) => row?.price || 'N/A',
        sortable: true,
    },
    {
        name: <strong>Subscription Limit</strong>,
        width: '180px',
        selector: (row) => row?.limit || 'N/A',
        sortable: true,
    },
    {
        name: <strong>Description</strong>,
        selector: (row) => row?.description || 'N/A',
        sortable: true,
    },
 
    {
        name: <strong>Action</strong>,
        width: '150px',
        cell: (row) => <Box><IconEye color='gray' onClick={() => handleViewSpecific(row)} /><IconEdit color='gray' onClick={() => navigate('/EditSubscription')} /><IconTrash color='gray' onClick={() => handleDelete(row._id)}/>
        </Box>
    },
]

useEffect(() => {
getSubscriptions();
}, []);

useEffect(() => {
  const result = subscriptions.filter(subscription => {
    const matchesSearch = (
      subscription?.title.toLowerCase().includes(search.toLowerCase()) ||
      subscription?.type.toLowerCase().includes(search.toLowerCase())
    );

    return matchesSearch;
  });

  setFilteredSubscriptions(result);
}, [search, subscriptions]);


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
      <Tabs defaultValue="businessOwnerSubscriptions">
      <Tabs.List>
        <Tabs.Tab value="businessOwnerSubscriptions" icon={<AiOutlineShoppingCart size="0.8rem" />}>Business Owner Subscriptions</Tabs.Tab>
        <Tabs.Tab value="Subscriptions" icon={<AiOutlineShoppingCart size="0.8rem" />}>Subscriptions</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="businessOwnerSubscriptions" pt="xs">
    <DataTable columns={columnsBusinessOwnerSubscriptions} data={filteredSubscriptions}
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
    <Button variant="outline" miw={165} onClick={() => {handleClear()}}>
            Clear
        </Button>
    </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
      
        <Button variant="outline" size='md' className={classes.responsiveClear} onClick={() => {handleClear()}}>
            Clear
        </Button>
      {/*
        <Box style={{display:'flex', flexDirection:'row-reverse', width:'800px', justifyContent:'space-between'}}></Box>
    */}
        <TextInput
        size='md'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={classes.responsiveSearch}
         />
        </Box>
       
        </Box>
        
    }
    responsive
     />
    <Modal title={<Text style={{fontWeight:'bold', fontSize:'20px'}}>SubscriptioN Details</Text>} radius={'md'}  opened={slowTransitionOpened}  onClose={() => setSlowTransitionOpened(false)} size={'md'}  >
  <Box mb={30}  style={{display:'flex', flexDirection:'column'}}>
  <Box  mah={800}><Image maw={800}radius="md" src={`https://firebasestorage.googleapis.com/v0/b/intelligentmarketingagen-a3e0b.appspot.com/o/images%2FDon't%20Be%20Late.jpg?alt=media&token=484d01be-6f5d-40cd-906c-6e6e2e762d27`} alt="Random image" /></Box>
    <Box  mah={380} miw={250}  style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
    <Box ><Badge variant="filled" >{specificTitle}</Badge></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Subscription Type:</Text><Text fw={'bold'} ml={5}>{specificType}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Subscription Price:</Text><Text fw={'bold'} ml={5}>{specificPrice}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Subscription Limit:</Text><Text fw={'bold'} ml={5}>{specificLimit}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Subscription Description:</Text><Text fw={'bold'} ml={5}>{specificDescription}</Text></Box>
    </Box>
  </Box>
      </Modal>
      </Tabs.Panel>
      <Tabs.Panel value="Subscriptions" pt="xs">
      <DataTable columns={columnsSuperAdminSubscriptions} data={filteredSubscriptions}
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
      {/*
        <Box style={{display:'flex', flexDirection:'row-reverse', width:'800px', justifyContent:'space-between'}}></Box>
    */}
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
        onClick={() => navigate('/AddSubscription')}
        >
        Add Subscription
       </Button>
        </Box>
        
    }
    responsive
     />
    <Modal title={<Text style={{fontWeight:'bold', fontSize:'20px'}}>Subscription</Text>} radius={'md'}  opened={opened} onClose={close}  size={'md'}  >
  <Box mb={30}  style={{display:'flex', flexDirection:'column'}}>
    <Box  mah={800}><Image maw={800}radius="md" src={`https://firebasestorage.googleapis.com/v0/b/intelligentmarketingagen-a3e0b.appspot.com/o/images%2FDon't%20Be%20Late.jpg?alt=media&token=484d01be-6f5d-40cd-906c-6e6e2e762d27`} alt="Random image" /></Box>
    <Box  mah={380} miw={250}  style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
    <Box ><Badge variant="filled" >{specificTitle}</Badge></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Subscription Type:</Text><Text fw={'bold'} ml={5}>{specificType}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Subscription Price:</Text><Text fw={'bold'} ml={5}>{specificPrice}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Subscription Limit:</Text><Text fw={'bold'} ml={5}>{specificLimit}</Text></Box>
    <Box style={{display:'flex', flexDirection:'row', justifyContent:'left'}}><Text ml={5}>Subscription Description:</Text><Text fw={'bold'} ml={5}>{specificDescription}</Text></Box>
    </Box>
  </Box>
      </Modal>
      </Tabs.Panel>
      </Tabs>
     </Box>
  )
}
export default SubscriptionTable
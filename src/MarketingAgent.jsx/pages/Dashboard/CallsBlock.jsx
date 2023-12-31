import { createStyles, Group, Paper, SimpleGrid, Text, rem } from '@mantine/core';
import React, { useState , useEffect} from 'react';
import {
  IconUser,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    //padding: `calc(${theme.spacing.xl} * 1.5)`,
    //backgroundColor: '#EEBEFA',
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
    //color:'gray'
    //backgroundColor: '#EEBEFA'
  },
}));

const icons = {
  user: IconUser,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const UserData = [
    {
      "icon": "user",
      "diff": 23,
      "call": 50,
    },
  ]

  const ExpenseData = [
    {
     "icon": "user",
      "diff": 41,
      "call": 40,
    },
  ] 

  const ProfitData = [ 
    {
     "icon": "user",
      "diff": 64,
      "call": 90,
    },
  ] 


export default function CallsBlock() {
  const [revenue, setRevenue] = useState();
  const [expense, setExpense] = useState(); 
  const [profit, setProfit] = useState();
  const { classes } = useStyles();

  const statsUser = UserData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://imaa-2585bbde653a.herokuapp.com/admin/totalRevenue');
          const newData = await response.json();
          console.log(response);
          setRevenue(newData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://imaa-2585bbde653a.herokuapp.com/admin/totalExpense');
          const newData = await response.json();
          console.log(response);
          setExpense(newData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://imaa-2585bbde653a.herokuapp.com/admin/totalProfit');
          const newData = await response.json();
          console.log(response);
          setProfit(newData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://imaa-2585bbde653a.herokuapp.com/admin/totalCustomers');
          const newData = await response.json();
          console.log(response);
          setCustomers(newData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} mt={20} bg={'orange'}>
        <Group position="apart">
          <Text size="xs" color='white' className={classes.title}>
            SUCCESFUL CALLS
          </Text>
        
          <Icon  color='grey' className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.call}</Text>
          <Text color={stat.diff > 0 ? 'black' : 'grey'}  fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" color='white'  mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  const statsExpense = ExpenseData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}  mt={20}  bg={'red'}>
        <Group position="apart">
          <Text size="xs" color='white' className={classes.title}>
          REJECTED CALLS
          </Text>
        
          <Icon color='grey' className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.call}</Text>
          <Text color={stat.diff > 0 ? 'black' : 'grey'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" color='white' mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  const statsProfit = ProfitData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}  mt={20}  bg={'green'}>
        <Group position="apart">
          <Text size="xs" color='white'className={classes.title}>
          TOTAL CALLS
        </Text>
        
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
    
        </Group>
        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.call}</Text>
          <Text color={stat.diff > 0 ? 'black' : 'grey'}  fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" color='white' mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {statsUser}
        {statsExpense}
        {statsProfit}
      
      </SimpleGrid>
    </div>
  );
}
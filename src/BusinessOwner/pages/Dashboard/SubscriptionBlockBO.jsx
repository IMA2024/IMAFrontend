import React, { useState , useEffect} from 'react';
import { createStyles, Text, rem, Box } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: 20,
    /*
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    */
    backgroundImage: theme.fn.gradient({ from: 'violet.8', to: 'red.4', deg: 100 }),
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  title: {
    color: theme.white,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: rem(32),
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: rem(5),
  },

  stat: {
    flex: 1,

    '& + &': {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan('sm')]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));

const SubscriptionData = [
    {
      "stats": "40",
    },

  ];

  const PaymentData = [
  
    {
      "stats": "13",
    },

  ];

  const RevenueData = [
    {
      "stats": "30",
    },
  
  ];

  const BusinessData = [
    {
      "stats": "10",
    },

  ];






export default function SubscriptionsBlockBO() {

  const [totalSubscriptions, setTotalSubscriptions] = useState(); 
  const [totalRevenue, setTotalRevenue] = useState(); 
  const { classes } = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total subscriptions
        const subscriptionsResponse = await fetch('https://imaa-2585bbde653a.herokuapp.com/businessOwner/totalSubscriptions');
        const subscriptionsData = await subscriptionsResponse.json();
        setTotalSubscriptions(subscriptionsData);
  
        // Fetch total revenue
        const revenueResponse = await fetch('https://imaa-2585bbde653a.herokuapp.com/businessOwner/totalRevenue');
        const revenueData = await revenueResponse.json();
        setTotalRevenue(revenueData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
 
  const subsData = SubscriptionData.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{totalSubscriptions}</Text>
      <Text className={classes.title}>Subscriptions</Text>
      <Text className={classes.description}>24% more than in the same month last year, 33% more than two yuserBears ago</Text>
    </div>
  ));
  const revenueData = RevenueData.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{totalRevenue}</Text>
      <Text className={classes.title}>Revenue</Text>
      <Text className={classes.description}>1994 orders were completed this month, 97% satisfaction rate</Text>
    </div>
  ));
  
  return ( 
<div className={classes.root}>{subsData} {revenueData} </div>
  ) 
}
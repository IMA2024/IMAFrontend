import React, { useEffect, useState } from 'react'
import SubscriptionTable from './SubscriptionTable';
import { Title, Box } from '@mantine/core';
import axios from 'axios';


const ViewSubscription = () => {

  return (
    <Box>
        <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          View Subscription Details
        </Title>
        <SubscriptionTable />
    </Box>
  )
}

export default ViewSubscription
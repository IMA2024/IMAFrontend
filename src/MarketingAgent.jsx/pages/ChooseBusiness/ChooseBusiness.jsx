import React from 'react';
import { useForm } from '@mantine/form';
import { Button, Container, createStyles, Paper, Textarea, Title, Divider, Box, Select } from '@mantine/core';
import { addFAQ } from '../../../api/admin/faq';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({

  responsiveContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    //backgroundColor:'pink',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column'
    },

  },

  inputField: {
    width: '50%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%'
    },
  }

}));

export default function ChooseBusiness() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { businessOwner: '', business: '' },
    validateInputOnChange: true,
    validate: {
      businessOwner: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Please Select Business Owner Name'),
      business: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Please Select Business Name'),
    },
  });

  const handleSubmit = async (values) => {
    {/*
    const { question, answer } = values;

    try {
      const response = await addFAQ(question, answer);
      if (response.status === 201 || response.status === 200) {
        form.reset();
        notifications.show({ message: `FAQ Added Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  const handleCancel = () => {
    navigate('/Dashboard');
  */}
  };

  return (
    <Paper withBorder shadow="md" pt={35} pb={35} pl={35} pr={35} radius="md">
      <Title mb={10} order={2} align="center" sx={{ fontWeight: 550 }}>
      Step 1: Choose Business
      </Title>
      <Divider mb={30} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
        <Box className={classes.responsiveContainer}>
          <Select
            withAsterisk
            size="sm"
            className={classes.inputField}
            label="Business Owner Name"
            placeholder="Select Business Owner Name"
            {...form.getInputProps('businessOwner')}
            maxLength={100}
            data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
          />
          <Select
            withAsterisk
            size="sm"
            className={classes.inputField}
            label="Business Name"
            placeholder="Select Business Name"
            {...form.getInputProps('business')}
            maxLength={200}
            data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
          />
        </Box>
        <Container mt="sm" style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
        <Button  mt="sm"  size='sm' color='red.8' >
          Cancel
        </Button>
          <Button type="submit" mt="sm" size="sm" color="green.9" >
            Choose
          </Button>
        </Container>
      </form>
    </Paper>
  );
}
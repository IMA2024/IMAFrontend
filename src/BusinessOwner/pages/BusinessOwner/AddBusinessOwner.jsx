import { isNotEmpty, useForm } from '@mantine/form';
import { Image, TextInput, Button, Box, createStyles, Paper, PasswordInput, Title, Divider, Select } from '@mantine/core';
import { useState } from 'react';
import { addUser } from '../../../api/admin/users';
import { storage } from '../../../firebase';
import { v4 } from "uuid";
import { getDownloadURL, ref , uploadBytes } from '@firebase/storage';
import { Dropzone } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';

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

export default function AddBusinessOwner() {
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePics , setProfilePics] = useState('')
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {  firstName: '', lastName: '',  phoneNumber: '', address: '', email: '', password: '', confirmPassword: '' },
    validateInputOnChange: true,
    validate: {
      //role: isNotEmpty('Please Select A Role'),
      firstName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'First Name should be between 3 to 20 Alphabets'),
      lastName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Last Name should be between 3 to 20 Alphabets'),
      phoneNumber: (value) => (/^\d{11}$/.test(value) ? null : 'Phone Number should be 11 Digit'),
      address: (value) => (/^[a-zA-Z0-9\s,.\-!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~]{20,100}$/.test(value) ? null : 'Address Should be between 10 and 150 Characters'),
      email: (value) => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : 'Please Enter Valid Email i.e user@gmail.com'),
      password: (value) => (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ? null : 'Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character'),
      confirmPassword: (value, { password }) => (value === password ? null : 'Incorrect ! Please Recheck & Confirm Your Password'),
    },
  });

  const handleUploadImage = async () => {
    if (imageUpload === null) return;
  
    const imageRef = ref(storage, `images/ ${imageUpload[0].name + v4()}`);
    
    try {
      await uploadBytes(imageRef, imageUpload[0]);
      
      const url = await getDownloadURL(imageRef);
      console.log(url);
      setProfilePics(url);
      
      notifications.show({ message: "Picture Uploaded Successfully.", color: 'green' });
    } catch (error) {
      console.error(error);
      notifications.show({ message: "Error uploading picture.", color: 'red' });
    }
  };

  const handleSubmit = async (values) => {
    const { role, firstName, lastName, email, phoneNumber, address, password } = values;

    try {
      const response = await addUser( profilePics , role, firstName, lastName, email, phoneNumber, address, password);
      if (response.status === 201 || response.status === 200) {
        form.reset();
        setProfilePics('');
        setImageUpload(null);
        notifications.show({ message: `${role} Added Successfully`, color: 'green' });
    }

    } catch (error) {
      notifications.show({ message: error.response.data.message , color: 'red' , });
    }
};

  return (
    <Paper withBorder shadow="md" p={35} radius="md">
      <Title
        mb={20}
        align="center"
        sx={{ fontWeight: 650 }}
      >
        Add Business Owner
      </Title>
      <Divider mb={20} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
        <Box  className={classes.responsiveContainer}>
          <TextInput withAsterisk size='md' className={classes.inputField} label="First Name" placeholder="Enter First Name: John" {...form.getInputProps('firstName')} />
          <TextInput withAsterisk size='md' className={classes.inputField} label="Last Name" placeholder="Enter First Name: Cena" {...form.getInputProps('lastName')} />
        </Box>
        <Box mt="md" className={classes.responsiveContainer}>
          <TextInput withAsterisk size='md' className={classes.inputField} label="Email" placeholder="Enter Email: JohnCena@gmail.com" {...form.getInputProps('email')} />
          <TextInput withAsterisk size='md' label="Phone Number" placeholder="Enter Phone Number: 03001234567" className={classes.inputField} {...form.getInputProps('phoneNumber')} />
        </Box>
        <Box mt="md" >
          <TextInput  size='md' label="Address" placeholder="Enter Address: Street 21, F7, Islamabad." {...form.getInputProps("address")} />
        </Box>
        <Box className={classes.responsiveContainer} mt="md" >
          <PasswordInput size='md' withAsterisk label="Password" placeholder="Enter Password" className={classes.inputField}  {...form.getInputProps('password')} />
          <PasswordInput size='md' withAsterisk label="Confirm Password" placeholder="Confirm Password" className={classes.inputField} {...form.getInputProps('confirmPassword')} />
        </Box>
        <Box mt="md" >
          <Dropzone
            sx={{
              height: 175,
              width: 175,
            }}
            onDrop={(files) => setImageUpload(files)}
            multiple= {false}
            type="file"
            accept="image/*"
            size="lg"
            value={imageUpload ? imageUpload.name : ''}
          >
          <Image
          height={169}
          width={169}
          sx={{resize:'contain',  marginTop: -15, marginLeft: -15 }}
          src={profilePics || (imageUpload ? URL.createObjectURL(imageUpload[0]) : '')}
        />
          </Dropzone>
          <Button disabled={!imageUpload} onClick={()=>{handleUploadImage()}} style={{ marginTop: 15, marginLeft: 12 }}>
            Upload Image
          </Button>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <Button size='md' color='red.8' >
            Cancel
          </Button>
          <Button type="submit" size='md' color='green.9' >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

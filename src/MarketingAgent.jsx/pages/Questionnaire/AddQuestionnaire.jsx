import { isNotEmpty , useForm } from '@mantine/form';
import { TextInput, Button, Box , createStyles, Paper, Title, Select, MultiSelect } from '@mantine/core';
import { useEffect , useState } from 'react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { React } from "react";
import { addQuestionnaire } from '../../../api/marketingAgent/questionnaire';

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

export default function AddQuestionnaireMA() {

  const [businesses, setBusinesses] = useState([]);
  const [questionnaire, setQuestionnaire] = useState([]);
  const {classes} = useStyles();

const form = useForm({
  initialValues: {
    businessId: '',
    // Initialize question and answer fields dynamically based on the initial state
    ...questionnaire.reduce(
      (acc, _, index) => ({
        ...acc,
        [`question${index + 1}`]: '',
        [`answer${index + 1}`]: '',
      }),
      {}
    ),
  },
 
  validate: {
    businessId: isNotEmpty('Please Select Business Name'),
    // Add validation for dynamically generated question and answer fields
    
    // Additionally, add a general validation for answers using a custom function
    
  },
  
});
useEffect(() =>{
  const getBusinesses = async () => {
    const response = await axios.get('https://imaa-2585bbde653a.herokuapp.com/marketingAgent/viewAllSubscribedBusinesses');
    const businesses = response?.data?.businesses;
    console.log(businesses)
    setBusinesses(businesses);
  };
  getBusinesses();
}, []);

  const handleSubmit = async (values) => {
    const { businessId } = values; 
    try {
      const response = await addQuestionnaire( businessId , questionnaire );
      if (response.status === 201) {
        form.reset();
        notifications.show({ message: `Questionnaire Added Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  const handleAddQuestion = () => {
    // Check if the maximum number of questions (10) has been reached before adding a new question
    if (questionnaire.length < 10) {
      // Add a new question and answer field to the state
      setQuestionnaire([...questionnaire, { question: '', options: [] }]);
    } else {
      notifications.show({
        message: 'You can only add a maximum of 10 questions.',
        color: 'red',
      });
    }
  };

  return (
    <Paper withBorder shadow="md" p={35}  radius="md">
       <Title
        order={2}
        align="center"
        sx={{ fontWeight: 550 }}
        >
          Add Questionnaire
        </Title>
 
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
      <Box>
        <Select withAsterisk size='sm' label="Business Name" placeholder="Select Business Name" {...form.getInputProps('businessId')}
        data={businesses?.map((business) => ({
          value: `${business?._id}`,
          label: `${business?.name}`,
        }))}
         />
        </Box>
     {questionnaire.map((item, index) => (
          <div key={index}>
            <Box mt="sm" className={classes.responsiveContainer}>
              <TextInput
                className={classes.inputField}
                maxLength={200}
                withAsterisk
                size="sm"
                label={`Question ${index + 1}`}
                placeholder="Enter Question"
                onChange={(event)=>{
                  let newQuestionare = [...questionnaire];
                  let currentQuestion = newQuestionare[index];
                  currentQuestion.question = event.currentTarget.value;
                  newQuestionare[index] = currentQuestion;
                  setQuestionnaire(newQuestionare);
                }}
                value={item.question}
              />
              <MultiSelect
                className={classes.inputField}
                withAsterisk
                size="sm"
                label={`Answer ${index + 1}`}
                placeholder="Enter Answer"
                value={item.options}
                onChange={(options)=>{
                  let newQuestionare = [...questionnaire];
                  let currentQuestion = newQuestionare[index];
                  currentQuestion.options = options;
                  newQuestionare[index] = currentQuestion;
                  setQuestionnaire(newQuestionare);
                  console.log(newQuestionare);
                }}
                // {...form.getInputProps(`answer${index + 1}`)}
                data = {
                  [
                  { value: 'Yes', label: 'Yes' },
                  { value: 'G', label: 'G' },
                  { value: 'Han', label: 'Han' },
                  { value: 'Han g', label: 'Han g' },
                  { value: 'No', label: 'No' },
                  { value: 'Nahi', label: 'Nahi' },
                  { value: 'Nopes', label: 'Nopes' },
                  ]
              }
              />
            </Box>
          </div>
        ))}
        
        <Box style={{display:'flex', justifyContent:'left', gap:'20px'}} onClick={handleAddQuestion}>
        <Button  mt="sm"  size='sm' variant="outline"> 
          + Add Question
        </Button>
        </Box>
      
         <Box style={{display:'flex', justifyContent:'right', gap:'20px'}}>
         <Button  mt="sm"  size='sm' color='red.8' >
          Cancel
        </Button>
        <Button type="submit" mt="sm"  size='sm' color='green.9' >
          Submit
        </Button>
        </Box>
      </form>
    </Paper>
  );
}

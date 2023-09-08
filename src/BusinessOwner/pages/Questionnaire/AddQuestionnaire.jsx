import { isNotEmpty , useForm } from '@mantine/form';
import { TextInput, Button, Box , createStyles, Paper, Title, Select, MultiSelect } from '@mantine/core';
import { useEffect , useState } from 'react';
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

export default function AddQuestionnaire() {

  const [countries, setCountries] = useState([]);
  const [questions, setQuestions] = useState([
    { question: '', answer: '' }, // Initial question and answer fields
  ]);
  
  const {classes} = useStyles();
{/*
  const form = useForm({
    initialValues: { businessName: '', question1: '', question2: '', question3: '', question4: '', question5: '', question6: '', answer1: '', answer2: '', answer3: '', answer4: '', answer5: '', answer6: '' },
    validateInputOnChange: true,
    // functions will be used to validate values at corresponding key
    validate: {
      businessName: isNotEmpty('Please Select Business Name'),
      question1: (value) => (/^[a-zA-Z\s]{10,70}$/.test(value) ? null : 'Question Should Contain Atleast 10 Alphabets'),
      question2: (value) => (/^[a-zA-Z\s]{10,70}$/.test(value) ? null : 'Question Should Contain Atleast 10 Alphabets'),
      question3: (value) => (/^[a-zA-Z\s]{10,70}$/.test(value) ? null : 'Question Should Contain Atleast 10 Alphabets'),
      question4: (value) => (/^[a-zA-Z\s]{10,70}$/.test(value) ? null : 'Question Should Contain Atleast 10 Alphabets'),
      question5: (value) => (/^[a-zA-Z\s]{10,70}$/.test(value) ? null : 'Question Should Contain Atleast 10 Alphabets'),
      question6: (value) => (/^[a-zA-Z\s]{10,70}$/.test(value) ? null : 'Question Should Contain Atleast 10 Alphabets'),
      answer1: (value) => (/^[a-zA-Z\s]{5,20}$/.test(value) ? null : 'Answer Should Contain Atleast 3 Alphabets'),
      answer2: (value) => (/^[a-zA-Z\s]{5,20}$/.test(value) ? null : 'Answer Should Contain Atleast 3 Alphabets'),
      answer3: (value) => (/^[a-zA-Z\s]{5,20}$/.test(value) ? null : 'Answer Should Contain Atleast 3 Alphabets'),
      answer4: (value) => (/^[a-zA-Z\s]{5,20}$/.test(value) ? null : 'Answer Should Contain Atleast 3 Alphabets'),
      answer5: (value) => (/^[a-zA-Z\s]{5,20}$/.test(value) ? null : 'Answer Should Contain Atleast 3 Alphabets'),
      answer6: (value) => (/^[a-zA-Z\s]{5,20}$/.test(value) ? null : 'Answer Should Contain Atleast 3 Alphabets'),
    },
  });
*/}

const form = useForm({
  initialValues: {
    businessName: '',
    // Initialize question and answer fields dynamically based on the initial state
    ...questions.reduce(
      (acc, _, index) => ({
        ...acc,
        [`question${index + 1}`]: '',
        [`answer${index + 1}`]: '',
      }),
      {}
    ),
  },
 
  validate: {
    businessName: isNotEmpty('Please Select Business Name'),
    // Add validation for dynamically generated question and answer fields
    ...questions.reduce(
      (acc, _, index) => ({
        ...acc,
        [`question${index + 1}`]: (value) =>
          /^[a-zA-Z\s]{10,70}$/.test(value) ? null : 'Question Should Contain Atleast 10 Alphabets',
        [`answer${index + 1}`]: (value) =>
        /^.+$/.test(value) ? null : 'Answer Should Not Be Empty',
      }),
      {}
    ),
    // Additionally, add a general validation for answers using a custom function
    ...questions.reduce(
      (acc, _, index) => ({
        ...acc,
        [`answer${index + 1}`]: (value) => {
          // Check if the corresponding question is not empty before validating the answer
          const questionValue = form.values[`question${index + 1}`] || '';
          if (questionValue.trim() === '') {
            return 'Please enter a question first';
          }
          return /^.+$/.test(value) ? null : 'Answer Should Not Be Empty';
        },
      }),
      {}
    ),
  },
  
});

  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/admin/businessesList');
      const newData =  await response.json();
      console.log(newData);
      setCountries(newData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    const { title , business , description , date , amount } = values;

    try {
      const response = await addExpense( title , business , description , date , amount );
      if (response.status === 201) {
        form.reset();
        notifications.show({ message: `Expense Added Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  const handleAddQuestion = () => {
    // Check if the maximum number of questions (10) has been reached before adding a new question
    if (questions.length < 10) {
      // Add a new question and answer field to the state
      setQuestions([...questions, { question: '', answer: '' }]);
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
        <Select withAsterisk size='sm' label="Business Name" placeholder="Select Business Name" {...form.getInputProps('businessName')}
        data={[
            { value: 'react', label: 'React' },
            { value: 'ng', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
          ]}
         />
        </Box>
  {/*
        <Box mt="sm" className={classes.responsiveContainer}>
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Question 1" placeholder="Enter Question" {...form.getInputProps('question1')} />
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Answer 1" placeholder="Enter Answer" {...form.getInputProps('answer1')} />
        </Box>
        <Box mt="sm" className={classes.responsiveContainer}>
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Question 2" placeholder="Enter Question" {...form.getInputProps('question2')} />
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Answer 2" placeholder="Enter Answer" {...form.getInputProps('answer2')} />
        </Box>
        <Box mt="sm" className={classes.responsiveContainer}>
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Question 3" placeholder="Enter Question" {...form.getInputProps('question3')} />
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Answer 3" placeholder="Enter Answer"  {...form.getInputProps('answer3')} />
        </Box>
        <Box mt="sm" className={classes.responsiveContainer}>
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Question 4" placeholder="Enter Question" {...form.getInputProps('question4')} />
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Answer 4" placeholder="Enter Answer"  {...form.getInputProps('answer4')} />
        </Box>
        <Box mt="sm" className={classes.responsiveContainer}>
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Question 5" placeholder="Enter Question" {...form.getInputProps('question5')} />
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Answer 5" placeholder="Enter Answer" {...form.getInputProps('answer5')} />
        </Box>
        <Box mt="sm" className={classes.responsiveContainer}>
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Question 6" placeholder="Enter Question" {...form.getInputProps('question6')} />
        <TextInput className={classes.inputField} withAsterisk size='sm' label="Answer 6" placeholder="Enter Answer" {...form.getInputProps('answer6')} />
        </Box>
        */}
     {questions.map((item, index) => (
          <div key={index}>
            <Box mt="sm" className={classes.responsiveContainer}>
              <TextInput
                className={classes.inputField}
                withAsterisk
                size="sm"
                label={`Question ${index + 1}`}
                placeholder="Enter Question"
                value={item.question}
                {...form.getInputProps(`question${index + 1}`)}
              />
              <MultiSelect
                className={classes.inputField}
                withAsterisk
                size="sm"
                label={`Answer ${index + 1}`}
                placeholder="Enter Answer"
                value={item.answer}
                {...form.getInputProps(`answer${index + 1}`)}
                data = {
                  [
                  { value: 'react', label: 'React' },
                  { value: 'ng', label: 'Angular' },
                  { value: 'svelte', label: 'Svelte' },
                  { value: 'vue', label: 'Vue' },
                  { value: 'riot', label: 'Riot' },
                  { value: 'next', label: 'Next.js' },
                  { value: 'blitz', label: 'Blitz.js' },
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
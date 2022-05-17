/** API Call will be define here using axios */
// import axios from 'axios';

const mockFormsData = [
  {
    id: Date.now(),
    name: 'Form1',
    controls: [],
  },
  {
    id: Date.now() + 5,
    name: 'Form2',
    controls: [],
  },
];

export const getForms = () => {
  // HTTP call will be define inside this function since we don't have it.
  // so we are using promise to mock data
  return Promise.resolve(mockFormsData);
};

export const validateData = () => {
  // HTTP call will be define inside this function.
  return Promise.resolve();
};

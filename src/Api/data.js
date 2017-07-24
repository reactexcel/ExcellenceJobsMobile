export const SUCCESS = {
  error: 0,
  data: {
    name: 'arun',
    email: 'arun@gmail.in',
    mobile_no: '0123456789',
    rounds: [
      {
        text: 'First Round',
        date: '23/07/2017',
        time: '11.30am',
        status: true,
      },
      {
        text: 'First Round',
        date: '23/07/2017',
        time: '11.30am',
        status: false,
      },
    ],
  },
};
export const FAILED = {
  error: 1,
  data: {
    text: 'Enter Valid Email',
  },
};

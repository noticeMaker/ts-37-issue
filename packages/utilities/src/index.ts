import { basename } from 'path';

const utilities = () => {
  console.log('@ts-37-issue/utilities was called in', basename(__dirname));
};

export default utilities;

'use strict';
module.exports = {
  prism: {
    options: {
      questions: [
        {
          config:  'prism.startConversion',
          type:    'list',
          message: 'Start converting files?',
          choices: [
            {
              value: true,
              name:  'Yes'
            },
            {
              value: false,
              name:  'No'
            }
          ]
        }
      ]
    }
  }
};
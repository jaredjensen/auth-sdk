import { Step, StepTypeName, UsernamePasswordStep } from '../model';

const BASE_URL = 'http://openam:8886/json/authenticate?authIndexType=service&authIndexValue=';
const HEADERS = {
  'Accept-API-Version': 'protocol=1.0,resource=2.1',
  'Content-Type': 'application/json',
};

// TODO: Update this to call a remote gateway
export const getNextStep = async (flowName: string, step?: Step): Promise<Step> => {
  const mock = true; // Did this while troubleshooting CORS issue

  if (!mock) {
    const url = BASE_URL + flowName;
    const config: RequestInit = { headers: HEADERS, method: 'POST' };

    if (step) {
      const authTreeStep = convertToAuthTreeStep(step);
      config.body = JSON.stringify(authTreeStep);
    }

    const res = await fetch(url, config);

    if (res.status !== 200) {
      const text = await res.text();
      throw new Error(text);
    }

    const json = await res.json();
    const nextStep = convertToStep(json);

    return nextStep;
  } else {
    return convertToStep(<AuthTreeStep>{
      authId:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoSW5kZXhWYWx1ZSI6IlVzZXJuYW1lUGFzc3dvcmQiLCJvdGsiOiI5YTZvbWgxcHU4ZDFiN2hlODZoMjRhbTN2YyIsImF1dGhJbmRleFR5cGUiOiJzZXJ2aWNlIiwicmVhbG0iOiIvIiwic2Vzc2lvbklkIjoiKkFBSlRTUUFDTURJQUJIUjVjR1VBQ0VwWFZGOUJWVlJJQUFKVE1RQUNNREUuKmV5SjBlWEFpT2lKS1YxUWlMQ0pqZEhraU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuWlhsS01HVllRV2xQYVVwTFZqRlJhVXhEU2paaFdFRnBUMmxLVDFRd05VWkphWGRwV2xjMWFrbHFiMmxSVkVWNVQwVk9RMUY1TVVsVmVra3hUbWxKYzBsdFJuTmFlVWsyU1cxU2NHTnBTamt1TGtkYWMwZGZOMnM1VEMxTmFVaEpVRFV0WDNoS2NHY3VOM015YlhOQ2NuVnBPRnBSTVROVGFXdHpWMnh3WVdOQmEwaEZOSE5KWW5WVFVXdHhiVmxwYVZOWlQyeG9WbXRPZFZGelJqQTRaRlUwZFRSbFozRkVSVVV4TFV4NlJUTmhNQzFJZEdGeWExRkxiM054ZUcxMExYcDRSMUJrZFRoRlJVcHplbTVTZVZWVmFGOVJPR2d5YTNCUE1USlJiak5JUzBac1NWOVVUekJ5V0hSek9VUnpiM0JpVmtabVVXNUxhRzh3ZURsMlMzUkhjVEJmT0VZMlIwbEJUMUpFTW14SlkxcGtOSFY2Y21ONVptVjJPRkExWDFwTFNuVllkSGgzU3psTVZrNXpkemxGT0RnNGVrUm9ha2xTY1RacGJ6RlJXWFZ1VjJwc1VXMUtVMkZvZEc0M00wWmliSGcyZDJGNWNGbEVNelZVUWtsc05qUmlNRTUzY0RGM05qazFUM2MyTWtFMGMwTnZZbXhxYlhWZlJGVlVaekJLYVRZME5HcDZXbHBoWkdsWWNHMWFhVUp1ZFdSS04wUmFUWEZSWW5OV1Myb3RVVVpaVWxSRWVqWkJVazVhWDNsdVJVUklSbmh6VEZKaFIwVk5hWGRtUlhGT2JtZEZRVFkwYldOQ1drMXNaRVZWV0VwdFJsbzNNWEE0ZFdSWk0wbG5kblZpTkZKc2VXSm5WWEJYZVdwS1lWbEtNekUwTW1GdmVETTVkSEZYWVcxV1psRjRkbE5UVkZKVVdFNVNNbVZoVms4eVZqWXhlVEpSU0VOMGVtbDViM0JCVkcxUFR6WjBNRVJmV0ZNd1dFOVBaRTlzTFc0d1pqbFVhVE41U1ZWcWRraFNMVlZNZVdOQ1pHVkhTMjU2YlMxcFJDMTJTRFo2ZVhGa04zTkdhMlZ3V1cxWlZXbEVUbTlzUVdGRE0zWXpWSGRTZFZCWGR6bEVTWEI1WlU1cVFXRlRRa2xDTkdGTWRFSkliVmxJUlZoUWRIZExiSFpSVDBWeVVtZDBPVVp0ZDNkMGJGQkRUa3RhYm0wNFQweFdMV05HUkZOdmRITnBkVk10Y2pKaFNtWlVVeTFNT1VkQ1UzQllRVVV4WkV4NWMzUXlXa1owUzNkek0xUXRiME5yWnpScE1rczRiQzVZUW5ocVNGUlJSa05yTVZwWVVYVnlNSEIyUlhkMy5kWVlzbGVkUVJPc2w4Zjg2N1IxUjYtNDhlc2JNWkVDVDBxMGRyRHhJMFZJIiwiZXhwIjoxNTQ3NjkzMDE1LCJpYXQiOjE1NDc2OTI3MTV9.9yH6BvzFIQsp6TsT5xp6bD42mMbpiMNtjhvGZD1w9SM',
      callbacks: [
        {
          type: 'NameCallback',
          output: [
            {
              name: 'prompt',
              value: 'User Name',
            },
          ],
          input: [
            {
              name: 'IDToken1',
              value: '',
            },
          ],
          _id: 0,
        },
        {
          type: 'PasswordCallback',
          output: [
            {
              name: 'prompt',
              value: 'Password',
            },
          ],
          input: [
            {
              name: 'IDToken2',
              value: '',
            },
          ],
          _id: 1,
        },
      ],
    });
  }
};

// TODO: Move everything below to the gateway; this library shouldn't know anything about AM's schema

const convertToAuthTreeStep = (step: Step): AuthTreeStep => {
  const authTreeStep: AuthTreeStep = {
    authId: step.id,
    callbacks: undefined,
    template: '',
    stage: 'DataStore1',
    header: 'Sign in',
  };

  switch (step.type) {
    case StepTypeName.UsernamePassword:
      authTreeStep.callbacks = convertToUsernamePasswordCallback(<UsernamePasswordStep>step);
      break;
  }

  return authTreeStep;
};

const convertToUsernamePasswordCallback = (step: UsernamePasswordStep): AuthTreeCallback[] => {
  return [
    {
      type: 'NameCallback',
      input: [
        {
          name: 'IDToken1',
          value: step.username,
        },
      ],
      output: [
        {
          name: 'prompt',
          value: 'User Name:',
        },
      ],
    },
    {
      type: 'PasswordCallback',
      input: [
        {
          name: 'IDToken2',
          value: step.password,
        },
      ],
      output: [
        {
          name: 'prompt',
          value: 'Password:',
        },
      ],
    },
  ];
};

const convertToStep = (authTreeStep: AuthTreeStep): Step => {
  if (isUsernamePasswordStep(authTreeStep)) {
    return convertToUsernamePasswordStep(authTreeStep);
  }
  return undefined;
};

const isUsernamePasswordStep = (authTreeStep: AuthTreeStep): boolean => {
  return (
    authTreeStep.callbacks.length === 2 &&
    authTreeStep.callbacks[0].type === 'NameCallback' &&
    authTreeStep.callbacks[1].type === 'PasswordCallback'
  );
};

const convertToUsernamePasswordStep = (authTreeStep: AuthTreeStep): Step => {
  return <UsernamePasswordStep>{
    id: authTreeStep.authId,
    password: '',
    type: StepTypeName.UsernamePassword,
    username: '',
  };
};

interface AuthTreeStep {
  authId: string;
  callbacks: AuthTreeCallback[];
  header?: string;
  stage?: string;
  template?: string;
}

interface AuthTreeCallback {
  _id?: number;
  input: NameValuePair[];
  output: NameValuePair[];
  type: AuthTreeCallbackType;
}

interface NameValuePair {
  name: string;
  value: string;
}

type AuthTreeCallbackType = 'NameCallback' | 'PasswordCallback';

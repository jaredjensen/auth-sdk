import { Step, StepType } from '../model';

const steps: Step<{}>[] = [
  {
    config: undefined,
    type: StepType.UsernamePassword,
  },
  {
    config: {
      options: ['DEVICE', 'EMAIL', 'SMS'],
    },
    type: StepType.MFA,
  },
];

export default steps;

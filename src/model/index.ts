export interface Step {
  id: string;
  type: StepTypeName;
}

export interface UsernamePasswordStep extends Step {
  password: string;
  username: string;
}

export type StepType = UsernamePasswordStep;

export enum StepTypeName {
  UsernamePassword = 'UsernamePassword',
  MFA = 'MFA',
}

export type MfaType = 'DEVICE' | 'EMAIL' | 'SMS';

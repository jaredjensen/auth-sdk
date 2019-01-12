export interface Step<T> {
  config?: T;
  type: StepType;
}

export enum StepType {
  UsernamePassword = 'UsernamePassword',
  MFA = 'MFA',
}

export type MfaType = 'DEVICE' | 'EMAIL' | 'SMS';

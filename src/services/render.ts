import * as dot from 'dot';
import { Step, StepTypeName } from '../model';
import * as mfaTemplate from '../views/mfa.html';
import * as usernamePasswordTemplate from '../views/username-password.html';

export const renderStep = (step: Step): string => {
  const html = getStepHtml(step.type);
  const fn = dot.template(html);
  return fn(step);
};

const getStepHtml = (stepType: StepTypeName) => {
  switch (stepType) {
    case StepTypeName.UsernamePassword:
      return usernamePasswordTemplate;
    case StepTypeName.MFA:
      return mfaTemplate;
    default:
      return `<span>Missing template for step type "${stepType}"</span>`;
  }
};

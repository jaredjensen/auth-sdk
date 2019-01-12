import * as dot from 'dot';
import steps from './data';
import { MfaType, Step, StepType } from './model';
import * as mfaTemplate from './views/mfa.html';
import * as usernamePasswordTemplate from './views/username-password.html';

const TARGET_ID = 'auth-sdk-target';
let target: HTMLElement = null;
let stepIndex = 0;

const init = () => {
  target = document.getElementById(TARGET_ID);
  if (!target) {
    console.warn(`Missing auth-sdk target "${TARGET_ID}"`);
    return;
  }

  document.addEventListener('click', onClick);

  const step = getStep(stepIndex);
  renderStep(step);
};

const nextStep = () => {
  stepIndex++;
  const step = getStep(stepIndex);
  renderStep(step);
};

const onClick = (e: MouseEvent) => {
  if (!e.srcElement.hasAttribute('auth-sdk-trigger')) {
    return;
  }

  const trigger = JSON.parse(e.srcElement.attributes.getNamedItem('auth-sdk-trigger').value);
  switch (trigger.action) {
    case 'COLLECT':
      return collectInput();
    case 'MFA':
      return mfa(trigger.type);
  }

  console.warn('Invalid trigger', trigger);
};

const collectInput = () => {
  const data: any = {};
  target.querySelectorAll('input').forEach((e) => {
    const name = e.attributes.getNamedItem('name').value;
    data[name] = e.value;
  });
  alert(`Submit\n\n${JSON.stringify(data, null, 2)}`);
  nextStep();
};

const mfa = (type: MfaType) => {
  switch (type) {
    case 'DEVICE':
      if (!navigator.credentials) {
        return alert("Browser doesn't support FIDO");
      }

      const options = {
        publicKey: {
          challenge: generateKey(32),
          //rpId: `https://my-tenant.forgeblocks.com`,
          allowCredentials: [
            {
              type: 'public-key',
              id: generateKey(80),
            },
          ],
          userVerification: 'required',
        },
      };

      console.log(options);

      navigator.credentials
        .get(options)
        .then((creds) => {
          alert(`Received credentials ${creds}`);
        })
        .catch((err) => {
          alert(`Error getting credentials: ${err}`);
        });
      break;
    case 'EMAIL':
    case 'SMS':
      alert('Render input to enter code');
      break;
  }
};

const getStep = (index: number): Step<{}> => {
  return steps[index]; // this would come from the gateway
};

const renderStep = (step: Step<{}>) => {
  const html = getStepHtml(step.type);
  const fn = dot.template(html);
  target.innerHTML = fn(step.config);
};

const getStepHtml = (stepType: StepType) => {
  switch (stepType) {
    case StepType.UsernamePassword:
      return usernamePasswordTemplate;
    case StepType.MFA:
      return mfaTemplate;
    default:
      return `Missing template for type "${stepType}"`;
  }
};

const generateKey = (length: number) => {
  const key = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    key[i] = Math.floor(Math.random() * 255);
  }
  return key;
};

init();

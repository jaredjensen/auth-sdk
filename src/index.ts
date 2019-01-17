import { MfaType, Step } from './model';
import { getNextStep } from './services/auth-tree';
import { renderStep } from './services/render';

const FLOW_NAME = 'UsernamePassword';
const TARGET_ID = 'auth-sdk-target';
const TRIGGER_ATTR_NAME = 'auth-sdk-trigger';

let target: HTMLElement = null;
let step: Step = undefined;

const init = async () => {
  target = document.getElementById(TARGET_ID);

  if (!target) {
    console.warn(`Missing auth-sdk target "${TARGET_ID}"`);
    return;
  }

  document.addEventListener('click', onClick);

  nextStep();
};

const nextStep = async () => {
  try {
    step = await getNextStep(FLOW_NAME, step);
    const html = renderStep(step);
    updateDom(html);
  } catch (err) {
    console.error(err);
    updateDom(`<p>${err.message}</p>`);
  }
};

const updateDom = (html: string) => {
  target.innerHTML = html;
};

const onClick = (e: MouseEvent) => {
  const triggerAttribute = e.srcElement.attributes.getNamedItem(TRIGGER_ATTR_NAME);
  if (!triggerAttribute) {
    return;
  }

  const trigger = JSON.parse(triggerAttribute.value);
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

// const getStep = (index: number): Step<{}> => {
//   return steps[index]; // this would come from the gateway
// };

// const renderStep = (step: Step<{}>) => {
//   const html = getStepHtml(step.type);
//   const fn = dot.template(html);
//   target.innerHTML = fn(step.config);
// };

// const getStepHtml = (stepType: StepType) => {
//   switch (stepType) {
//     case StepType.UsernamePassword:
//       return usernamePasswordTemplate;
//     case StepType.MFA:
//       return mfaTemplate;
//     default:
//       return `Missing template for type "${stepType}"`;
//   }
// };

const generateKey = (length: number) => {
  const key = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    key[i] = Math.floor(Math.random() * 255);
  }
  return key;
};

init();

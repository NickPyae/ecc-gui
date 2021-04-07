import { installedApps, availableApps } from './mock';

export function getApplicationList() {
  return {
    installedApps,
    availableApps
  }
};

export function deployApplication(artifact) {
  // TODO
  console.info('Deployment:', JSON.stringify(artifact));
  return 'Success';
}

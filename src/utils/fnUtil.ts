import Fingerprint from 'fingerprintjs2';

export const getFingerPrint = async () => {
  return await new Promise((resolve, reject) => {
    Fingerprint.getV18((hash: any, components: any) => {
      console.log(hash);
      resolve({ hash, components }); // an array of components: {key: ..., value: ...}
    });
  });
};

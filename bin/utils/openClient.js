import { exec } from "child_process";

export const openClient = (url) => {
  return new Promise((resolve) => {
    exec(`open ${url}`);
    resolve();
  });
};

import { spawn } from "child_process";

export const startClientServer = () => {
  return new Promise((resolve, reject) => {
    const process = spawn("npm", ["run", "preview"], {
      cwd: "client/",
      // detached: true,
      stdio: "pipe",
    });

    process.unref();

    process.stdout.on("data", (data) => {
      const output = data.toString();
      if (!output.includes("Local:")) return;

      const urlMatch = output.match(/Local:\s+(http:\/\/[^\s]+)/);

      if (urlMatch) {
        const url = urlMatch[1];
        return resolve(url);
      }
    });

    process.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      reject(new Error(data.toString()));
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Processo finalizado com código ${code}`));
      }
    });

    // Captura o sinal SIGINT (CTRL + C)
    process.on("SIGINT", () => {
      console.log("\nServidor encerrado (CTRL + C)");
      process.kill("SIGINT"); // Encerra o processo do Vite
      process.exit(0); // Encerra o processo do Node.js
    });

    // Captura o sinal SIGTERM (encerramento normal)
    process.on("SIGTERM", () => {
      console.log("\nServidor encerrado (SIGTERM)");
      process.kill("SIGTERM"); // Encerra o processo do Vite
      process.exit(0); // Encerra o processo do Node.js
    });
  });
};

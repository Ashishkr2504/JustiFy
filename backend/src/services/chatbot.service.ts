import { exec } from 'child_process';
import path from 'path';

export const handleChatQuery = (question: string, userId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(__dirname, '../../ml_model/semantic_search.py');
    const cmd = `python "${pythonScript}" "${question}"`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error('Python error:', stderr);
        return reject('Error processing query.');
      }
      return resolve(stdout.trim());
    });
  });
};

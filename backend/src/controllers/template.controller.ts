import { Request, Response } from 'express';
import ejs from 'ejs';
import path from 'path';
import pdf from 'html-pdf';

export const generateTemplate = async (req: Request, res: Response) => {
  const { type, data } = req.body;
  const templatePath = path.join(__dirname, '../../templates', `${type}.ejs`);
  try {
    const html = await ejs.renderFile(templatePath, data);
    pdf.create(html).toBuffer((err: any, buffer: Buffer) => {
      if (err) return res.status(500).json({ message: 'PDF generation failed' });
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${type}.pdf`,
      });
      res.send(buffer);
    });
  } catch (err) {
    res.status(400).json({ message: 'Template rendering failed', error: err });
  }
};

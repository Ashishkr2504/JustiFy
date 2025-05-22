import { Request, Response } from "express";
import puppeteer, { Page } from "puppeteer";
import { v4 as uuidv4 } from "uuid";

// Map sessionId -> Puppeteer page
const captchaSessions: Record<string, Page> = {};

// GET /api/casetracker/captcha
export const getCaptchaImage = async (req: Request, res: Response) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://services.ecourts.gov.in/ecourtindia_v6/");
    await page.screenshot({ path: "before_typing.png" });

    // Wait for the page to load
    await new Promise(res => setTimeout(res, 2000));

    // Try to close any modal/popups if present
    try {
      await page.click('.btn-close, .close, .modal-footer .btn-primary');
    } catch (e) {
      // Ignore if not present
    }

    // Now wait for the captcha image
    await page.waitForSelector("#captcha_image", { timeout: 20000 });

    // Get captcha image as base64
    const captchaSrc = await page.$eval("#captcha_image", (img: any) => img.src);
    const captchaUrl = new URL(captchaSrc, "https://services.ecourts.gov.in/ecourtindia_v6/").href;
    const viewSource = await page.goto(captchaUrl);
    const buffer = await viewSource!.buffer();
    const base64 = buffer.toString("base64");

    // Generate a session ID and store the page
    const sessionId = uuidv4();
    captchaSessions[sessionId] = page;

    res.json({ image: `data:image/png;base64,${base64}`, sessionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch captcha." });
  }
};

// POST /api/casetracker
export const trackCaseByCnr = async (req: Request, res: Response) => {
  const { cnr, captcha, sessionId } = req.body;
  if (!cnr || cnr.length !== 16) {
    return res.status(400).json({ error: "Invalid CNR number." });
  }
  if (!captcha) {
    return res.status(400).json({ error: "Captcha is required." });
  }
  if (!sessionId || !captchaSessions[sessionId]) {
    return res.status(400).json({ error: "Captcha session expired. Please refresh captcha." });
  }

  const page = captchaSessions[sessionId];
  try {
    await page.type("#cino", cnr);
    await page.type("#fcaptcha_code", captcha);

    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click("#searchbtn"),
    ]);

    // Wait for the case details table to appear
    await page.waitForSelector("#caseDetailsTable", { timeout: 10000 });

    // Extract details (update selectors as per actual site)
    const details = await page.evaluate(() => {
      const getText = (selector: string) =>
        document.querySelector(selector)?.textContent?.trim() || "";
      return {
        title: getText("#caseDetailsTable .case-title"),
        caseType: getText("#caseDetailsTable .case-type"),
        filingDate: getText("#caseDetailsTable .filing-date"),
        hearingDate: getText("#caseDetailsTable .hearing-date"),
        // Add more fields as needed
      };
    });

    await page.browser().close();
    delete captchaSessions[sessionId];
    res.json(details);
  } catch (error) {
    console.error(error);
    await page.browser().close();
    delete captchaSessions[sessionId];
    res.status(500).json({ error: "Failed to fetch case details. Please check the CNR number and captcha, then try again." });
  }
};
import express from "express";
import puppeteer from "puppeteer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { cnr } = req.body;

  if (!cnr || cnr.length !== 16) {
    return res.status(400).json("Invalid CNR number.");
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto("https://services.ecourts.gov.in/ecourtindia_v6/");
    await page.type("#cnrno", cnr);
    await Promise.all([
      page.waitForNavigation(),
      page.click('input[type="submit"]'),
    ]);

    const content = await page.content();
    await browser.close();

    // Extract relevant details from the HTML using regex or cheerio if needed
    res.send(content); // or extract and send structured data
  } catch (err) {
    console.error(err);
    res.status(500).json("Something went wrong.");
  }
});

export default router;

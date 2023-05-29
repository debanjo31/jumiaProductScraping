const fs = require("fs");
const puppeteer = require("puppeteer");

async function scrape() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.jumia.com.ng/");
  await page.screenshot({ path: "jumia.png" });
  const products = await page.$$eval(".prd", (elements) =>
    elements.map((e) => ({
      name: e.querySelector("a .name").innerText,
      price: e.querySelector("a .prc").innerText,
      proudct_url: e.querySelector("a").href,
      img: e.querySelector("a img").getAttribute("data-src"),
      //discount: e.querySelector("a _dsct").innerText,
      //priceWithoutDiscount: e.querySelector("a .prc").getAttribute("data-oprc"),
    }))
  );

  // Save data to JSON file
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) throw err;
    console.log("File saved");
  });

  await browser.close();
}
scrape();

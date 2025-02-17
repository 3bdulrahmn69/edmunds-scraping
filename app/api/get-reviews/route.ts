import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year');
  const make = searchParams.get('make');
  const model = searchParams.get('model');

  if (!year || !make || !model) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    console.log(`Scraping data for ${make} ${model} ${year}}`);
    const url = `https://www.edmunds.com/${make}/${model}/${year}/review/`;

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-features=site-per-process',
      ],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Extract text from the target elements
    const result = await page.evaluate(() => {
      const carImg = document.querySelector('.photo.w-100'); // Get the car image
      const rows = document.querySelectorAll('tbody tr'); // Select all rows in tbody
      const data = Array.from(rows).map((row) => {
        const keyElement = row.querySelector('th'); // Get the label (th)
        const valueElement = row.querySelector('td'); // Get the value (td)

        return {
          key:
            keyElement && keyElement.textContent
              ? keyElement.textContent.trim()
              : 'Unknown',
          value:
            valueElement && valueElement.textContent
              ? valueElement.textContent.trim()
              : 'Unknown',
        };
      });

      return {
        carImg: carImg ? carImg.getAttribute('src') : null,
        data,
      };
    });

    await browser.close();

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Scraping failed:', error);
    return NextResponse.json(
      { error: 'Scraping failed', details: String(error) },
      { status: 500 }
    );
  }
}

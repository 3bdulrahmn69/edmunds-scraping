import { NextResponse } from 'next/server';
// import puppeteer from 'puppeteer';

export async function GET() {
  const makes = [
    'Acura',
    'Alfa Romeo',
    'AM General',
    'Aston Martin',
    'Audi',
    'Bentley',
    'BMW',
    'Bugatti',
    'Buick',
    'Cadillac',
    'Chevrolet',
    'Chrysler',
    'Daewoo',
    'Dodge',
    'Eagle',
    'Ferrari',
    'FIAT',
    'Fisker',
    'Ford',
    'Genesis',
    'Geo',
    'GMC',
    'Honda',
    'HUMMER',
    'Hyundai',
    'INEOS',
    'INFINITI',
    'Isuzu',
    'Jaguar',
    'Jeep',
    'Karma',
    'Kia',
    'Lamborghini',
    'Land Rover',
    'Lexus',
    'Lincoln',
    'Lotus',
    'Lucid',
    'Maserati',
    'Maybach',
    'Mazda',
    'McLaren',
    'Mercedes-Benz',
    'Mercury',
    'MINI',
    'Mitsubishi',
    'Nissan',
    'Oldsmobile',
    'Panoz',
    'Plymouth',
    'Polestar',
    'Pontiac',
    'Porsche',
    'Ram',
    'Rivian',
    'Rolls-Royce',
    'Saab',
    'Saturn',
    'Scion',
    'smart',
    'spyker',
    'Subaru',
    'Suzuki',
    'Tesla',
    'Toyota',
    'VinFast',
    'Volkswagen',
    'Volvo',
  ];

  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

  return NextResponse.json({ data: { makes } });

  // const url = `https://www.edmunds.com/car-reviews`;

  // // Maximum number of retries if scraping fails
  // const MAX_RETRIES = 3;

  // for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
  //   try {
  //     console.log(`Attempt ${attempt}: Launching Puppeteer...`);

  //     const browser = await puppeteer.launch({
  //       headless: true,
  //       args: [
  //         '--no-sandbox',
  //         '--disable-setuid-sandbox',
  //         '--disable-dev-shm-usage',
  //         '--disable-gpu',
  //         '--disable-features=site-per-process',
  //       ],
  //     });

  //     const page = await browser.newPage();
  //     await page.setUserAgent(
  //       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  //     );

  //     console.log(`Navigating to ${url}...`);
  //     await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  //     // Wait for the dropdown to appear
  //     console.log('Waiting for make dropdown...');
  //     await page.waitForSelector('#make-dropdown', { timeout: 15000 });

  //     // Extract makes from dropdown
  //     const result = await page.evaluate(() => {
  //       const makeSelect = document.getElementById('make-dropdown');
  //       if (!makeSelect) return { makes: [] };

  //       const options = makeSelect.querySelectorAll('option:not(:disabled)');
  //       const makes = Array.from(options)
  //         .map((option) => option.textContent?.trim())
  //         .filter((text) => text && text !== 'Select Make');

  //       return { makes };
  //     });

  //     await browser.close();

  //     // Check if we got valid data
  //     if (result.makes.length > 0) {
  //       console.log(`Successfully scraped ${result.makes.length} makes.`);
  //       return NextResponse.json({ data: result });
  //     } else {
  //       console.warn(`Attempt ${attempt}: No makes found, retrying...`);
  //     }
  //   } catch (error) {
  //     console.error(`Attempt ${attempt} failed:`, error);
  //     if (attempt === MAX_RETRIES) {
  //       return NextResponse.json(
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         { error: 'Scraping failed', details: (error as any).message },
  //         { status: 500 }
  //       );
  //     }
  //   }
  // }
}

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

const URL = 'https://udyamregistration.gov.in/UdyamRegistration.aspx';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(3000);

  const data = await page.evaluate(() => {
    const extract = (root) => {
      const out = [];
      const allLabels = root.querySelectorAll('label, .form-label, .col-form-label, span');
      const getInputFor = (lab) => {
        const id = lab.getAttribute('for');
        if (id) return document.getElementById(id);
        return lab.parentElement?.querySelector('input,select,textarea');
      };
      allLabels.forEach(lab => {
        const label = (lab.textContent || '').trim();
        if (!label) return;
        const el = getInputFor(lab);
        if (!el) return;
        const type = el.tagName === 'SELECT' ? 'select' : (el.getAttribute('type') || 'text');
        const options = type === 'select'
          ? Array.from(el.querySelectorAll('option')).map(o => ({ value: o.value, label: (o.textContent || '').trim() }))
          : undefined;
        out.push({
          label,
          name: el.name || el.id || label.toLowerCase().replace(/\W+/g, '_'),
          type,
          required: el.required || /(\*|mandatory|required)/i.test(label),
          placeholder: el.placeholder || '',
          options
        });
      });
      return out;
    };

    const step1Root = [...document.querySelectorAll('h1,h2,h3,h4')].find(h => /aadhaar/i.test(h.textContent))?.closest('form,section,div') || document.body;
    const step2Root = [...document.querySelectorAll('h1,h2,h3,h4')].find(h => /\bpan\b/i.test(h.textContent))?.closest('form,section,div') || document.body;

    return {
      scrapedAt: new Date().toISOString(),
      steps: [
        { id: 1, title: 'Aadhaar Verification with OTP', fields: extract(step1Root) },
        { id: 2, title: 'PAN Verification', fields: extract(step2Root) }
      ]
    };
  });

  data.rules = {
    aadhaar: { regex: '^[2-9][0-9]{11}$', note: '12 digits; first digit 2-9' },
    pan: { regex: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$', note: 'ABCDE1234F' },
    otp: { regex: '^[0-9]{6}$', note: '6 digits' }
  };

  writeFileSync('./schema.sample.json', JSON.stringify(data, null, 2));
  console.log('✅ schema.sample.json written');
  await browser.close();
})();

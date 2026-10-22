import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { mkdir, writeFile } from 'node:fs/promises';

// Run against the built, locally started server. Never starts external services.
const target = process.env.AUDIT_URL || 'http://127.0.0.1:4321/';
const port = 9222;
const browser = await chromium.launch({ headless: true, args: [`--remote-debugging-port=${port}`] });
try {
  const result = await lighthouse(target, { port, output: 'html', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] });
  if (!result) throw new Error('Lighthouse did not return a report');
  await mkdir('docs/audits', { recursive: true });
  await writeFile('docs/audits/lighthouse-local.html', result.report.replace(/[\t ]+$/gm, ''));
  const summary = {
    target, mode: 'mobile simulated, production build, no Supabase configured',
    runtimeError: result.lhr.runtimeError,
    categories: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, value.score])),
    findings: Object.values(result.lhr.audits).filter(a => a.score !== null && a.score < 1).map(a => ({ id: a.id, title: a.title, score: a.score, description: a.description })),
  };
  await writeFile('docs/audits/summary.json', JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
} finally { await browser.close(); }

#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const JUNIT_DIR = 'coverage/usidiamond';
const JUNIT_FILE = 'test-results.xml';

function findJUnit() {
  const exact = path.join(JUNIT_DIR, JUNIT_FILE);
  if (fs.existsSync(exact)) return exact;

  if (!fs.existsSync(JUNIT_DIR)) return null;
  const found = walkFind(JUNIT_DIR, JUNIT_FILE);
  return found || null;
}

function walkFind(dir, name) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const hit = walkFind(full, name);
      if (hit) return hit;
    } else if (entry.name === name) {
      return full;
    }
  }
  return null;
}

const JUNIT_PATH = findJUnit();
const COVERAGE_PATH = 'coverage/usidiamond/coverage-summary.json';
const SUMMARY_FILE = process.env.GITHUB_STEP_SUMMARY;
const PR_COMMENT_FILE = 'coverage/usidiamond/pr-comment.md';
const RUN_URL = process.env.RUN_URL || '';

function parseJUnit(xml) {
  let tests = 0,
    failures = 0,
    errors = 0,
    skipped = 0;

  for (const m of xml.matchAll(/<testsuite\b([^>]*)>/g)) {
    const attrs = m[1];
    tests += parseInt(attrs.match(/\btests="(\d+)"/)?.[1] || '0', 10);
    failures += parseInt(attrs.match(/\bfailures="(\d+)"/)?.[1] || '0', 10);
    errors += parseInt(attrs.match(/\berrors="(\d+)"/)?.[1] || '0', 10);
    skipped += parseInt(attrs.match(/\bskipped="(\d+)"/)?.[1] || '0', 10);
  }

  const failedTests = [];
  for (const m of xml.matchAll(/<testcase\b([^>]*)>([\s\S]*?)<\/testcase>/g)) {
    const attrs = m[1];
    const body = m[2];
    if (!body.includes('<failure') && !body.includes('<error')) continue;

    const name = attrs.match(/\bname="([^"]*)"/)?.[1] || '(unknown)';
    const classname = attrs.match(/\bclassname="([^"]*)"/)?.[1] || '';

    const msgMatch = body.match(/<(?:failure|error)[^>]*message="([^"]*)"/);
    const textMatch = body.match(/<(?:failure|error)[^>]*>([\s\S]*?)<\/(?:failure|error)>/);
    const message = msgMatch?.[1] || textMatch?.[1]?.trim() || '';

    failedTests.push({ name, classname, message });
  }

  return { tests, failures, errors, skipped, failedTests };
}

function pctIcon(pct) {
  if (pct >= 80) return '🟢';
  if (pct >= 60) return '🟡';
  return '🔴';
}

function fmtPct(n) {
  return Number(n).toFixed(1) + '%';
}

if (!fs.existsSync(JUNIT_PATH)) {
  console.log('No JUnit report found at', JUNIT_PATH);
  process.exit(0);
}

const xml = fs.readFileSync(JUNIT_PATH, 'utf8');
const { tests, failures, errors, skipped, failedTests } = parseJUnit(xml);
const totalFailed = failures + errors;
const passed = tests - totalFailed - skipped;
const allPassed = totalFailed === 0;

let coverage = null;
if (fs.existsSync(COVERAGE_PATH)) {
  try {
    coverage = JSON.parse(fs.readFileSync(COVERAGE_PATH, 'utf8')).total;
  } catch {}
}

const out = [];

const bannerIcon = allPassed ? '✅' : '❌';
const bannerTitle = allPassed
  ? `All ${tests} unit tests passed`
  : `${totalFailed} of ${tests} unit tests failed`;

out.push(`## ${bannerIcon} Unit Tests — ${bannerTitle}\n`);
out.push(
  `> **${passed}** passed &nbsp;·&nbsp; **${totalFailed}** failed &nbsp;·&nbsp; **${skipped}** skipped\n`,
);

if (coverage) {
  out.push('### Coverage\n');
  out.push('| Metric | | % | Covered / Total |');
  out.push('|--------|--|---|-----------------|');
  for (const [label, key] of [
    ['Statements', 'statements'],
    ['Branches', 'branches'],
    ['Functions', 'functions'],
    ['Lines', 'lines'],
  ]) {
    const m = coverage[key];
    if (!m) continue;
    out.push(`| ${label} | ${pctIcon(m.pct)} | **${fmtPct(m.pct)}** | ${m.covered} / ${m.total} |`);
  }
  out.push('');
}

if (failedTests.length > 0) {
  out.push('<details open><summary>❌ Failed tests</summary>\n');
  out.push('| Test | Error |');
  out.push('|------|-------|');
  for (const t of failedTests) {
    const label = t.classname ? `${t.classname}` : t.name;
    const msg = (t.message || '')
      .replace(/\r?\n/g, ' ')
      .replace(/\\/g, '\\\\')
      .replace(/\|/g, '\\|')
      .slice(0, 200);
    out.push(`| \`${label}\` | ${msg || '—'} |`);
  }
  out.push('\n</details>\n');
}

out.push('---\n');

if (RUN_URL) {
  out.push(`[View workflow run ↗](${RUN_URL})`);
}

const markdown = out.join('\n');

if (SUMMARY_FILE) {
  fs.appendFileSync(SUMMARY_FILE, markdown + '\n');
  console.log('Summary written to GITHUB_STEP_SUMMARY');
} else {
  console.log('GITHUB_STEP_SUMMARY not set — preview:');
  console.log(markdown);
}

try {
  fs.mkdirSync(path.dirname(PR_COMMENT_FILE), { recursive: true });
  fs.writeFileSync(PR_COMMENT_FILE, markdown + '\n');
  console.log('PR comment written to', PR_COMMENT_FILE);
} catch (e) {
  console.error('Failed to write PR comment file:', e.message);
}

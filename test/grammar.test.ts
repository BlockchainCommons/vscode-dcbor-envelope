import * as fs from 'fs';
import * as path from 'path';
import { Registry, INITIAL } from 'vscode-textmate';
import { loadWASM, OnigScanner, OnigString } from 'vscode-oniguruma';

let onigLib: { createOnigScanner: (sources: string[]) => OnigScanner; createOnigString: (s: string) => OnigString; };

beforeAll(async () => {
  const wasmPath = require.resolve('vscode-oniguruma/release/onig.wasm');
  const wasm = fs.readFileSync(wasmPath).buffer;
  await loadWASM(wasm);
  onigLib = {
    createOnigScanner: (patterns: string[]) => new OnigScanner(patterns),
    createOnigString: (s: string) => new OnigString(s)
  };
});

test('tokenize square brackets, strings and numbers', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = '["foo", 123]';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('punctuation.square.brackets.json');
  expect(scopes).toContain('string.quoted.double.json');
  expect(scopes).toContain('constant.numeric.json');
});

test('tokenize single quoted strings', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = "['bar']";
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('string.quoted.single.json');
});

test('tokenize double angle brackets', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = "<<test>>";
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('punctuation.angle.brackets.double.json');
});

test('tokenize guillemet brackets', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = "«test»";
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('punctuation.angle.brackets.guillemet.json');
});

test('tokenize floral brackets', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = "❰test❱";
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('punctuation.angle.brackets.floral.json');
});

test('tokenize boolean and null literals', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = '[true, false, null]';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('constant.language.json');
});

test('tokenize separator punctuation', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = '[1,2:3;]';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('punctuation.separator.json');
});

test('tokenize prefixed string literals', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  // Test with various prefixes
  const examples = [
    "[h'1a2b']",
    "[b'data']",
    "[u'some text']",
    "[test'example with escaped \\'quote\\'']"
  ];

  for (const line of examples) {
    const { tokens } = grammar.tokenizeLine(line, INITIAL);
    const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
    expect(scopes.some(scope =>
      scope === 'string.quoted.prefixed.json' ||
      scope === 'string.quoted.prefixed.multiline.json'
    )).toBeTruthy();
  }
});

test('tokenize bare words', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = 'bareWord';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('identifier.bareword.json');
});

test('tokenize inline comments', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = '/ inline comment /';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('comment.block.inline.json');
});

test('tokenize end of line comments', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = '# end';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('comment.line.number-sign.json');
});

test('tokenize ISO-8601 dates and date/time literals', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = '[2025-06-19, 2025-06-19T21:57:12Z]';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('constant.numeric.date.json');
});

test('tokenize bare hex numbers', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = '[4676635a]';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('constant.numeric.json');
});

test('tokenize UR literals', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = 'ur:envelope/abcd';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('constant.other.ur.json');
});

test('tokenize keywords', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = 'ELIDED ENCRYPTED COMPRESSED';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('keyword.other.literal.json');
});

test('tokenize special numeric keywords', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = '[Infinity, -Infinity, NaN]';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('constant.numeric.special.json');
});

test('tokenize multiline prefixed string literals', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  // Test multiline prefixed string with inline comments
  const lines = [
    "h'68 65 6c /doubled l!/ 6c 6f /hello/",
    "20 /space/",
    "77 6f 72 6c 64' /world/"
  ];

  // First line should have the beginning of a multiline prefixed string
  const line1Result = grammar.tokenizeLine(lines[0], INITIAL);
  const scopes1 = line1Result.tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes1).toContain('string.quoted.prefixed.multiline.json');
  expect(scopes1).toContain('comment.block.inline.json');

  // Last line should have the end of the multiline prefixed string
  const lastLineResult = grammar.tokenizeLine(lines[2], INITIAL);
  const scopesLast = lastLineResult.tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopesLast).toContain('string.quoted.prefixed.multiline.json');
  expect(scopesLast).toContain('comment.block.inline.json');
});

test('tokenize hexadecimal floating point with binary exponent', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const examples = [
    '0x1.8p0',
    '0x18p-4',
    '0x3.ap5',
    '0xA.Bp-3'
  ];

  for (const line of examples) {
    const { tokens } = grammar.tokenizeLine(line, INITIAL);
    const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
    expect(scopes).toContain('constant.numeric.hex.json');
  }
});

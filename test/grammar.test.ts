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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('punctuation.square.brackets.dcbor');
  expect(scopes).toContain('string.quoted.double.dcbor');
  expect(scopes).toContain('constant.numeric.dcbor');
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('string.quoted.single.dcbor');
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('punctuation.angle.brackets.double.dcbor');
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('punctuation.angle.brackets.guillemet.dcbor');
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('punctuation.angle.brackets.floral.dcbor');
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('constant.language.dcbor');
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('punctuation.separator.dcbor');
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
    const scopes = tokens.flatMap(t => t.scopes);
    expect(scopes.some(scope =>
      scope === 'string.quoted.prefixed.dcbor' ||
      scope === 'string.quoted.prefixed.multiline.dcbor'
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('identifier.bareword.dcbor');
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('comment.block.inline.dcbor');
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('comment.line.number-sign.dcbor');
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('constant.numeric.date.dcbor');
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('constant.numeric.dcbor');
});

test('tokenize URI literals', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  // Test original ur: scheme
  const urLine = 'ur:envelope/abcd';
  const urTokens = grammar.tokenizeLine(urLine, INITIAL);
  const urScopes = urTokens.tokens.flatMap(t => t.scopes);
  expect(urScopes).toContain('constant.other.uri.dcbor');

  // Test https: scheme
  const httpsLine = 'https://example.com/path';
  const httpsTokens = grammar.tokenizeLine(httpsLine, INITIAL);
  const httpsScopes = httpsTokens.tokens.flatMap(t => t.scopes);
  expect(httpsScopes).toContain('constant.other.uri.dcbor');

  // Test mailto: scheme
  const mailtoLine = 'mailto:user@example.com';
  const mailtoTokens = grammar.tokenizeLine(mailtoLine, INITIAL);
  const mailtoScopes = mailtoTokens.tokens.flatMap(t => t.scopes);
  expect(mailtoScopes).toContain('constant.other.uri.dcbor');
});

test('tokenize envelope keywords', async () => {
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('keyword.other.envcase.dcbor');
});

test('tokenize tree branch keywords', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.dcbor-envelope');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = 'subj pred obj content';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('keyword.other.treebranch.dcbor');
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
  const scopes = tokens.flatMap(t => t.scopes);
  expect(scopes).toContain('constant.numeric.special.dcbor');
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
  const scopes1 = line1Result.tokens.flatMap(t => t.scopes);
  expect(scopes1).toContain('string.quoted.prefixed.multiline.dcbor');
  expect(scopes1).toContain('comment.block.inline.dcbor');

  // Last line should have the end of the multiline prefixed string
  const lastLineResult = grammar.tokenizeLine(lines[2], INITIAL);
  const scopesLast = lastLineResult.tokens.flatMap(t => t.scopes);
  expect(scopesLast).toContain('string.quoted.prefixed.multiline.dcbor');
  expect(scopesLast).toContain('comment.block.inline.dcbor');
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
    const scopes = tokens.flatMap(t => t.scopes);
    expect(scopes).toContain('constant.numeric.hex.dcbor');
  }
});

test('tokenize envelope pattern regexes', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'envelope-pattern.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async (scopeName: string) => {
      if (scopeName === 'source.envelope-pattern') {
        return JSON.parse(grammarContent);
      }
      if (scopeName === 'source.dcbor-envelope') {
        const dcborGrammarPath = path.join(__dirname, '..', 'syntaxes', 'dcbor-envelope.tmLanguage.json');
        const dcborGrammarContent = fs.readFileSync(dcborGrammarPath, 'utf8');
        return JSON.parse(dcborGrammarContent);
      }
      return null;
    }
  });
  const grammar = await registry.loadGrammar('source.envelope-pattern');
  if (!grammar) throw new Error('Envelope pattern grammar failed to load');

  // Test cases that should be highlighted as regexes
  const testCases = [
    {
      text: 'tagged(/regex/, "value")',
      description: 'regex inside function call',
      expectRegex: true
    },
    {
      text: '/Hello/',
      description: 'bare regex',
      expectRegex: true
    },
    {
      text: "h'/abc/'",
      description: 'regex in prefixed single-quoted string',
      expectRegex: true,
      expectPrefix: true,
      expectQuotes: true
    },
    {
      text: "digest'/regex/'",
      description: 'regex in digest prefixed string',
      expectRegex: true,
      expectPrefix: true,
      expectQuotes: true
    },
    {
      text: "date'/2023-.*/'",
      description: 'regex in date prefixed string',
      expectRegex: true,
      expectPrefix: true,
      expectQuotes: true
    },
    {
      text: '(/regex/)',
      description: 'regex in parentheses',
      expectRegex: true
    }
  ];

  for (const testCase of testCases) {
    const { tokens } = grammar.tokenizeLine(testCase.text, INITIAL);
    const scopes = tokens.flatMap(t => t.scopes);

    if (testCase.expectRegex) {
      expect(scopes.some(scope => scope.includes('string.regexp'))).toBe(true);
    }

    if (testCase.expectPrefix) {
      expect(scopes.some(scope => scope.includes('storage.type.string'))).toBe(true);
    }

    if (testCase.expectQuotes) {
      expect(scopes.some(scope => scope.includes('punctuation.definition.string'))).toBe(true);
    }

    console.log(`✓ ${testCase.description}: ${testCase.text}`);
  }
});

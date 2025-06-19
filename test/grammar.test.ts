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
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'brackets-json.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.brackets-json');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = '["foo", 123]';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('punctuation.square.brackets.json');
  expect(scopes).toContain('string.quoted.double.json');
  expect(scopes).toContain('constant.numeric.json');
});

test('tokenize single quoted strings', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'brackets-json.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.brackets-json');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = "['bar']";
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('string.quoted.single.json');
});

test('tokenize boolean and null literals', async () => {
  const grammarPath = path.join(__dirname, '..', 'syntaxes', 'brackets-json.tmLanguage.json');
  const grammarContent = fs.readFileSync(grammarPath, 'utf8');
  const registry = new Registry({
    onigLib: Promise.resolve(onigLib),
    loadGrammar: async () => JSON.parse(grammarContent)
  });
  const grammar = await registry.loadGrammar('source.brackets-json');
  if (!grammar) throw new Error('Grammar failed to load');

  const line = '[true, false, null]';
  const { tokens } = grammar.tokenizeLine(line, INITIAL);
  const scopes = tokens.map(t => t.scopes[t.scopes.length - 1]);
  expect(scopes).toContain('constant.language.json');
});

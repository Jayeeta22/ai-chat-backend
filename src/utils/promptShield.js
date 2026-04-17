export function detectPromptInjection(input) {
  const patterns = [
    /ignore.*instruction/i,
    /bypass.*rule/i,
    /reveal.*system/i,
    /act as admin/i,
  ];

  return patterns.some((p) => p.test(input));
}
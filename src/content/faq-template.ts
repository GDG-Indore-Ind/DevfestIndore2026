// One vocabulary shared by publication validation and the FAQ renderer.
export const FAQ_TOKENS = [
  "date",
  "venue",
  "address",
  "registrationTime",
  "entryPolicy",
  "workshopPolicy",
  "finalSalePolicy",
  "studentPrice",
  "professionalPrice",
  "groupOffer",
  "vipPrice",
  "lastOrbitPrice",
  "observerPrice",
] as const;

export type FaqValues = Record<(typeof FAQ_TOKENS)[number], string>;

export function faqPolicyValues(policies: readonly { id: string; text: string }[]) {
  const text = (id: string) => {
    const policy = policies.find((item) => item.id === id);
    if (!policy) throw new Error(`FAQ policy ${id} is missing.`);
    return policy.text;
  };
  return {
    entryPolicy: text("entry-identification"),
    workshopPolicy: text("workshop-access"),
    finalSalePolicy: text("final-sale"),
  };
}

export function renderFaqAnswer(answer: string, values: FaqValues): string {
  return answer.replace(/\{\{([^{}]+)\}\}/g, (_, token: string) => {
    if (!Object.hasOwn(values, token) || values[token as keyof FaqValues] === undefined)
      throw new Error(`Unknown or unresolved FAQ token ${token}.`);
    return values[token as keyof FaqValues];
  });
}

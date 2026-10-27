// Derive relationship views from the editable contribution records.
export function organizationView(record, { fingerprint = false } = {}) {
  const relationships = [];
  for (const contribution of record.contributions) {
    const editionId = contribution.eventId ?? contribution.scope;
    const existing = relationships.find(item => item.editionId === editionId);
    if (existing) {
      existing.contributions.push({ kind: contribution.type, role: contribution.title });
      if (fingerprint) (existing.additionalContributionIds ??= []).push(contribution.id);
      continue;
    }
    const relationship = {};
    for (const [key,value] of Object.entries(contribution)) {
      if (key === 'eventId' || key === 'scope') relationship.editionId = value;
      else if (key === 'status') relationship.publication = value;
      else if (key === 'type') relationship.contributions = [{ kind: value, role: contribution.title }];
      else if (key !== 'title') relationship[key] = value;
    }
    relationships.push(relationship);
  }
  const organization = {};
  for (const [key,value] of Object.entries(record)) {
    if (key === 'contributions') organization.partnerships = relationships;
    else organization[({logo:'logoUrl',website:'websiteUrl',social:'socialUrl'})[key] ?? key] = value;
  }
  return organization;
}

// Preserve the original review payloads while the editable records share one structure.
function project(entry, names) {
  return Object.fromEntries(Object.entries(entry).filter(([key]) => key !== 'type' && key !== 'legacyId').map(([key, value]) => [names[key] ?? key, value]));
}
export const talks = content => content.programme.entries.filter(entry => entry.type === 'talk').map(entry => project(entry, { eventId: 'editionId' }));
export const workshops = content => content.programme.entries.filter(entry => entry.type === 'campus-workshop').map(entry => {
  const photos = entry.photoIds.flatMap(id => {
    const photo = content.gallery.photos.find(item => item.id === id);
    return photo ? [{ imageUrl: photo.imageUrl, caption: photo.caption, width: photo.width, height: photo.height, source: photo.source }] : [];
  });
  const ordered = Object.fromEntries(Object.entries(entry).map(([key,value]) => key === 'photoIds' ? ['photos', photos] : [key,value]));
  return project(ordered, { campus: 'college', title: 'topic' });
});

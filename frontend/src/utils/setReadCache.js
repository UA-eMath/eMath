export function setReadCache(bookId, pageId) {
  let cache = localStorage.getItem("readCache");
  if (cache) {
    cache = JSON.parse(cache);
    cache[bookId] = pageId;
  } else {
    cache = { [bookId]: pageId };
  }
  localStorage.setItem("readCache", JSON.stringify(cache));
}

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

export function setExpandKeysCache(bookId, expandedKeys) {
  let cache = localStorage.getItem("expandedKeys");
  if (cache) {
    cache = JSON.parse(cache);
    cache[bookId] = expandedKeys;
  } else {
    cache = { [bookId]: expandedKeys };
  }
  localStorage.setItem("expandedKeys", JSON.stringify(cache));
}

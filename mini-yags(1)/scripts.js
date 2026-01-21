/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "startpage"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [
      {
        "id":"hSOmcuVHtdrRsTCt",
        "label":"Social",
        "bookmarks":[{
          "id":"aqMNVoh5FjU9dkaX",
          "label":"YouTube",
          "url":"https://www.youtube.com/"
        },{
          "id":"wYKONKq8XmH3XleV",
          "label":"reddit",
          "url":"https://www.reddit.com"
        },{
        "id":"L4LyuBK0Azux639J",
        "label":"r/unixporn",
        "url":"https://www.reddit.com/r/unixporn/"
        }]
      },

      {
        "id":"hSOmcuVHtdrRsTCt",
        "label":"AI",
        "bookmarks":[{
          "id":"aqMNVoh5FjU9dkaX",
          "label":"ChatGPT",
          "url":"https://chatgpt.com/"
        },{
          "id":"wYKONKq8XmH3XleV",
          "label":"Gemini",
          "url":"https://gemini.google.com/app/"
        },{
        "id":"L4LyuBK0Azux639J",
        "label":"Grok",
        "url":"https://grok.com/"
        }]
      },
      
      {
        "id":"lo1FevC3OcOBP7nn",
        "label":"Nix",
        "bookmarks":[{
          "id":"XBai84ptIMi1OWV3",
          "label":"Nix Search",
          "url":"https://search.nixos.org/packages"
        },{
          "id":"S2AbUaB0k2gIDDNM",
          "label":"HM Search",
          "url":"https://home-manager-options.extranix.com/"
        }]
      },
      
      {
        "id":"ygfnt6Hm9hYqUJTI",
        "label":"GitHub",
        "bookmarks":[{
          "id":"BiptUMPW7NSJfOd1",
          "label":"GitHub",
          "url":"https://github.com/"
        },{
          "id":"LS4N2sTOZpGuCQYr",
          "label":"GitHub Profile",
          "url":"https://github.com/NyXieR-648074"
        }]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()

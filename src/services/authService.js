export const handleLogin = password => {
  return fetch(process.env.GATSBY_AUTH_FN_URL, {
    method: "POST",
    body: JSON.stringify({
      password,
    }),
  })
    .then(r => r.json())
    .then(result => {
      if (!result.error) {
        setAuthFromStore(result.msg)
      }
      return result
    })
}

export const STORAGE_KEY = "AuthToken"

export const getAuthFromStore = () =>
  typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)

const deleteAuthFromStore = () =>
  typeof window !== "undefined" && localStorage.removeItem(STORAGE_KEY)

const setAuthFromStore = chk => {
  typeof window !== "undefined" && localStorage.setItem(STORAGE_KEY, chk)
}

export const checkAuth = () => {
  const checksum = getAuthFromStore()
  if (!checksum) return Promise.resolve(false)
  return fetch(process.env.GATSBY_CHK_AUTH_FN_URL, {
    method: "POST",
    body: JSON.stringify({
      checksum,
    }),
  })
    .then(r => r.json())
    .then(r => {
      if (!r.isAuth) deleteAuthFromStore()
      return r
    })
}

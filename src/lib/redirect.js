export function isUnrealWebView() {
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('unrealengine') || ua.includes('miladycity')
}

export function redirectToUnreal(wallet) {
  const scheme = 'miladycity://auth'
  const url = `${scheme}?wallet=${wallet}`
  window.location.href = url
}

export function checkRedirectParam() {
  const params = new URLSearchParams(window.location.search)
  return params.get('redirect_uri')
}

export function handleAuthComplete(wallet) {
  const redirectUri = checkRedirectParam()
  
  if (redirectUri) {
    window.location.href = `${redirectUri}?wallet=${wallet}`
    return true
  }
  
  if (isUnrealWebView()) {
    redirectToUnreal(wallet)
    return true
  }
  
  return false
}

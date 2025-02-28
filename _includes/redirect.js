(function() {
  const redirects = {};
  {% for redirect in site.data.redirects %}
  redirects["{{ redirect.from }}"] = "{{ redirect.to }}";
  {% endfor %}
  const path = window.location.pathname;
  const redir = redirects[path];
  if (redir) {
    document.querySelector('#text-404').innerHTML = `Redirecting you to <a href="${redir}">${redir}<a/>`;
    window.location.href = redir;
  } else {
    document.querySelector('title').innerText = "Page Not Found | Rob G for PPS Board"
    document.querySelector('#content-404').classList.remove('hidden')
  }
})();
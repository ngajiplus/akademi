(function(){
  const KEY="ngajiplus-theme";
  function getTheme(){
    const saved=localStorage.getItem(KEY);
    if(saved==="dark"||saved==="light") return saved;
    return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
  }
  function apply(theme){
    theme=theme==="dark"?"dark":"light";
    document.documentElement.setAttribute("data-theme",theme);
    document.body.classList.toggle("dark",theme==="dark");
    document.body.classList.toggle("dark-mode",theme==="dark");
    document.querySelectorAll("#themeBtn,#themeToggle,#themeBtnTop,.theme-toggle,.theme-btn").forEach(function(btn){
      btn.textContent=theme==="dark"?"☀️":"🌙";
      btn.setAttribute("aria-label",theme==="dark"?"Aktifkan mode terang":"Aktifkan mode gelap");
      btn.title=theme==="dark"?"Mode terang":"Mode gelap";
    });
    localStorage.setItem(KEY,theme);
  }
  window.toggleTheme=function(){apply(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark");};
  window.toggleDashboardTheme=window.toggleTheme;
  apply(getTheme());
  window.addEventListener("storage",function(e){if(e.key===KEY) apply(e.newValue||"light");});
})();

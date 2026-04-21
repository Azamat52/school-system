import { useState } from "react";

export default function Login({ onLogin, admins, teachers, students, direktor, setComplating, setPath }) {
  const [tab, setTab] = useState("direktor");
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [err, setErr] = useState("");

  function go(e) {
    e.preventDefault();
    if (u.trim() === "" || p.trim() === ""){
      setErr("Majburiy maydonlarni to'ldiring"); return;
    }
    if (tab === "direktor" && direktor.username === u && direktor.password === p) {
      onLogin(direktor);
      setComplating(false);
      return;
    }
    if (tab === 'admin') {
      const a = admins.find(
        (a) => a.username === u && a.password === p && a.status === 'active')
      if (a) { onLogin(a); setComplating(false); return; }
    }
    if (tab === "teacher") {
      const t = teachers.find(
        (t) => t.username === u && t.password === p && t.status === "active")
      if (t) { onLogin(t); setComplating(false); return; }
    }
    if (tab === "student") {
      const s = students.find(
        (s) => s.username === u && s.password === p && s.status === "active")
      if (s) { onLogin(s); setComplating(false); return; }
    }
    setErr("Login yoki parol noto'g'ri!");
  }

  function switchTab(id) {
    setTab(id);
    setU("");
    setP("");
    setErr("");
  }

  const TabSwitcher = (tab) => {
    if(tab === 'direktor'){
      return direktor ? [direktor] : [];
    }
    if(tab === 'admin'){
      return admins.filter((a) => a.status === 'active')
    }
    if(tab === 'teacher'){
      return teachers.filter((t) => t.status === 'active')
    }
    if(tab === 'student'){
      return students.filter((s) => s.status === 'active')
    }
  }
  const quickList = TabSwitcher(tab)
  const roleLabel = { admin: "Admin", teacher: "Ustoz", student: "O'quvchi", direktor: 'Direktor' };
  const roleClass = { admin: "hr-a", teacher: "hr-t", student: "hr-s", direktor: 'hr-d' };

  return (
    <div className="lw">
      <div className="lw-orb lw-orb1" />
      <div className="lw-orb lw-orb2" />

      <div className="lc">
        <div className="lc-logo">🎓</div>
        <h1>EduTrack</h1>
        <div className="lc-sub">Maktab boshqaruv tizimi</div>

        {/* Role tabs */}
        <div className="rtabs">
          {[
            ["direktor", "🧓", "Direktor"],
            ["admin", "👑", "Admin"],
            ["teacher", "👨‍🏫", "Ustoz"],
            ["student", "👨‍🎓", "O'quvchi"]
          ].map(([id, ic, lb]) => (
            <button
              key={id}
              className={`rt${tab === id ? " on" : ""}`}
              onClick={() => switchTab(id)}
            >
              {ic} {lb}
            </button>
          ))}
        </div>

        {/* Login form */}
        <form onSubmit={go}>
          <div className="fl">
            <label>Login</label>
            <input
              className="fi"
              placeholder="username"
              value={u}
              onChange={(e) => setU(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="fl">
            <label>Parol</label>
            <input
              className="fi"
              type={showPassword ? "password" : "text"}
              placeholder="••••••••"
              value={p}
              onChange={(e) => setP(e.target.value)}
            />
            <button className="changing_password" type="button" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
            </button>
          </div>
          <button className="btn-go" type="submit">
            Kirish →
          </button>
        </form>
        {err && <div className="err-box">{err}</div>}
        {/* Quick login hints */}
        <div className="hints">
          <div className="hints-ttl">⚡ Tez kirish (bosing)</div>
          {quickList.map((x, i) => (
            <div
              key={i}
              className="hint"
              onClick={() => { setU(x.username); setP(x.password); setErr(""); }}
            >
              <span className="hn">{x.name}</span>
              <span className="hc">{x.username}/{x.password}</span>
              <span className={`hr ${roleClass[x.role]}`}>{roleLabel[x.role]}</span>
            </div>
          ))}
        </div>
        <div className="auth">Ro'yhatdan o'tmoqchimisiz? <span className="both_login" onClick={() => setPath("registar")}>Ro'yhatdan o'tish</span></div>
      </div>
    </div>
  );
}

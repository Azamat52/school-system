import { ini } from "../helpers";

const NAV_CONFIG = {
  direktor: [
    {
      sec: "Boshqaruv",
      items: [
        { id: "admincontrol", ic: "🛂", lb: "Adminlar Nazorati" },
        { id: "payment", ic: "💵", lb: "Oylik Maoshlar" }, 
      ],
    },
  ],
  admin: [
    {
      sec: "Asosiy",
      items: [
        { id: "dash", ic: "📊", lb: "Dashboard" },
        { id: "att", ic: "📋", lb: "Davomat jurnali" },
        { id: "rep", ic: "📈", lb: "Hisobotlar" },
      ],
    },
    {
      sec: "Boshqaruv",
      items: [
        { id: "teachers", ic: "👨‍🏫", lb: "Ustozlar" },
        { id: "students", ic: "👨‍🎓", lb: "O'quvchilar" },
      ],
    },
  ],
  teacher: [
    {
      sec: "Menyu",
      items: [
        { id: "dash", ic: "📊", lb: "Dashboard" },
        { id: "mark", ic: "✅", lb: "Davomat olish" },
        { id: "myclass", ic: "📋", lb: "Mening sinfim" },
      ],
    },
  ],
  student: [
    {
      sec: "Menyu",
      items: [
        { id: "dash", ic: "🏠", lb: "Bosh sahifa" },
        { id: "myatt", ic: "📋", lb: "Mening davomatim" },
      ],
    },
  ],
};

const AV_CLASS = { admin: "av-a", teacher: "av-t", student: "av-s", direktor: 'av-d' };
const ROLE_LABEL = {
  direktor: "🧓 Direktor",
  admin: "👑 Admin",
  teacher: (u) => `👨‍🏫 ${u.cls}`,
  student: (u) => `👨‍🎓 ${u.cls}`,
};

export default function Sidebar({ user, page, direktorPage, setPage, setDirektorPage, onLogout, theme, onToggleTheme }) {
  const sections = NAV_CONFIG[user.role] || [];
  const roleTag =
    typeof ROLE_LABEL[user.role] === "function"
      ? ROLE_LABEL[user.role](user)
      : ROLE_LABEL[user.role];

  const isLight = theme === "light";
  return (
    <div className="sb">
      {/* Logo */}
      <div className="sb-head">
        <div className="sb-logo">
          <div className="sb-li">🏫</div>
          <div>
            <div className="sb-lt">EduTrack</div>
            <div className="sb-lv">v3.0</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sb-nav">
        {sections.map((sec) => (
          <div key={sec.sec} className="sb-sec">
            <div className="sb-sl">{sec.sec}</div>
            {sec.items.map((it) => (
              <div
                key={it.id}
                className={`ni${page === it.id || direktorPage === it.id ? " on" : ""}`}
                onClick={() => { setPage(it.id); setDirektorPage(it.id) }}
              >
                <span className="ni-ic">{it.ic}</span>
                {it.lb}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sb-foot">
        {/* User info */}
        <div className="sb-user">
          <div className={`av ${AV_CLASS[user.role]}`}>{ini(user.name)}</div>
          <div>
            <div className="sb-un">{user.name}</div>
            <div className="sb-ur">{roleTag}</div>
          </div>
        </div>

        {/* Theme toggle */}
        <button className="theme-toggle" onClick={onToggleTheme}>
          <span className="theme-toggle-label">
            {isLight ? "☀️" : "🌙"}
            <span>{isLight ? "Light mode" : "Dark mode"}</span>
          </span>
          <div className={`toggle-pill${isLight ? " on" : ""}`}>
            <div className="toggle-thumb" />
          </div>
        </button>

        {/* Logout */}
        <button className="btn-out" onClick={onLogout}>
          🚪 Chiqish
        </button>
      </div>
    </div>
  );
}

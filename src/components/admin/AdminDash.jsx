import { TODAY } from "../../constants";
import { pct, pClass, pColor } from "../../helpers";

export default function AdminDash({ att, teachers, students }) {
  const todayAtt = att.filter((a) => a.date === TODAY);
  const activeStud = students.filter((s) => s.status === "active");
  const activeTeach = teachers.filter((t) => t.status === "active");
  const present = todayAtt.filter((a) => a.status === "present").length;
  const absent = todayAtt.filter((a) => a.status === "absent").length;
  const late = todayAtt.filter((a) => a.status === "late").length;
  const clsList = [...new Set(activeStud.map((s) => s.cls))].slice(0, 4);

  return (
    <div>
      {/* Welcome banner */}
      <div className="wcard" data-emoji="🏫">
        <div className="wcard-t">Xush kelibsiz, Admin! 👋</div>
        <div className="wcard-s">
          {new Date().toLocaleDateString("uz-UZ", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
          })}
        </div>
      </div>

      {/* Stat cards */}
      <div className="sgrid">
        <div className="sc">
          <div className="sc-ic">👨‍🎓</div>
          <div className="sc-v" style={{ color: "var(--a1)" }}>{activeStud.length}</div>
          <div className="sc-l">Faol o'quvchilar</div>
        </div>
        <div className="sc">
          <div className="sc-ic">👨‍🏫</div>
          <div className="sc-v" style={{ color: "var(--a2)" }}>{activeTeach.length}</div>
          <div className="sc-l">Faol ustozlar</div>
        </div>
        <div className="sc">
          <div className="sc-ic">✅</div>
          <div className="sc-v" style={{ color: "var(--a3)" }}>{present}</div>
          <div className="sc-l">Bugun keldi</div>
          <div className="sc-c" style={{ color: "var(--a3)" }}>↑ {pct(present, activeStud.length)}%</div>
        </div>
        <div className="sc">
          <div className="sc-ic">❌</div>
          <div className="sc-v" style={{ color: "var(--r1)" }}>{absent + late}</div>
          <div className="sc-l">Kelmadi/Kech</div>
          <div className="sc-c" style={{ color: "var(--r1)" }}>↓ {pct(absent + late, activeStud.length)}%</div>
        </div>
      </div>

      <div className="g2">
        {/* Classes attendance */}
        <div className="card">
          <div className="ch"><div className="ct">📊 Sinflar (bugun)</div></div>
          {clsList.map((cls) => {
            const sts = activeStud.filter((s) => s.cls === cls);
            const cpr = todayAtt.filter(
              (a) => a.status === "present" && sts.find((s) => s.id === a.studentId)
            ).length;
            const p = pct(cpr, sts.length);
            return (
              <div key={cls} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700 }}>{cls} sinf</span>
                  <span style={{ color: "var(--t3)" }}>
                    {cpr}/{sts.length} —{" "}
                    <span style={{ color: pColor(p), fontWeight: 700 }}>{p}%</span>
                  </span>
                </div>
                <div className="pb">
                  <div className={`pf ${pClass(p)}`} style={{ width: `${p}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Teachers list */}
        <div className="card">
          <div className="ch"><div className="ct">👨‍🏫 Ustozlar</div></div>
          <div className="tw">
            <table>
              <thead>
                <tr><th>Ism</th><th>Fan</th><th>Sinf</th></tr>
              </thead>
              <tbody>
                {activeTeach.slice(0, 5).map((t) => (
                  <tr key={t.id}>
                    <td><strong>{t.name}</strong></td>
                    <td style={{ color: "var(--t3)" }}>{t.subject}</td>
                    <td><span className="badge b-b">{t.cls}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

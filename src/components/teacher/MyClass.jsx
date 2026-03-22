import { pct, pClass, pColor } from "../../helpers";

export default function MyClass({ user, att, students }) {
  const classStudents = students.filter((s) => s.cls === user.cls && s.status === "active");

  function getStats(id) {
    const records = att.filter((a) => a.studentId === id && a.teacherId === user.id);
    const present = records.filter((a) => a.status === "present").length;
    return {
      total: records.length,
      present,
      absent: records.filter((a) => a.status === "absent").length,
      late: records.filter((a) => a.status === "late").length,
      p: pct(present, records.length),
    };
  }

  return (
    <div>
      <div className="ph">
        <div className="ph-title">📋 {user.cls} sinfi</div>
        <div className="ph-sub">{user.subject} • {classStudents.length} o'quvchi</div>
      </div>

      <div className="card">
        <div className="tw">
          <table>
            <thead>
              <tr><th>#</th><th>O'quvchi</th><th>Jami</th><th>✅</th><th>❌</th><th>⏰</th><th>Davomat</th></tr>
            </thead>
            <tbody>
              {classStudents.map((s, i) => {
                const st = getStats(s.id);
                return (
                  <tr key={s.id}>
                    <td style={{ color: "var(--t4)", fontFamily: "Fira Code" }}>{i + 1}</td>
                    <td><strong>{s.name}</strong></td>
                    <td style={{ fontFamily: "Fira Code" }}>{st.total}</td>
                    <td style={{ color: "var(--a3)", fontFamily: "Fira Code" }}>{st.present}</td>
                    <td style={{ color: "var(--r1)", fontFamily: "Fira Code" }}>{st.absent}</td>
                    <td style={{ color: "var(--w1)", fontFamily: "Fira Code" }}>{st.late}</td>
                    <td style={{ minWidth: 120 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div className="pb" style={{ flex: 1 }}>
                          <div className={`pf ${pClass(st.p)}`} style={{ width: `${st.p}%` }} />
                        </div>
                        <span style={{ fontSize: 11, fontFamily: "Fira Code", fontWeight: 800, color: pColor(st.p) }}>{st.p}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

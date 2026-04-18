import { useState } from "react";
import { TODAY, SUBJECTS, CLASSES } from "../../constants";
import { uid, ini } from "../../helpers";
import Modal from "../Modal";

const EMPTY_FORM = {
  name: "", username: "", password: "", pays: "",
  subject: "Matematika", cls: "9A", phone: "", joinDate: TODAY,
};

export default function TeachersPage({ teachers, setTeachers, toast }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showFire, setShowFire] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErr, setFormErr] = useState("");

  const shown = teachers.filter((t) => filter === "all" || t.status === filter);

  function openAdd() { setShowAdd(true); setForm(EMPTY_FORM); setFormErr(""); }

  function add() {
    if (form.name.length === 0 || form.phone.length === 0 || form.password.length === 0 || form.pays.length === 0 || form.username.length === 0) {
      setFormErr("Majburiy maydonlarni to'ldiring!"); return;
    }
    if (teachers.find((t) => t.username === form.username)) {
      setFormErr("Bu username allaqachon band!"); return;
    }
    setTeachers((p) => [...p, { ...form, id: uid(), role: "teacher", status: "active" }]);
    setShowAdd(false);
    toast("Yangi ustoz qo'shildi!");
  }

  function fire(id) {
    setTeachers((p) => p.map((t) => t.id === id ? { ...t, status: "fired" } : t));
    setShowFire(null);
    toast("Ustoz ishdan bo'shatildi", "err");
  }

  function reinstate(id) {
    setTeachers((p) => p.map((t) => t.id === id ? { ...t, status: "active" } : t));
    toast("Ustoz qayta qabul qilindi!");
  }

  const textFields = [
    ["Ism Familiya *", "name", "To'liq ism", "text"],
    ["Username *", "username", "login_nomi", "text"],
    ["Parol *", "password", "••••••", `${showPassword ? "password" : "text"}`],
    ["Telefon", "phone", "9X-XXX-XX-XX", "text"],
    ["Oylik maosh", "pays", "Oylik maosh", "number"],
  ];

  return (
    <div>
      <div className="ph">
        <div className="ph-top">
          <div>
            <div className="ph-title">👨‍🏫 Ustozlar</div>
            <div className="ph-sub">
              {teachers.filter((t) => t.status === "active").length} faol / {teachers.length} jami
            </div>
          </div>
          <button className="btn btn-pri" onClick={openAdd}>➕ Yangi ustoz qabul qilish</button>
        </div>
      </div>

      <div className="card">
        <div className="frow">
          <select className="fs" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Hammasi</option>
            <option value="active">Faol</option>
            <option value="fired">Bo'shatilgan</option>
          </select>
        </div>
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>#</th><th>Ism Familiya</th><th>Fan</th><th>Sinf</th>
                <th>Login</th><th>Tel</th><th>Holat</th><th>Amal</th>
              </tr>
            </thead>
            <tbody>
              {shown.length === 0 ? (
                <tr><td colSpan="8"><div className="empty"><div className="empty-ic">🔍</div>Topilmadi</div></td></tr>
              ) : (
                shown.map((t, i) => (
                  <tr key={t.id}>
                    <td style={{ color: "var(--t4)", fontFamily: "Fira Code" }}>{i + 1}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div className="av av-t" style={{ width: 30, height: 30, borderRadius: 7, fontSize: 11 }}>{ini(t.name)}</div>
                        <strong>{t.name}</strong>
                      </div>
                    </td>
                    <td style={{ color: "var(--t3)" }}>{t.subject}</td>
                    <td><span className="badge b-b">{t.cls}</span></td>
                    <td style={{ fontFamily: "Fira Code", fontSize: 11.5, color: "var(--t3)" }}>{t.username}</td>
                    <td style={{ color: "var(--t3)", fontSize: 12 }}>{t.phone || "—"}</td>
                    <td>
                      <span className={`badge ${t.status === "active" ? "b-g" : "b-r"}`}>
                        {t.status === "active" ? "✅ Faol" : "🚫 Bo'shatilgan"}
                      </span>
                    </td>
                    <td>
                      {t.status === "active" ? (
                        <button className="btn btn-sm btn-rd" onClick={() => setShowFire(t)}>🚫 Bo'shatish</button>
                      ) : (
                        <button className="btn btn-sm btn-gn" onClick={() => reinstate(t.id)}>✅ Qayta qabul</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add modal */}
      {showAdd && (
        <Modal title="➕ Yangi ustoz qabul qilish" sub="Ma'lumotlarni to'ldiring" onClose={() => setShowAdd(false)}>
          {textFields.map(([label, key, placeholder, type]) => (
            <div key={key} className="fl">
              <label>{label}</label>
              <input className="fi" type={type} placeholder={placeholder} value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} />
              {key === "password" && (
                  <button className="changing_password" type="button" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
                  </button>)}
            </div>
          ))}
          <div className="fl">
            <label>Fan *</label>
            <select className="fi" value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}>
              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="fl">
            <label>Mas'ul sinf *</label>
            <select className="fi" value={form.cls} onChange={(e) => setForm((p) => ({ ...p, cls: e.target.value }))}>
              {CLASSES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="fl">
            <label>Ishga kirish sanasi</label>
            <input className="fi fs" type="date" value={form.joinDate}
              onChange={(e) => setForm((p) => ({ ...p, joinDate: e.target.value }))} />
          </div>
          {formErr && <div className="err-box">{formErr}</div>}
          <div className="mrow">
            <button className="btn btn-rd" onClick={() => setShowAdd(false)}>Bekor</button>
            <button className="btn btn-pri" onClick={add}>✅ Qabul qilish</button>
          </div>
        </Modal>
      )}

      {/* Fire modal */}
      {showFire && (
        <Modal title="⚠️ Ishdan bo'shatish" sub={`${showFire.name} ni ishdan bo'shatmoqchimisiz?`} onClose={() => setShowFire(null)}>
          <p style={{ color: "var(--t3)", fontSize: 13 }}>Bu ustoz tizimga kira olmaydi. Keyinchalik qayta qabul qilish mumkin.</p>
          <div className="mrow">
            <button className="btn btn-blue" onClick={() => setShowFire(null)}>Bekor</button>
            <button className="btn btn-rd" onClick={() => fire(showFire.id)}>🚫 Tasdiqlash</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

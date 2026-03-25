import { useState } from "react";
import { TODAY } from "../../constants";
import { uid, ini } from "../../helpers";
import Modal from "../Modal";


const EMPTY_FORM = {
  name: "Admin", username: "", password: "admin123", pays: "", phone: "", joinDate: TODAY,
};

export default function AdminControl({ admins, setAdmins, toast }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showFire, setShowFire] = useState(null);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErr, setFormErr] = useState("");
  const shown = admins.filter((t) => filter === "all" || t.status === filter);
  function openAdd() { setShowAdd(true); setForm(EMPTY_FORM); setFormErr(""); }

  function add() {
    if (form.name.length == 0 || form.username.length == 0 || form.password.length == 0 || form.pays.length == 0 || form.phone.length == 0 ) {
      setFormErr("Majburiy maydonlarni to'ldiring!"); return;
    }
    if (admins.find((t) => t.username === form.username)) {
      setFormErr("Bu username allaqachon band!"); return;
    }
    setAdmins((p) => [...p, { ...form, id: uid(), role: "admin", status: "active" }]);
    setShowAdd(false);
    toast("Yangi admin tayinlandi!");
  }

  function fire(id) {
    setAdmins((p) => p.map((t) => t.id === id ? { ...t, status: "fired" } : t));
    setShowFire(null);
    toast("Adminlik huquqi olib tashlandi", "err");
  }

  function reinstate(id) {
    setAdmins((p) => p.map((t) => t.id === id ? { ...t, status: "active" } : t));
    toast("Adminlik huquqi qayta berildi!");
  }

  const textFields = [
    ["Huquq *", "name"],
    ["Username *", "username", "login_nomi", "text"],
    ["Parol *", "password", "••••••", "password"],
    ["Telefon", "phone", "XX-XXX-XX-XX", "number"],
  ];
  
  return (
    <div>
      <div className="ph">
        <div className="ph-top">
          <div>
            <div className="ph-title">👑 Adminlar</div>
            <div className="ph-sub">
              {admins.filter((t) => t.status === "active").length} faol / {admins.length} jami
            </div>
          </div>
          <button className="btn btn-pri" onClick={openAdd}>➕ Yangi admin tayinlash</button>
        </div>
      </div>

      <div className="card">
        <div className="frow">
          <select className="fs" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Hammasi</option>
            <option value="active">Faol</option>
            <option value="fired">Huquqi olib tashlangan</option>
          </select>
        </div>
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>#</th><th>Huquq</th>
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
                    <td style={{ fontFamily: "Fira Code", fontSize: 11.5, color: "var(--t3)" }}>{t.username}</td>
                    <td style={{ color: "var(--t3)", fontSize: 12 }}>{t.phone || "—"}</td>
                    <td>
                      <span className={`badge ${t.status === "active" ? "b-g" : "b-r"}`}>
                        {t.status === "active" ? "✅ Faol" : "🚫 Huquqsiz"}
                      </span>
                    </td>
                    <td>
                      {t.status === "active" ? (
                        <button className="btn btn-sm btn-rd" onClick={() => setShowFire(t)}>🚫 Huquqni olib tashlash</button>
                      ) : (
                        <button className="btn btn-sm btn-gn" onClick={() => reinstate(t.id)}>✅ Huquqni qayta tiklash</button>
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
        <Modal title="➕ Yangi admin tayinlash" sub="Ma'lumotlarni to'ldiring" onClose={() => setShowAdd(false)}>
          {textFields.map(([label, key, placeholder, type]) => (
            <div key={key} className="fl">
              <label>{label}</label>
              <input className="fi" type={type} placeholder={placeholder} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
          <div className="fl">
            <label>Ishga kirish sanasi</label>
            <input className="fi fs" type="date" value={form.joinDate} onChange={(e) => setForm((p) => ({ ...p, joinDate: e.target.value }))} />
          </div>
          <div className="fl">
            <label>Oylik maosh</label>
            <input className="fi fs" type="number" placeholder={"Oylik maosh"} onChange={(e) => setForm((p) => ({...p, pays: Number(e.target.value)})) } />
          </div>
          {formErr && <div className="err-box">{formErr}</div>}
          <div className="mrow">
            <button className="btn btn-rd" onClick={() => setShowAdd(false)}>Bekor qilish</button>
            <button className="btn btn-pri" onClick={add}>✅ Qabul qilish</button>
          </div>
        </Modal>
      )}

      {/* Fire modal */}
      {showFire && (
        <Modal title="⚠️ Adminlik huquqini olib tashlash" sub={`${showFire.name}lik huquqini olib tashlamoqchimisiz?`} onClose={() => setShowFire(null)}>
          <p style={{ color: "var(--t3)", fontSize: 13 }}>Bu bu admin tizimga kira olmaydi. Keyinchalik huquqni qayta tiklash mumkin.</p>
          <div className="mrow">
            <button className="btn btn-blue" onClick={() => setShowFire(null)}>Bekor</button>
            <button className="btn btn-rd" onClick={() => fire(showFire.id)}>🚫 Tasdiqlash</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

import {useState} from "react";
import {TODAY, CLASSES} from "../../constants";
import {pct, uid, ini, pClass, pColor} from "../../helpers";
import Modal from "../Modal";

const EMPTY_FORM = {
    name: "", username: "", password: "1234", cls: "9A", phone: "", joinDate: TODAY,
};

export default function StudentsPage({students, setStudents, att, toast}) {
    const [showAdd, setShowAdd] = useState(false);
    const [showDel, setShowDel] = useState(null);
    const [showPassword, setShowPassword] = useState(true);
    const [fCls, setFCls] = useState("all");
    const [fSt, setFSt] = useState("all");
    const [form, setForm] = useState(EMPTY_FORM);
    const [formErr, setFormErr] = useState("");

    const shown = students.filter(
        (s) => (fCls === "all" || s.cls === fCls) && (fSt === "all" || s.status === fSt)
    );

    function getStats(id) {
        const records = att.filter((a) => a.studentId === id);
        return {total: records.length, p: pct(records.filter((a) => a.status === "present").length, records.length)};
    }

    function openAdd() {
        setShowAdd(true);
        setForm(EMPTY_FORM);
        setFormErr("");
    }

    function add() {
        if (!form.name.trim() || !form.username.trim() || !form.password.trim()) {
            setFormErr("Majburiy maydonlarni to'ldiring!");
            return;
        }
        if (students.find((s) => s.username === form.username)) {
            setFormErr("Bu username band!");
            return;
        }
        setStudents((p) => [...p, {...form, id: uid(), role: "student", status: "active"}]);
        setShowAdd(false);
        toast("Yangi o'quvchi qo'shildi!");
    }

    function deactivate(id) {
        setStudents((p) => p.map((s) => s.id === id ? {...s, status: "inactive"} : s));
        setShowDel(null);
        toast("O'quvchi o'chirildi", "err");
    }

    function reactivate(id) {
        setStudents((p) => p.map((s) => s.id === id ? {...s, status: "active"} : s));
        toast("O'quvchi qayta faollashtirildi!");
    }

    const textFields = [
        ["Ism Familiya *", "name", "To'liq ism", "text"],
        ["Username *", "username", "login_nomi", "text"],
        ["Parol *", "password", "••••••", `${showPassword ? "password" : "text"}`],
        ["Telefon", "phone", "9X-XXX-XX-XX", "text"],
    ];

    return (
        <div>
            <div className="ph">
                <div className="ph-top">
                    <div>
                        <div className="ph-title">👨‍🎓 O'quvchilar</div>
                        <div className="ph-sub">{students.filter((s) => s.status === "active").length} faol</div>
                    </div>
                    <button className="btn btn-pri" onClick={openAdd}>➕ Yangi o'quvchi qo'shish</button>
                </div>
            </div>

            <div className="card">
                <div className="frow">
                    <select className="fs" value={fCls} onChange={(e) => setFCls(e.target.value)}>
                        <option value="all">Barcha sinflar</option>
                        {CLASSES.filter((c) => students.find((s) => s.cls === c)).map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                    <select className="fs" value={fSt} onChange={(e) => setFSt(e.target.value)}>
                        <option value="all">Barcha holat</option>
                        <option value="active">Faol</option>
                        <option value="inactive">Nofaol</option>
                    </select>
                </div>

                <div className="tw">
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>O'quvchi</th>
                            <th>Sinf</th>
                            <th>Login</th>
                            <th>Davomat</th>
                            <th>Holat</th>
                            <th>Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {shown.length === 0 ? (
                            <tr>
                                <td colSpan="7">
                                    <div className="empty">
                                        <div className="empty-ic">🔍</div>
                                        Topilmadi
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            shown.map((s, i) => {
                                const st = getStats(s.id);
                                return (
                                    <tr key={s.id}>
                                        <td style={{color: "var(--t4)", fontFamily: "Fira Code"}}>{i + 1}</td>
                                        <td>
                                            <div style={{display: "flex", alignItems: "center", gap: 9}}>
                                                <div className="av av-s" style={{
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: 7,
                                                    fontSize: 11
                                                }}>{ini(s.name)}</div>
                                                <div>
                                                    <div style={{fontWeight: 700, fontSize: 13}}>{s.name}</div>
                                                    <div style={{fontSize: 11, color: "var(--t4)"}}>{s.phone}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="badge b-b">{s.cls}</span></td>
                                        <td style={{
                                            fontFamily: "Fira Code",
                                            fontSize: 11.5,
                                            color: "var(--t3)"
                                        }}>{s.username}</td>
                                        <td style={{minWidth: 110}}>
                                            <div style={{display: "flex", alignItems: "center", gap: 7}}>
                                                <div className="pb" style={{flex: 1}}>
                                                    <div className={`pf ${pClass(st.p)}`} style={{width: `${st.p}%`}}/>
                                                </div>
                                                <span style={{
                                                    fontSize: 11,
                                                    fontFamily: "Fira Code",
                                                    fontWeight: 700,
                                                    color: pColor(st.p)
                                                }}>{st.p}%</span>
                                            </div>
                                        </td>
                                        <td>
                        <span className={`badge ${s.status === "active" ? "b-g" : "b-r"}`}>
                          {s.status === "active" ? "✅ Faol" : "🚫 Nofaol"}
                        </span>
                                        </td>
                                        <td>
                                            {s.status === "active" ? (
                                                <button className="btn btn-sm btn-rd" onClick={() => setShowDel(s)}>🗑
                                                    O'chirish</button>
                                            ) : (
                                                <button className="btn btn-sm btn-gn" onClick={() => reactivate(s.id)}>✅
                                                    Faollashtirish</button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add modal */}
            {showAdd && (
                <Modal title="➕ Yangi o'quvchi qo'shish" sub="Ma'lumotlarni to'ldiring"
                       onClose={() => setShowAdd(false)}>
                    {textFields.map(([label, key, placeholder, type]) => (
                        <div key={key} className="fl">
                            <label>{label}</label>
                            <input className="fi" type={type} placeholder={placeholder} value={form[key]}
                                   onChange={(e) => setForm((p) => ({...p, [key]: e.target.value}))}/>              {key === "password" && (
                            <button className="changing_password" type="button" onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
                            </button>)}
                        </div>
                    ))}
                    <div className="fl">
                        <label>Sinfi *</label>
                        <select className="fi" value={form.cls}
                                onChange={(e) => setForm((p) => ({...p, cls: e.target.value}))}>
                            {CLASSES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="fl">
                        <label>Qabul sanasi</label>
                        <input className="fi fs" type="date" value={form.joinDate}
                               onChange={(e) => setForm((p) => ({...p, joinDate: e.target.value}))}/>
                    </div>
                    {formErr && <div className="err-box">{formErr}</div>}
                    <div className="mrow">
                        <button className="btn btn-rd" onClick={() => setShowAdd(false)}>Bekor</button>
                        <button className="btn btn-pri" onClick={add}>✅ Qo'shish</button>
                    </div>
                </Modal>
            )}

            {/* Delete modal */}
            {showDel && (
                <Modal title="⚠️ O'quvchini o'chirish" sub={`${showDel.name} ni o'chirishni tasdiqlaysizmi?`}
                       onClose={() => setShowDel(null)}>
                    <p style={{color: "var(--t3)", fontSize: 13}}>O'quvchi tizimga kira olmaydi. Keyinchalik qayta
                        faollashtirish mumkin.</p>
                    <div className="mrow">
                        <button className="btn btn-blue" onClick={() => setShowDel(null)}>Bekor</button>
                        <button className="btn btn-rd" onClick={() => deactivate(showDel.id)}>🗑 O'chirish</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

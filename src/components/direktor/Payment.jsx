import { useState } from 'react'
import Modal from "../Modal.jsx";
import { ini } from "../../helpers.js";

function Payment({ admins, setAdmins, teachers, setTeachers, toast }) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ pays: "" })
    const [formErr, setFormErr] = useState("");
    const [id, setId] = useState(null);
    const textField = [
        ["Oylik maosh", "pays", "Oylik maosh ", "number"],
    ];
    function NextOpening(){ setShow(true); setFormErr(""); setForm({pays: ""}); }

    const FinishEditing = () => {
        if (form.pays.length === 0){
            setFormErr("Majburiy maydonni to'ldiring"); return;
        }
        setAdmins(admins.map((admin) => admin.id === id && admin.role === "admin" ? {...admin, pays: Number(form.pays)} : admin))
        setTeachers(teachers.map((teacher) => teacher.id === id && teacher.role === "teacher" ? { ...teacher, pays: Number(form.pays)} : teacher))
        NextOpening()
        setShow(false);
        toast("Maosh muvafaqiyatli o'zgartirldi")
    }
    return (
    <div className='payment-container'>
        <div className="ph">
            <div className="ph-top">
                <div className="ph-title">💵 Oylik maoshlar </div>
            </div>
        </div>
        <div className="workers">
            <div className="admins">
                <div className="title">👑 Adminlar</div>
                <div className="ph-sub">
                    {admins.filter((t) => t.status === "active").length}faol / {admins.length} jami
                </div>
                <div className="pays">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Huquq</th>
                                <th>Login</th>
                                <th>Holat</th>
                                <th>Oylik maosh</th>
                                <th>O'zgartirish</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((t, i) => {
                                return (
                                    <tr key={t.id}>
                                        <td style={{ color: "var(--t4)" }}>{i + 1}</td>
                                        <td style={{ fontFamily: "Fira Code" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                                <div className="av av-t" style={{ width: 30, height: 30, borderRadius: 7, fontSize: 11 }}>{ini(t.name)}</div>
                                                <span style={{fontWeight: 500 }}>{t.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ color: "var(--t4)" }}>{t.username}</td>
                                        <td>
                                          <span className={`badge ${t.status === "active" ? "b-g" : "b-r"}`}>
                                              {t.status === "active" ? "✅ Faol" : "🚫 Huquqsiz"}
                                          </span>
                                        </td>
                                        <td>
                                            <div className={t.status === "active" ? "salary-on" : "salary-off"}>
                                                {t.status === "active" ? `Oylik maosh ${t.pays}$` : "Bu admin huquqsiz!"}
                                            </div>
                                        </td>
                                        <td style={{color: "var(--t4)"}} onClick={() => {t.status === "active" && setShow(true)}}>
                                            <div className={t.status === "active" ? "edit" : "un-edit"} onClick={() => setId(admins[i].id)}>
                                                {t.status === "active" ? "Maoshni o'zgartirish" : "Maoshni o'zgartirish imkonsiz"}<i className="fa-regular fa-pen-to-square"></i>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className={"Editing"}>
                        {show && (
                            <Modal title={"Maoshlarni o'zgartirish"} sub={"Malumotlarni to'ldiring"} onClose={() => setShow((false))}>
                                {textField.map(([label, key, placeholder, type]) => {
                                    return(
                                        <div key={key} className="fl">
                                            <label htmlFor="">{label}</label>
                                            <input className="fi" type={type} placeholder={placeholder} onChange={(e) => setForm((p) => ({...p, [key]: e.target.value}))}/>
                                        </div>
                                    )
                                })}
                                {formErr && <div className="err-box">{formErr}</div>}
                                <div className="mrow">
                                    <button className="btn btn-rd" onClick={() => setShow(false)}>Bekor qilish</button>
                                    <button className="btn btn-pri" onClick={FinishEditing}>✅ O'zgartirish</button>
                                </div>
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="teachers">
                <div className="title">👨‍🏫 Ustozlar</div>
                <div className="ph-sub">
                    {teachers.filter((t) => t.status === "active").length}faol / {teachers.length}jami
                </div>
                <div className="pays">
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Huquq</th>
                            <th>Login</th>
                            <th>Holat</th>
                            <th>Oylik maosh</th>
                            <th>O'zgartirish</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teachers.map((t, i) => {
                            return (
                                <tr key={t.id}>
                                    <td style={{ color: "var(--t4)" }}>{i + 1}</td>
                                    <td style={{ fontFamily: "Fira Code" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                            <div className="av av-t" style={{ width: 30, height: 30, borderRadius: 7, fontSize: 11 }}>{ini(t.name)}</div>
                                            <span style={{fontWeight: 500 }}>{t.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ color: "var(--t4)" }}>{t.username}</td>
                                    <td>
                                          <span className={`badge ${t.status === "active" ? "b-g" : "b-r"}`}>
                                              {t.status === "active" ? "✅ Faol" : "🚫 Ishdan bo'shatilgan"}
                                          </span>
                                    </td>
                                    <td>
                                        <div className={t.status === "active" ? "salary-on" : "salary-off"}>
                                            {t.status === "active" ? `Oylik maosh ${t.pays}$` : "Bu ustoz ishdan bo'shatilgan!"}
                                        </div>
                                    </td>
                                    <td style={{color: "var(--t4)"}} onClick={() => {t.status === "active" && setShow(true)}}>
                                        <div className={t.status === "active" ? "edit" : "un-edit"} onClick={() => setId(teachers[i].id)}>
                                            {t.status === "active" ? "Maoshni o'zgartirish" : "Maoshni o'zgartirish imkonsiz"}<i className="fa-regular fa-pen-to-square"></i>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <div className={"Editing"}>
                        {show && (
                            <Modal title={"Maoshlarni o'zgartirish"} sub={"Malumotlarni to'ldiring"} onClose={() => setShow((false))}>
                                {textField.map(([label, key, placeholder, type]) => {
                                    return(
                                        <div key={key} className="fl">
                                            <label htmlFor="">{label}</label>
                                            <input className="fi" type={type} placeholder={placeholder} onChange={(e) => setForm((p) => ({...p, [key]: e.target.value}))}/>
                                        </div>
                                    )
                                })}
                                {formErr && <div className="err-box">{formErr}</div>}
                                <div className="mrow">
                                    <button className="btn btn-rd" onClick={() => setShow(false)}>Bekor qilish</button>
                                    <button className="btn btn-pri" onClick={FinishEditing}>✅ O'zgartirish</button>
                                </div>
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment

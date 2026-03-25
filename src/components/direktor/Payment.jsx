import { useState } from 'react'
import {ini, uid} from "../../helpers.js";
import Modal from "../Modal.jsx";

function Payment({ admins, setAdmins, teachers, setTeachers, toast }) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({username: "", pays: ""})
    const [formErr, setFormErr] = useState("");
    const textFields = [
        ["Username *", "username", "login_nomi", "text"],
        ["Oylik maosh", "pays", "Oylik maosh ", "number"],
    ];
    function NextOpening(){ setShow(true); setFormErr(""); setForm({username: "", pays: ""}); }
    const FinishEditing = () => {
        if (form.username.length == 0 || form.pays.length == 0){
            setFormErr("Majburiy maydonlarni to'ldiring"); return;
        }
        if (admins.find((admin) => admin.username === form.username)){
            setFormErr("Bu username allaqachon band"); return;
        }
        setAdmins((p) => [...p, { ...form, id: uid(), role: "admin", status: "active" }]);
        setTeachers((p) => [...p, { ...form, id: uid(), role: "teacher", status: "active" }]);
        toast("Maoshlar o'zgartirildi")
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
                                        <td style={{color: "var(--t4)"}} onClick={() => {setShow(true)}}>
                                            <div className={"edit"} onClick={NextOpening}>
                                                Maoshlarni o'zgartirish <i className="fa-regular fa-pen-to-square"></i>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className={"Editing"}>
                        {show && (
                            <Modal title={"Maoshlarni o'zgartirish"} sub={"Malumotlarni to'ldiring"} children={''} onClose={() => onclick(setShow((false)))}>
                                {textFields.map(([label, key, placeholder, type]) => {
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
            <div className="teachers">
                <div className="title">👨‍🏫 Ustozlar</div>
                <div className="ph-sub">
                    {teachers.filter((t) => t.status === "active").length}faol / {teachers.length}jami
                </div>
                <div className="pays"></div>
            </div>
        </div>
    </div>
  )
}

export default Payment

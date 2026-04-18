import {useState} from "react";
import {CLASSES, TODAY} from "../constants.js";
import {uid} from "../helpers.js";

const EMPTY_FORM_STUDENTS = {
    name: "", username: "", password: "", cls: "", phone: "", joinDate: TODAY,
}

export default function Registar({ setStudents, students, admins, teachers, direktor, setPath }) {
    const [form, setForm] = useState(EMPTY_FORM_STUDENTS)
    const [err, setErr] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [checkPassword, setCheckPassword] = useState({text: "", width: 0});

    function registar(e) {
        e.preventDefault();

        if (form.username.trim() === "" || form.password.trim() === "" || form.cls.trim() === "") {
            setErr("Majburiy mayadonlarni to'ldiring"); return;
        }
        if (checkPassword.text === "Zaif parol" || checkPassword.text === "O'rtacha parol"){
            setErr("Kuchliroq parol o'ylab toping"); return;
        }
        if (students.find((s) => s.username === form.username) || admins.find((s) => s.username === form.username) || teachers.find((s) => s.username === form.username) || direktor.username === form.username) {
            setErr("Bu username allaqachon mavjud"); return;
        }
        setStudents((p) => [...p,{...form, role: "student", id: uid(), status: "active"}]);
        tozalash()
    }
    const CheckingPassword = (value) => {
        const length = value.trim().length;
        if (length === 0){
            setCheckPassword((p) => ({...p, text: "", width: 0}))
        } else if (length <= 3) {
            setCheckPassword(p => ({ ...p, text: "Zaif parol", width: 25 }));
        } else if (length <= 8) {
            setCheckPassword(p => ({ ...p, text: "O'rtacha parol", width: 66 }));
        } else {
            setCheckPassword(p => ({ ...p, text: "Kuchli parol", width: 100 }));
        }
    };
    const tozalash = () => {
        setForm(EMPTY_FORM_STUDENTS);
        setErr("")
        setPath("login")
    }
    return (
        <div className="lw">
            <div className="lw-orb lw-orb1" />
            <div className="lw-orb lw-orb2" />

            <div className="lc">
                <div className="lc-logo">🎓</div>
                <h1>EduTrack</h1>
                <div className="lc-sub">Maktab boshqaruv tizimi</div>
                {/* Registar form */}
                <form onSubmit={registar}>
                    <div className="fl">
                        <label>Ism va Familiya</label>
                        <input
                            className="fi"
                            placeholder="Ism va familiya"
                            onChange={e => setForm((p) => ({...p, name: e.target.value}))}
                        />
                    </div>
                    <div className="fl">
                        <label>Login</label>
                        <input
                            className="fi"
                            placeholder="username"
                            autoComplete="off"
                            onChange={e => setForm((p) => ({...p, username: e.target.value}))}
                        />
                    </div>
                    <div className="fl">
                        <label>Parol</label>
                        <input
                            className="fi"
                            placeholder="••••••••"
                            type={showPassword ? "password" : "text"}
                            onChange={e => {
                                setForm((p) => ({...p, password: e.target.value}));
                                CheckingPassword(e.target.value)
                            }}
                        />
                        <button className="changing_password" type="button" onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
                        </button>
                    </div>
                    {checkPassword && (
                        <div className={`Checking_password ${checkPassword.width === 0 && "hidden"}`}>
                            <p>{checkPassword.text}</p>
                            <div className="p_check">
                                <div className={`p_check_in ${checkPassword.width === 25 && "red" || checkPassword.width === 66 && "orange" || checkPassword.width === 100 && "green"}`} style={{width: `${checkPassword.width}%`}}></div>
                            </div>
                        </div>)}
                    <div className="fl">
                        <label>Sinf</label>
                        <select name="" id="" className="fi" onChange={(e) => setForm((p) => ({...p, cls: e.target.value}))}>
                            <option value="">Sinfni tanlang</option>
                            {teachers.map((t) => <option key={t.id} value={t.cls}>{t.cls}</option>)}
                        </select>
                    </div>
                    <button className="btn-go" type="submit">
                        Ro'yhatdan o'tish →
                    </button>
                    {err && <div className="err-box">{err}</div>}
                </form>
                <div className="auth">Saytga kirmoqchimisiz? <span className="both_login" onClick={() => setPath("login")}>Kirish</span></div>
            </div>
        </div>
    );
}

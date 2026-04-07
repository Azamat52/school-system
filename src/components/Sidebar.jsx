import {ini} from "../helpers";
import Modal from "./Modal.jsx";
import {useState} from "react";
import {DIREKTOR, TODAY} from "../constants.js";

const NAV_CONFIG = {
    direktor: [
        {
            sec: "Boshqaruv",
            items: [
                {id: "dash", ic: "🛂", lb: "Adminlar Nazorati"},
                {id: "payment", ic: "💵", lb: "Oylik Maoshlar"},
            ],
        },
    ],
    admin: [
        {
            sec: "Asosiy",
            items: [
                {id: "dash", ic: "📊", lb: "Dashboard"},
                {id: "att", ic: "📋", lb: "Davomat jurnali"},
                {id: "rep", ic: "📈", lb: "Hisobotlar"},
            ],
        },
        {
            sec: "Boshqaruv",
            items: [
                {id: "teachers", ic: "👨‍🏫", lb: "Ustozlar"},
                {id: "students", ic: "👨‍🎓", lb: "O'quvchilar"},
            ],
        },
    ],
    teacher: [
        {
            sec: "Menyu",
            items: [
                {id: "dash", ic: "📊", lb: "Dashboard"},
                {id: "mark", ic: "✅", lb: "Davomat olish"},
                {id: "myclass", ic: "📋", lb: "Mening sinfim"},
            ],
        },
    ],
    student: [
        {
            sec: "Menyu",
            items: [
                {id: "dash", ic: "🏠", lb: "Bosh sahifa"},
                {id: "myatt", ic: "📋", lb: "Mening davomatim"},
            ],
        },
    ],
};

const AV_CLASS = {admin: "av-a", teacher: "av-t", student: "av-s", direktor: 'av-d'};
const ROLE_LABEL = {
    direktor: "🧓 Direktor",
    admin: "👑 Admin",
    teacher: (u) => `👨‍🏫 ${u.cls}`,
    student: (u) => `👨‍🎓 ${u.cls}`,
};

export default function Sidebar({user, page, setPage, toast, onLogout, theme, onToggleTheme, admins, teachers, students, setComplains, complains }) {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [value, setValue] = useState("");
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [tab, setTab] = useState("admin");
    const [formErr, setFormErr] = useState("");
    const [index, setIndex] = useState("");
    const sections = NAV_CONFIG[user.role] || [];
    const roleTag =
        typeof ROLE_LABEL[user.role] === "function"
            ? ROLE_LABEL[user.role](user)
            : ROLE_LABEL[user.role];
    const ComplainTabs = [
        ["admin", "👑", "Admin"],
        ["teacher", "👨‍🏫", "Ustoz"],
        ["student", "👨‍🎓", "O'quvchi"]
    ]
    const TabSwitcher = (tab) => {
        if(tab === "admin"){
            return admins.filter((a) => a.status === "active")
        }
        if(tab === "teacher"){
            return teachers.filter((t) => t.status === "active")
        }
        if(tab === "student"){
            return students.filter((s) => s.status === "active")
        }
    }
    const quickList = TabSwitcher(tab);
    const roles = user.role === "admin" || user.role === "teacher" || user.role === "student"
    const checked_complains = complains.filter((c) => c.id === user.id);
    const isLight = theme === "light";

    const GetValues = (e) => {
        e.preventDefault();
        if (value.length === 0) {
            setFormErr("Shikoyatni to'ldiring"); return;
        }
         if (name === "" && id === "") {
            setFormErr("Foydalanuvchi topilmadi"); return;
        }
        const newComplain = {
            value: value,
            name: name,
            id: id,
            date: TODAY
        }
        const CatchComplain = () => {
            setComplains((prev) => {
                return [...prev, newComplain]
            })
        }
        CatchComplain(newComplain)
        setShow(false)
        toast("Shikoyat yuborildi")
    }
    const NextOpening = () => { setFormErr(""); setShow(true); setName(""); setId(""); setValue(""); setIndex(""); setTab(null); }
    const NextOpening_2 = () => { setFormErr(""); setShow2(true); }
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
                            <div key={it.id} className={`ni${page === it.id ? " on" : ""}`} onClick={() => setPage(it.id)}>
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
                    {roles && (
                        <div className="natifications" onClick={NextOpening_2} style={{display: checked_complains.length > 0 ? null : "none" }}>🔔
                            <p className="checking-complain">{checked_complains.length}</p>
                        </div>)}
                    {show2 && (
                    <Modal title={"Sizga kelgan shikoyatlar"} sub={"Shikoyat"} onClose={() => setShow2(false)}>
                        <p>{DIREKTOR.name} dan</p>
                        {
                            checked_complains.map((c) => {
                                return (
                                    <div className="completed_complain date_parent" key={c.id}><i className="fa-solid fa-circle-exclamation"></i> {c.value}
                                        <div className={"date"}>{c.date}</div>
                                    </div>
                                )
                            })
                        }
                     </Modal>)}
                </div>
                {user.role === "direktor" && <div className="complain" onClick={NextOpening}>⚠️Shikoyat qilish</div>}
                {show && (
                        <Modal title={name === "Admin" ? `${index + 1}-${name} ga shikoyat qilish` : name ? `${name} ga shikoyat qilish` : "Foydalanuvchiga shikoyat qilish"} sub={"Shikoyat"} onClose={() => setShow(false)}>
                            <div className="rtabs">
                                {ComplainTabs.map((([id, ic, lb]) => {
                                    return (
                                        <button key={id} className={`rt${tab === id ? " on" : ""}`} onClick={() => { setTab(tab === id ? null : id); }}>{ic} {lb} <i className={`fa-solid fa-angle-right ${tab === id ? "transform" : "" }`}></i>
                                            {/* User hints */}
                                            {tab === id && (
                                                <div className={`hints divs`}>
                                                    <h3>Kimga shikoyat yuborasiz?</h3>
                                                    {quickList.map((x, i) => (
                                                        <div key={x.id} className="fi name" onClick={() => {setName(x.name); setId(x.id); setIndex(i); }}>
                                                            {i + 1} - {x.name} ({x.role})
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </button>
                                    )
                                }))}
                            </div>
                            <form className="fl" onSubmit={GetValues}>
                                <textarea name="" id="" style={{width: "100%", height: "20vh", marginBottom: "20px"}} className="fi" placeholder={"Shikoyatingizni yozing"} onChange={(e) => setValue(e.target.value)}></textarea>
                                {formErr && <div className="err-box">{formErr}</div>}
                                <button className="btn btn-rd" onClick={() => setShow(false)} style={{marginTop: "20px"}}>Bekor qilish</button>
                                <button className="btn btn-rd" type={"reset"} style={{marginLeft: "10px"}} onClick={() => setValue("")} >Tozalash</button>
                                <button className="btn btn-pri" style={{marginLeft: "10px"}} type={"submit"}>Yuborish</button>
                            </form>
                        </Modal>
                )}

                {/* Theme toggle */}
                <button className="theme-toggle" onClick={onToggleTheme}>
                  <span className="theme-toggle-label">
                      {isLight ? "☀️" : "🌙"}
                      <span>{isLight ? "Light mode" : "Dark mode"}</span>
                  </span>
                    <div className={`toggle-pill${isLight ? " on" : ""}`}>
                        <div className="toggle-thumb"/>
                    </div>
                </button>

                {/* Logout */}
                <button className="btn-out" onClick={onLogout}>🚪 Chiqish</button>
            </div>
        </div>
    //
    );
}

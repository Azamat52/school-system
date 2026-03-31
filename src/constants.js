export const TODAY = new Date().toISOString().split("T")[0];

export const SUBJECTS = [
  "Matematika", "Ingliz tili", "Fizika", "Kimyo", "Biologiya",
  "Tarix", "Adabiyot", "Ona tili", "Informatika", "Chizmachilik",
];

export const CLASSES = [
  "7A", "7B", "8A", "8B", "9A", "9B", "10A", "10B", "11A", "11B",
];

export const DIREKTOR = {
  id: 1000,
  username: "direktor",
  password: "direktor123",
  role: "direktor",
  name: "Direktor",
}

export const INITIAL_ADMINS = [
  { id: 1, username: "admin1", password: "admin123", role: "admin", name: "Admin", status: "active", pays: 440, phone: "97-123-45-67", joinDate: "2022-09-01" },
  { id: 2, username: "admin2", password: "admin123", role: "admin", name: "Admin", status: "active", pays: 480, phone: "93-323-54-96", joinDate: "2022-09-01" },
  { id: 3, username: "admin3", password: "admin123", role: "admin", name: "Admin", status: "active", pays: 410, phone: "94-193-85-24", joinDate: "2022-09-01" },
  { id: 4, username: "admin4", password: "admin123", role: "admin", name: "Admin", status: "active", pays: 400, phone: "99-312-13-84", joinDate: "2022-09-01" },
]

export const INITIAL_TEACHERS = [
  { id: 10, username: "ustoz1", password: "ustoz123", role: "teacher", name: "Alisher Karimov", subject: "Matematika", cls: "9A", phone: "90-123-45-67", pays: 450, status: "active", joinDate: "2022-09-01" },
  { id: 11, username: "ustoz2", password: "ustoz123", role: "teacher", name: "Malika Yusupova", subject: "Ingliz tili", cls: "8B", phone: "91-234-56-78", pays: 490, status: "active", joinDate: "2021-09-01" },
  { id: 12, username: "ustoz3", password: "ustoz123", role: "teacher", name: "Bobur Toshmatov", subject: "Fizika", cls: "10A", phone: "93-345-67-89", pays: 370, status: "active", joinDate: "2023-02-01" },
];

export const INITIAL_STUDENTS = [
  { id: 101, username: "jasur", password: "1234", role: "student", name: "Jasur Nazarov", cls: "9A", phone: "99-111-22-33", status: "active", joinDate: "2023-09-01" },
  { id: 102, username: "nilufar", password: "1234", role: "student", name: "Nilufar Rashidova", cls: "9A", phone: "90-222-33-44", status: "active", joinDate: "2023-09-01" },
  { id: 103, username: "otabek", password: "1234", role: "student", name: "Otabek Mirzayev", cls: "9A", phone: "91-333-44-55", status: "active", joinDate: "2023-09-01" },
  { id: 104, username: "dilnoza", password: "1234", role: "student", name: "Dilnoza Xasanova", cls: "9A", phone: "93-444-55-66", status: "active", joinDate: "2023-09-01" },
  { id: 105, username: "sardor", password: "1234", role: "student", name: "Sardor Tursunov", cls: "9A", phone: "94-555-66-77", status: "active", joinDate: "2023-09-01" },
  { id: 106, username: "zulfiya", password: "1234", role: "student", name: "Zulfiya Karimova", cls: "9A", phone: "95-666-77-88", status: "active", joinDate: "2023-09-01" },
  { id: 107, username: "asilbek", password: "1234", role: "student", name: "Asilbek Qodirov", cls: "8B", phone: "97-777-88-99", status: "active", joinDate: "2023-09-01" },
  { id: 108, username: "mohira", password: "1234", role: "student", name: "Mohira Sultanova", cls: "8B", phone: "99-888-99-00", status: "active", joinDate: "2023-09-01" },
  { id: 109, username: "firdavs", password: "1234", role: "student", name: "Firdavs Ergashev", cls: "8B", phone: "90-999-00-11", status: "active", joinDate: "2023-09-01" },
  { id: 110, username: "kamola", password: "1234", role: "student", name: "Kamola Yodgorova", cls: "8B", phone: "91-000-11-22", status: "active", joinDate: "2023-09-01" },
  { id: 111, username: "sherzod", password: "1234", role: "student", name: "Sherzod Normatov", cls: "10A", phone: "93-111-22-33", status: "active", joinDate: "2022-09-01" },
  { id: 112, username: "feruza", password: "1234", role: "student", name: "Feruza Abdullayeva", cls: "10A", phone: "94-222-33-44", status: "active", joinDate: "2022-09-01" },
  { id: 113, username: "ulugbek", password: "1234", role: "student", name: "Ulugbek Xolmatov", cls: "10A", phone: "95-333-44-55", status: "active", joinDate: "2022-09-01" },
  { id: 114, username: "barno", password: "1234", role: "student", name: "Barno Ismoilova", cls: "10A", phone: "97-444-55-66", status: "active", joinDate: "2022-09-01" },
];

export const INITIAL_ATTENDANCE = [
  { id: "a1", studentId: 101, date: TODAY, subject: "Matematika", status: "present", teacherId: 10 },
  { id: "a2", studentId: 102, date: TODAY, subject: "Matematika", status: "absent", teacherId: 10 },
  { id: "a3", studentId: 103, date: TODAY, subject: "Matematika", status: "late", teacherId: 10 },
  { id: "a4", studentId: 104, date: TODAY, subject: "Matematika", status: "present", teacherId: 10 },
  { id: "a5", studentId: 105, date: TODAY, subject: "Matematika", status: "present", teacherId: 10 },
  { id: "a6", studentId: 106, date: TODAY, subject: "Matematika", status: "absent", teacherId: 10 },
];

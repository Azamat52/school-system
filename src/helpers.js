export function pct(a, b) {
  return b ? Math.round((a / b) * 100) : 0;
}

export function uid() {
  return Date.now() + Math.random().toString(36).slice(2, 7);
}

export function ini(name) {
  return  name
      .split("")
      .map((w) => w[0])
      .join("")
      .slice(0, 1)
      .toUpperCase();
}

export function stBadge(status) {
  return status === "present" ? "b-g" : status === "absent" ? "b-r" : "b-y";
}

export function stLabel(status) {
  return status === "present"
    ? "✅ Keldi"
    : status === "absent"
    ? "❌ Kelmadi"
    : "⏰ Kech";
}

export function pClass(p) {
  return p > 75 ? "pg" : p > 50 ? "pb2" : "pr";
}

export function pColor(p) {
  return p > 75 ? "var(--a3)" : p > 50 ? "var(--a1)" : "var(--r1)";
}

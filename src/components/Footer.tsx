export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm py-6">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <span>© {new Date().getFullYear()} Eric Savoy. Tous droits réservés.</span>
        <span>Québec, Canada</span>
      </div>
    </footer>
  );
}

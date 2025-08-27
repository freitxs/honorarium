export default function Footer() {
  return (
    <footer className="mt-16 border-t border-default/50">
      <div className="container py-8 text-sm text-muted flex items-center justify-between">
        <p>© {new Date().getFullYear()} Honorarium. Todos os direitos reservados.</p>
        <p>Feito com ❤ para contadores.</p>
      </div>
    </footer>
  );
}

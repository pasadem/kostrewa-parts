export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col items-center gap-2">
        <div>
          <span className="font-semibold">Телефон: </span>
          <a href="tel:+38 050 130 5398" className="hover:underline">+38 050 130 5398</a>
        </div>
        <div>
          <span className="font-semibold">Пошта: </span>
          <a href="mailto:info@example.com" className="hover:underline">info@example.com</a>
        </div>
        <div className="text-xs text-gray-400 mt-2">&copy; {new Date().getFullYear()} Всі права захищені</div>
      </div>
    </footer>
  );
}

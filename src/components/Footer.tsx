// Simple footer component displaying copyright information and a small
// acknowledgement.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {year} Your Name. All rights reserved.</p>
    </footer>
  );
}
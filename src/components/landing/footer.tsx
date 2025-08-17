export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-center py-6 md:h-16 md:flex-row md:py-0">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          <p>&copy; {new Date().getFullYear()} BloodBank Landing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

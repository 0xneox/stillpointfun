export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="The Still Point"
      className={className}
    />
  );
}

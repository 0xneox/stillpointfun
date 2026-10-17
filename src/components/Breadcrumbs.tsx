import { Link } from "@tanstack/react-router";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase opacity-60">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="opacity-30">/</span>}
            {item.to ? (
              <Link
                to={item.to}
                className="hover:opacity-100 hover:text-accent transition-all link-underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="opacity-100">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

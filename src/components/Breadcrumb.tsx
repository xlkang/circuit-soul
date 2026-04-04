"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if not provided
  const breadcrumbs: BreadcrumbItem[] = items ?? buildBreadcrumbs(pathname);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
      <ol className="flex items-center gap-2 text-xs md:text-sm text-[var(--accent)]/50 flex-wrap">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <span className="opacity-40" aria-hidden="true">/</span>
              )}
              {isLast ? (
                <span className="text-[var(--accent)]/80" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: BreadcrumbItem[] = [{ label: "首页", href: "/" }];

  let path = "";
  for (const segment of segments) {
    path += `/${segment}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    crumbs.push({ label, href: path });
  }

  return crumbs;
}

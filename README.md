# DNRE Goa — Integrated Web Portal (Prototype)

Next.js prototype for the **Department of New and Renewable Energy, Government of Goa** —
covering both the public-facing **website** and an authenticated **citizen portal** for
scheme management and subsidy processing.

This is a UI-complete prototype with **mock data** and a **stubbed auth** (role switcher),
scaffolded against the Expression of Interest (EOI) scope.

---

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **TypeScript**, **Tailwind CSS**, shadcn-style components (Radix primitives)
- **lucide-react** for icons
- Mock data in `src/lib/mock-data.ts`; auth stub via cookies in `src/lib/auth.ts`

---

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve production build
```

---

## Sitemap

### Public website (route group `(site)`)
| Route | Description |
|---|---|
| `/` | Home — hero, stats, flagship schemes, notifications, how-to-apply, CTA |
| `/about` | Department mandate, functions, mission / vision |
| `/schemes` | Catalog of all subsidy schemes (filter by category) |
| `/schemes/[slug]` | Scheme detail — eligibility, documents, process, apply CTA |
| `/notifications` | Circulars, tenders, press releases, notifications |
| `/faqs` | FAQ by category |
| `/contact` | Contact form + office details |

### Portal (`/portal`)
| Route | Role | Description |
|---|---|---|
| `/portal` | — | Login page + demo role switcher (applicant / officer / admin) |
| `/portal/dashboard` | all | Role-aware dashboard (stats, queues, scheme performance) |
| `/portal/applications` | all | Applications list (scoped to user for applicant) |
| `/portal/applications/new` | applicant | 5-step application wizard |
| `/portal/applications/[id]` | all | Application detail + workflow timeline + documents |
| `/portal/review` | officer | Review queue with tabs (to-verify / scrutiny / decided) |
| `/portal/review/[id]` | officer | Document verification + officer decision |
| `/portal/sanctions` | applicant / admin | Sanction orders & disbursement status |
| `/portal/admin/schemes` | admin | Scheme administration |
| `/portal/admin/users` | admin | User management (applicants / officers / admins) |
| `/portal/admin/reports` | admin | MIS dashboards & downloadable reports |
| `/portal/admin/settings` | admin | Integrations (PFMS, SMS, eSign…), security, dept details |

---

## Demo flow

1. Open **/** — browse the website, open a scheme, click **Apply Now**.
2. On `/portal`, pick a role in **Demo quick role switcher** (right column).
3. **Applicant** — view dashboard → `New application` to walk the 5-step wizard.
4. **Officer** — `Review queue` → open any application → tick documents → recommend approval.
5. **Admin** — see MIS in `Dashboard` and `MIS & Reports`; explore scheme & user management.

Role is persisted in `dnre_role` + `dnre_user_id` cookies. Sign out from the portal topbar.

---

## Scope coverage (EOI § 3)

| EOI scope | Where it lives |
|---|---|
| 3.1 Departmental Portal | `src/app/(site)/**` — home, about, schemes, notifications, FAQs, contact |
| 3.2 Subsidy Scheme Management | `src/app/portal/(authed)/applications/**` + `review/**` + `sanctions/**` |
| 3.3 User Management | `src/app/portal/(authed)/admin/users` + role-based navigation via `PortalSidebar` |
| 3.4 Integration (stubbed) | `src/app/portal/(authed)/admin/settings` — PFMS/DBT, SMS, eSign, DigiLocker |
| 3.5 MIS & Reporting | `src/app/portal/(authed)/admin/reports` + admin dashboard |
| 3.6 Security & Compliance | Session timeout, audit retention, CERT-In state in settings; GIGW-aware UI (skip-to-main, text-size, accessible components) |

---

## Next steps to productionize

- Replace cookie auth with **NextAuth** (+ Aadhaar eKYC / DigiLocker SSO)
- Back mock data with **Postgres + Prisma** (schemes, users, applications, workflow events, documents, sanctions)
- Wire real **PFMS / DBT** disbursement bridge and **SMS / Email** providers
- Implement **document upload to S3** with virus scanning and verification workflow
- Add **eSign (NSDL)** for sanction orders; audit trail persisted to an append-only log
- **GIGW compliance**: WCAG audit, bilingual (EN/Konkani/Marathi) content, Unicode, W3C
- **Security audit** by CERT-In empanelled agency before go-live

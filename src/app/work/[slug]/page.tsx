import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyPreview } from "@/components/projects/CaseStudyPreview";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, creativeWorkSchema, jsonLd } from "@/lib/seo";
import { ORDERED_PROJECTS, getProject, projectNumber } from "@/data/projects";
import { SITE } from "@/data/site";

type PageProps = { params: Promise<{ slug: string }> };

/** Projects are known at build time, so anything else is a genuine 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return ORDERED_PROJECTS.filter((project) => project.caseStudy).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} — ${project.title} Case Study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} — ${SITE.name}`,
      description: project.summary,
      url: `${SITE.url}/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections = [
    { title: "Overview", body: project.description },
    { title: "The challenge", body: project.challenge },
    { title: "Our solution", body: project.solution },
    { title: "Design direction", body: project.designNotes },
    { title: "Responsive experience", body: project.responsiveNotes },
  ].filter((section): section is { title: string; body: string } => Boolean(section.body));

  const others = ORDERED_PROJECTS.filter(
    (item) => item.slug !== project.slug && item.caseStudy,
  ).slice(0, 2);

  return (
    <>
      <JsonLd
        data={jsonLd(
          creativeWorkSchema(project),
          breadcrumbSchema([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Work", url: `${SITE.url}/work` },
            { name: project.name, url: `${SITE.url}/work/${project.slug}` },
          ]),
        )}
      />

      {/* Hero */}
      <Section tone="dark" spacing="none" className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_25%_0%,#02167F_0%,transparent_60%)]"
          aria-hidden="true"
        />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[12.5px] text-white/45">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/work" className="transition-colors hover:text-gold">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/75">{project.name}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[13px] text-white/35">{projectNumber(project)}</span>
            <span className="rounded-full bg-gold px-3 py-1.5 text-[10.5px] font-bold tracking-[0.12em] text-ink uppercase">
              {project.discipline}
            </span>
            {project.industry ? (
              <span className="text-[13px] text-white/55">{project.industry}</span>
            ) : null}
          </div>

          <h1 className="display-2 mt-6 text-white uppercase">{project.name}</h1>
          <p className="mt-3 font-display text-lg font-semibold text-gold sm:text-xl">
            {project.title}
          </p>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-lg">
            {project.summary}
          </p>

          {project.liveUrl ? (
            <div className="mt-9">
              <ButtonLink href={project.liveUrl} external variant="gold" size="lg" icon="globe">
                Visit live website
              </ButtonLink>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* Preview */}
      <Section tone="light" spacing="sm">
        <Container>
          <CaseStudyPreview project={project} />
        </Container>
      </Section>

      {/* Body */}
      <Section tone="light" spacing="md">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
            <div className="space-y-12">
              {sections.map((section) => (
                <Reveal key={section.title}>
                  <h2 className="font-display text-[13px] font-bold tracking-[0.16em] text-navy uppercase">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-[15.5px] leading-relaxed whitespace-pre-line text-ink/70">
                    {section.body}
                  </p>
                </Reveal>
              ))}

              {project.features.length > 0 ? (
                <Reveal>
                  <h2 className="font-display text-[13px] font-bold tracking-[0.16em] text-navy uppercase">
                    Key features
                  </h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 rounded-xl border border-line bg-mist p-3.5"
                      >
                        <Icon name="check" size={14} className="mt-0.5 shrink-0 text-navy" />
                        <span className="text-[14px] text-ink/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {project.results && project.results.length > 0 ? (
                <Reveal>
                  <h2 className="font-display text-[13px] font-bold tracking-[0.16em] text-navy uppercase">
                    Results
                  </h2>
                  <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                    {project.results.map((result) => (
                      <div key={result.label} className="rounded-xl bg-navy p-5 text-white">
                        <dt className="text-[11px] font-bold tracking-[0.12em] text-white/45 uppercase">
                          {result.label}
                        </dt>
                        <dd className="mt-2 font-display text-2xl font-extrabold text-gold">
                          {result.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ) : null}

            </div>

            {/* Meta rail */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-line bg-mist p-6 sm:p-7">
                <dl className="space-y-5">
                  <div>
                    <dt className="text-[11px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                      Project
                    </dt>
                    <dd className="mt-1.5 text-[14.5px] font-semibold text-ink">{project.name}</dd>
                  </div>
                  {project.client ? (
                    <div>
                      <dt className="text-[11px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                        Client
                      </dt>
                      <dd className="mt-1.5 text-[14.5px] text-ink/70">{project.client}</dd>
                    </div>
                  ) : null}
                  {project.industry ? (
                    <div>
                      <dt className="text-[11px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                        Industry
                      </dt>
                      <dd className="mt-1.5 text-[14.5px] text-ink/70">{project.industry}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="text-[11px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                      Category
                    </dt>
                    <dd className="mt-1.5 text-[14.5px] text-ink/70">{project.discipline}</dd>
                  </div>
                  {project.technologies.length > 0 ? (
                    <div>
                      <dt className="text-[11px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                        Technology
                      </dt>
                      <dd className="mt-2.5 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </dd>
                    </div>
                  ) : null}
                  {project.liveUrl ? (
                    <div>
                      <dt className="text-[11px] font-bold tracking-[0.14em] text-ink/40 uppercase">
                        Live website
                      </dt>
                      <dd className="mt-1.5">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[14px] font-semibold break-all text-navy hover:text-navy-600"
                        >
                          {project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                          <Icon name="arrow-up-right" size={14} className="shrink-0" />
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Related */}
      {others.length > 0 ? (
        <Section tone="mist" spacing="sm">
          <Container>
            <h2 className="font-display text-[13px] font-bold tracking-[0.16em] text-ink/45 uppercase">
              More work
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-navy/25"
                >
                  <span>
                    <span className="block text-[11px] font-bold tracking-[0.12em] text-navy uppercase">
                      {item.discipline}
                    </span>
                    <span className="mt-2 block font-display text-xl font-extrabold text-ink">
                      {item.name}
                    </span>
                  </span>
                  <Icon
                    name="arrow-right"
                    size={20}
                    className="shrink-0 text-ink/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-navy"
                  />
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* CTA */}
      <Section tone="navy" spacing="md">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(255,208,20,0.14)_0%,transparent_60%)]"
          aria-hidden="true"
        />
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="display-3 text-white uppercase">
              Have a project <span className="text-gold">like this?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-white/65">
              Tell us what you’re building. We’ll scope it, price it and get it live.
            </p>
            <div className="mt-8 flex justify-center">
              <QuoteButton source={`case-study-${project.slug}`} variant="gold" size="lg" arrow>
                Start Your Project
              </QuoteButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

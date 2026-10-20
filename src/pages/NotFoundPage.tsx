import { Seo } from '../components/Seo';
import { ButtonLink, Container } from '../components/ui';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for could not be found." path="/404/" noindex />
      <Container className="py-24 text-center sm:py-32">
        <p className="text-sm font-semibold text-blue-700">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-slate-600">The page may have moved, or the link may be mistyped.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/">Go to the home page</ButtonLink>
          <ButtonLink to="/blog/" variant="secondary">
            Read the blog
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}

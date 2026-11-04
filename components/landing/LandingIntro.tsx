export function LandingIntro() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <img src="/avatar.png" alt="Oskar Lang" width="256" height="256" className="size-12 rounded-full corner-squircle" />
        <div>
          <h1 className="font-semibold">Oskar Lang</h1>
          <h2>Software Engineer</h2>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4">
        <p className="text-sm">
          Hey there! I&apos;m Oskar, a self-employed software engineer based in Kufstein, Austria. I build the whole stack — frontend, backend, infrastructure — mostly with Nuxt, Spring Boot and Kubernetes.
        </p>
        <a className="connect-button corner-squircle" href="mailto:hi@rxs.to" rel="noopener noreferrer">Email me</a>
      </div>
    </div>
  );
}

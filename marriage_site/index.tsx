export default function IndexPage() {
  return (
    <main className="shell">
      <section className="panel">
        <p className="eyebrow">kb.icecube.dog</p>
        <h1>Static publishing endpoint for Kevin&apos;s corner of icecube.dog.</h1>
        <p className="lede">
          This site is built from the <code>marriage_site</code> workspace,
          published to S3, and served through CloudFront.
        </p>
        <div className="chips">
          <span>S3 origin in us-east-2</span>
          <span>CloudFront in us-east-1</span>
          <span>GitHub OIDC deploys</span>
        </div>
      </section>
    </main>
  );
}

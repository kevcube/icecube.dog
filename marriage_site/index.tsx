export default function IndexPage() {
  return (
    <main className="shell">
      <section className="panel hero">
        <div className="copy">
          <p className="eyebrow">kb.icecube.dog</p>
          <h1>Mongolian marriage symbols, reimagined as interlocked forms.</h1>
          <p className="lede">
            A browser-rendered study of the husband and wife marks, expressed as
            an interlocked rounded square and circle with slow orbital motion.
          </p>
          <div className="chips">
            <span>Realtime 3D in browser</span>
            <span>Circle and rounded square</span>
            <span>Static deploy from marriage_site</span>
          </div>
        </div>
        <figure className="render-card">
          <canvas
            id="marriage-symbol-canvas"
            className="render-canvas"
            aria-label="3D render of interlocked Mongolian marriage symbols"
          />
          <figcaption>
            Interlocked forms for husband and wife, suspended like linked
            jewelry.
          </figcaption>
        </figure>
      </section>
    </main>
  );
}

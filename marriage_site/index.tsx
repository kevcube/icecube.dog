export default function IndexPage() {
  return (
    <main className="shell">
      <section className="panel hero">
        <div className="copy">
          <p className="eyebrow">kb.icecube.dog</p>
          <h1>Mongolian marriage symbols, reimagined as interlocked forms.</h1>
          <p className="lede">
            A browser-rendered study of the paired marriage marks: husband as
            two interlocked circles, wife as two interlocked squares.
          </p>
          <div className="chips">
            <span>Realtime 3D in browser</span>
            <span>Two circles and two squares</span>
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
            Left: husband, shown as two interlocked circles. Right: wife,
            shown as two interlocked squares.
          </figcaption>
        </figure>
      </section>
    </main>
  );
}

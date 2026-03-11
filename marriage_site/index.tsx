export default function IndexPage() {
  return (
    <main className="shell">
      <figure className="stage">
        <canvas
          id="marriage-symbol-canvas"
          className="render-canvas"
          aria-label="3D render of overlapping Mongolian marriage symbols"
        />
      </figure>
      <div className="content">
        <section className="block">
          <p>Scroll test</p>
        </section>
        <section className="block">
          <p>Keep scrolling</p>
        </section>
        <section className="block">
          <p>Bottom of page</p>
        </section>
      </div>
    </main>
  );
}

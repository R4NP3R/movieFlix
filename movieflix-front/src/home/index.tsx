import { MovieList } from "../movieList";

export const Home = () => {
  return (
    <main className="min-h-dvh bg-linear-to-b from-slate-900 to-20% to-slate-950">
      <section className="pt-20 my-container">
        <MovieList/>
      </section>
    </main>
  );
};

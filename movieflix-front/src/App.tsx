import { Outlet } from "react-router";
import { Header } from "./components/header";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-dvh bg-linear-to-b from-slate-900 to-20% to-slate-950">
        <section className="pt-20 my-container">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default App;

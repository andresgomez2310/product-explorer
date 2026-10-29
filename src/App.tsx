import './App.css'


function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">
          Product Explorer
        </h1>

        <p className="mt-4 text-slate-400">
          Explora y descubre tus productos favoritos.
        </p>

        <button
          type="button"
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white"
        >
          Explorar productos
        </button>
      </div>
    </main>
  );
}

export default App

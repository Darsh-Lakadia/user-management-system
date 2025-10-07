import RouteProvider from "./providers/RouteProvider";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 py-6">
        <RouteProvider />
      </main>
    </div>
  );
};

export default App;

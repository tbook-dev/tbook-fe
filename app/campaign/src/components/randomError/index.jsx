export default function RandomError() {
  const randomValue = Math.random();
  if (Math.random() > 0.5) {
    throw new Error("random value > 0.5");
  }

  return (
    <div className="pt-10 text-white flex flex-col items-center justify-center gap-y-4">
      <button
        className="text-white bg-linear7 p-2 rounded-lg"
        onClick={() => window.location.reload()}
      >
        reload to access error page
      </button>
    </div>
  );
}

export default function ServerPage() {
  const serverTime = new Date().toLocaleString();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Server-Side Page</h1>
      <div className="space-y-2">
        <p>Generated at: {serverTime}</p>
        <p>This content is server-rendered</p>
      </div>
    </div>
  );
}

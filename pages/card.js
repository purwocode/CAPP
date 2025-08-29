// pages/index.js
export default function CardForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-6">Cash App</h1>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">
          Link bank using your debit card
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          Linking an external account allows you to move money in and out of
          your Cash App balance.
        </p>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              className="w-full p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              className="p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="123"
              className="p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="12345"
              className="p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              className="flex-1 p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              Skip
            </button>
            <button
              type="submit"
              className="flex-1 p-3 rounded-full bg-green-500 hover:bg-green-600 transition"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

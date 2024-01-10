import Navbar from "./components/ui/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-600 to-blue-700">
        {/* Add geometric line patterns here if needed */}
        <main className="">
          <main className="py-5 container mx-auto flex flex-col text-center md:flex-row items-center gap-10">
            <div className="flex-1">
              {/* Add your bot description here */}
              <h2 className="text-4xl font-bold text-white mb-4">
                Never miss another...
              </h2>
              <p className="text-white mb-6">
                RMNDR.ETH is a discord bot that allows you to create and subscribe to events tailored to web3 and the blockchain. Save time and never miss another opportunity.
              </p>
              <a
                href="https://discord.com/api/oauth2/authorize?client_id=1192672583615783012&permissions=2147503104&scope=bot"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium"
              >
                Invite
              </a>
            </div>
            <div className="flex-1">
              <img
                src="/images/botinaction.jpg"
                alt="Bot in action 1"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex-1">
              <img
                src="/images/botinaction2.jpg"
                alt="Bot in action 2"
                className="rounded-lg shadow-lg"
              />
            </div>
          </main>
        </main>
      </div>
    </div>
  );
}

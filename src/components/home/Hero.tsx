export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
    
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" />
    
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-20 -right-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Validate Your Yoga Pose
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Perfect your poses and earn cryptocurrency rewards with GymChain's AI-powered validation system.
          </p>
        </div>
      </div>
    </div>
  );
}
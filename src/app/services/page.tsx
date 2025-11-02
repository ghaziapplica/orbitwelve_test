import OurServices from "@/components/OurServices";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f] py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
              What We
              <span className="bg-gradient-to-r from-[#1098D5] to-[#1098D5] bg-clip-text text-transparent">
                {" "}
                Do
              </span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl leading-8 text-gray-300 max-w-4xl mx-auto">
              Create your Success Stories with our Quality IT Services. See our
              key expertise below.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <OurServices />
        </div>
      </div>
    </main>
  );
}

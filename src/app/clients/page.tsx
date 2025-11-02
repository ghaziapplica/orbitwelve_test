import ClientMap from "@/components/ClientMap";
import ClientReviews from "@/components/ClientReviews";

// Sample reviews data
const sampleReviews = [
  {
    id: "1",
    author: "John Doe",
    position: "CEO, TechCorp",
    comment:
      "OrbitTwelve transformed our digital presence completely. Their team delivered beyond our expectations.",
    rating: 5,
  },
  {
    id: "2",
    author: "Jane Smith",
    position: "Marketing Director, InnovateX",
    comment:
      "Outstanding service and support throughout our project. Highly recommended!",
    rating: 5,
  },
  {
    id: "3",
    author: "Alex Johnson",
    position: "Founder, StartUpHub",
    comment:
      "The team at OrbitTwelve understood our vision and brought it to life with exceptional results.",
    rating: 4,
  },
];

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1f1f1f] via-[#2a2a2a] to-[#1f1f1f] py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
              What Our
              <span className="bg-gradient-to-r from-[#1098D5] to-[#1098D5] bg-clip-text text-transparent">
                {" "}
                Clients Say
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
              Discover how we've helped businesses transform through our
              services and solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Client Reviews Section */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ClientMap />
          <ClientReviews />
        </div>
      </div>
    </main>
  );
}

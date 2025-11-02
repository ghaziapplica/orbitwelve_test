"use client";
import Image from "next/image";

const services = [
  {
    title: "Digital Consultancy",
    icon: "/digital-consultancy.png",
    items: [
      "Digital Strategy",
      "Digital Audit",
      "Digital Training",
      "Digital Workshops",
      "Marketing Frameworks",
      "Onboarding Digital Structures",
    ],
  },
  {
    title: "Data & Analytics",
    icon: "/data-analytics.png",
    items: [
      "Market Insights",
      "Industry Research",
      "Consumer Behavior",
      "Audience Profiling",
      "Competitive Analysis",
      "Dashboard Services",
    ],
  },
  {
    title: "Social Media Marketing",
    icon: "/social-media.png",
    items: [
      "Social Media Strategy",
      "Channel Optimization",
      "Influencer Marketing",
      "Community Management",
      "Social Media Campaigns",
      "Advertising",
    ],
  },
  {
    title: "DevOps: Web & App",
    icon: "/devops.png",
    items: [
      "UI/UX Design",
      "Platform Development",
      "Hosting & Maintenance",
      "Content Development",
      "Automation",
    ],
  },
  {
    title: "Search Marketing",
    icon: "/search.png",
    items: [
      "SEO Strategy",
      "Keyword Analysis",
      "Content Optimization",
      "App Store Optimization",
      "Google My Business",
    ],
  },
  {
    title: "Paid Media",
    icon: "/paid-media.png",
    items: [
      "Media Strategy",
      "Media Planning",
      "Media Buying",
      "Reporting & Analytics",
      "Special Ad Execution",
    ],
  },
  {
    title: "Content Creation",
    icon: "/content.png",
    items: [
      "Integrated Campaigns",
      "Copywriting",
      "Design Execution",
      "Animation",
      "Photography",
    ],
  },
  {
    title: "Branding",
    icon: "/branding.png",
    items: [
      "Brand Strategy",
      "Identity Design",
      "Brand Guidelines",
      "Messaging Collateral",
      "Newsletters",
    ],
  },
];

export default function OurServices() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
          OUR SERVICES
          <span className="block w-16 h-1 bg-[#1098D5] mx-auto mt-2 rounded-full"></span>
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={100}
                  height={100}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {service.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {service.items.map((item) => (
                  <li key={item} className="flex justify-center">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

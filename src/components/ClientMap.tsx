"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { feature } from "topojson-client";

type CountryName =
  | "Saudi Arabia"
  | "Australia"
  | "Bahrain"
  | "Belgium"
  | "Canada"
  | "France"
  | "Germany"
  | "Grenada"
  | "Gyana"
  | "Hong Kong"
  | "India"
  | "Italy"
  | "Jordan"
  | "Mexico"
  | "Netherlands"
  | "Pakistan"
  | "Panama"
  | "Poland"
  | "UAE"
  | "UK"
  | "USA";

interface CountryData {
  name: CountryName;
  clients: number;
  coordinates: [number, number];
  color: string;
  id: string; // numeric ISO code from world-atlas
}

const countries: Record<string, CountryData> = {
  "Saudi Arabia": {
    name: "Saudi Arabia",
    clients: 10,
    coordinates: [45.0792, 23.8859],
    color: "#1098D5",
    id: "682",
  },
  Australia: {
    name: "Australia",
    clients: 4,
    coordinates: [133.7751, -25.2744],
    color: "#1098D5",
    id: "036",
  },
  Bahrain: {
    name: "Bahrain",
    clients: 1,
    coordinates: [50.5577, 26.0667],
    color: "#1098D5",
    id: "048",
  },
  Belgium: {
    name: "Belgium",
    clients: 1,
    coordinates: [4.4699, 50.5039],
    color: "#1098D5",
    id: "056",
  },
  Canada: {
    name: "Canada",
    clients: 11,
    coordinates: [-106.3468, 56.1304],
    color: "#1098D5",
    id: "124",
  },
  France: {
    name: "France",
    clients: 2,
    coordinates: [2.2137, 46.2276],
    color: "#1098D5",
    id: "250",
  },
  Germany: {
    name: "Germany",
    clients: 4,
    coordinates: [10.4515, 51.1657],
    color: "#1098D5",
    id: "276",
  },
  Grenada: {
    name: "Grenada",
    clients: 1,
    coordinates: [-61.679, 12.1165],
    color: "#1098D5",
    id: "308",
  },
  Gyana: {
    name: "Gyana",
    clients: 2,
    coordinates: [-58.9302, 4.8604],
    color: "#1098D5",
    id: "328",
  },
  "Hong Kong": {
    name: "Hong Kong",
    clients: 1,
    coordinates: [114.1694, 22.3193],
    color: "#1098D5",
    id: "344",
  },
  India: {
    name: "India",
    clients: 6,
    coordinates: [78.9629, 20.5937],
    color: "#1098D5",
    id: "356",
  },
  Italy: {
    name: "Italy",
    clients: 1,
    coordinates: [12.5674, 41.8719],
    color: "#1098D5",
    id: "380",
  },
  Jordan: {
    name: "Jordan",
    clients: 1,
    coordinates: [36.2384, 30.5852],
    color: "#1098D5",
    id: "400",
  },
  Netherlands: {
    name: "Netherlands",
    clients: 3,
    coordinates: [5.2913, 52.1326],
    color: "#1098D5",
    id: "528",
  },
  Pakistan: {
    name: "Pakistan",
    clients: 6,
    coordinates: [69.3451, 30.3753],
    color: "#1098D5",
    id: "586",
  },
  Panama: {
    name: "Panama",
    clients: 1,
    coordinates: [-80.7821, 8.5379],
    color: "#1098D5",
    id: "591",
  },
  Poland: {
    name: "Poland",
    clients: 2,
    coordinates: [19.1451, 51.9194],
    color: "#1098D5",
    id: "616",
  },
  UAE: {
    name: "UAE",
    clients: 7,
    coordinates: [54.3773, 24.4539],
    color: "#1098D5",
    id: "784",
  },
  UK: {
    name: "UK",
    clients: 15,
    coordinates: [-3.435973, 55.378051],
    color: "#1098D5",
    id: "826",
  },
  USA: {
    name: "USA",
    clients: 49,
    coordinates: [-95.7129, 37.0902],
    color: "#1098D5",
    id: "840",
  },
  Mexico: {
    name: "Mexico",
    clients: 5,
    coordinates: [-102.5528, 23.6345],
    color: "#1098D5",
    id: "484",
  },
};

export default function ClientMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    name: "",
    clients: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 960;
    const height = 500;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3
      .geoMercator()
      .scale(150) // 🔽 reduce scale (was 150)
      .translate([width / 2, height / 1.55]); // slight vertical adjustment

    const path = d3.geoPath().projection(projection);
    const g = svg.append("g");

    svg.call(
      d3
        .zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event) => g.attr("transform", event.transform)) as any
    );

    d3.json(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    ).then((worldData: any) => {
      const geojson: any = feature(worldData, worldData.objects.countries);

      g.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path as any)
        .attr("fill", (d: any) => {
          const match = Object.values(countries).find(
            (c) => c.id === String(d.id)
          );
          return match ? match.color : "#d1d5db";
        })
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .style("cursor", (d: any) =>
          Object.values(countries).some((c) => c.id === String(d.id))
            ? "pointer"
            : "default"
        )
        .on("mouseover", function (event: any, d: any) {
          const c = Object.values(countries).find((c) => c.id === String(d.id));
          if (c) {
            d3.select(this).attr("fill", "#1098D5").attr("opacity", 0.8);
            const [x, y] = d3.pointer(event, svg.node());
            setTooltip({
              show: true,
              name: c.name,
              clients: c.clients,
              x: x + 10,
              y: y - 10,
            });
          }
        })
        .on("mouseout", function (event: any, d: any) {
          const c = Object.values(countries).find((c) => c.id === String(d.id));
          if (c) {
            d3.select(this).attr("fill", c.color).attr("opacity", 1);
          }
          setTooltip({ show: false, name: "", clients: 0, x: 0, y: 0 });
        })
        .on("click", function (event: any, d: any) {
          const c = Object.values(countries).find((c) => c.id === String(d.id));
          if (c) {
            setSelected((prev) => (prev === c.name ? null : c.name));
          }
        });

      // draw marker
      if (selected) {
        const country = countries[selected];
        const coords = projection(country.coordinates);
        if (coords) {
          g.append("circle")
            .attr("cx", coords[0])
            .attr("cy", coords[1])
            .attr("r", 0)
            .attr("fill", "#1098D5")
            .attr("stroke", "white")
            .attr("stroke-width", 3)
            .transition()
            .duration(300)
            .attr("r", 20);
          g.append("text")
            .attr("x", coords[0])
            .attr("y", coords[1])
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .attr("font-size", "14px")
            .text(country.clients);
        }
      }
    });
  }, [selected]);

  return (
    <div className="relative w-full max-w-5xl mx-auto bg-white shadow-md p-4 border border-gray-200">
      {tooltip.show && (
        <div
          className="absolute bg-gray-800 text-white text-sm px-4 py-2 rounded-md shadow-lg pointer-events-none z-50"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translateY(-100%)",
          }}
        >
          <div className="font-semibold">{tooltip.name}</div>
          <div className="text-xs text-gray-300">{tooltip.clients} Sales</div>
        </div>
      )}
      <div className="w-full overflow-hidden rounded-lg">
        <svg
          ref={svgRef}
          viewBox="0 0 960 500"
          className="w-full h-auto"
          style={{ background: "#f9fbfc" }} // lighter blue-gray tone
        />
      </div>
      <style jsx global>{`
        .country {
          transition: fill 0.3s ease;
        }
      `}</style>
    </div>
  );
}

// routes/index.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";

/** 
 * Optional helper to extract a CAS number from PubChem data 
 * (depends on how you want to parse the result). 
 */
function findCasNumber(data: any): string | null {
  if (!data?.props) return null;
  for (const prop of data.props) {
    if (
      prop?.urn?.label === "Other Identifiers" &&
      prop.value?.sval?.includes("CAS")
    ) {
      return prop.value.sval;
    }
  }
  return null;
}

/** 
 * The page’s server-side handler. Fetches data from PubChem if ?chemical=... is present. 
 */
export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const chemicalName = url.searchParams.get("chemical")?.trim() || "";

    let data = null;
    if (chemicalName) {
      try {
        // Query PubChem by chemical name
        const response = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chemicalName}/JSON`,
        );
        if (response.ok) {
          const json = await response.json();
          // PubChem returns an array of “PC_Compounds”
          const compound = json?.PC_Compounds?.[0] ?? null;
          if (compound) {
            // Attach CAS if found
            compound.casNumber = findCasNumber(compound);
            data = compound;
          } else {
            data = { error: "No compound data found." };
          }
        } else {
          data = { error: `PubChem request failed: ${response.status}` };
        }
      } catch (err) {
        data = { error: `Error fetching from PubChem: ${err.message}` };
      }
    }

    // Pass `data` to the page component for rendering
    return ctx.render({ data, chemicalName });
  },
};

/** 
 * The default export is our page component. 
 * Fresh will call this after running the handler above. 
 */
export default function Home(props: PageProps<{ data: any; chemicalName: string }>) {
  const { data, chemicalName } = props?.data || {};

  return (
    <div class="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      {/* Hero/Search Section */}
      <div class="flex-1 flex items-center justify-center px-4 py-12">
        <div class="max-w-2xl w-full text-center bg-white p-8 rounded shadow-md">
          <h1 class="text-4xl font-extrabold text-gray-800 mb-4">
            Aroma Chemical Search
          </h1>
          <p class="text-gray-600 mb-8 leading-relaxed">
            Quickly find information about your favourite fragrance chemicals.
          </p>

          <form method="get" action="/" class="flex flex-col items-center">
            <input
              type="text"
              name="chemical"
              placeholder="Enter chemical name (e.g., Linalool)"
              value={chemicalName ?? ""}
              class="border border-gray-300 rounded px-4 py-2 w-full md:w-3/4 mb-4
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              class="bg-blue-600 text-white font-semibold px-6 py-2 rounded
                     hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results Section: Only show if we actually have data */}
      {data && !data.error && (
        <div class="bg-white rounded shadow-md mx-auto mb-8 p-6 w-full max-w-screen-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Chemical Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column: Basic Info */}
            <div>
              <p>
                <strong>Name:</strong>{" "}
                {
                  data.props?.find(
                    (prop: any) =>
                      prop.urn.label === "IUPAC Name" && prop.urn.name === "Preferred",
                  )?.value.sval || "N/A"
                }
              </p>
              <p>
                <strong>CAS Number:</strong> {data.casNumber ?? "N/A"}
              </p>
              <p>
                <strong>Molecular Formula:</strong>{" "}
                {
                  data.props?.find(
                    (prop: any) => prop.urn.label === "Molecular Formula",
                  )?.value.sval || "N/A"
                }
              </p>
              <p>
                <strong>Molecular Weight:</strong>{" "}
                {
                  data.props?.find(
                    (prop: any) => prop.urn.label === "Molecular Weight",
                  )?.value.sval || "N/A"
                }
              </p>
              <p>
                <strong>SMILES (Canonical):</strong>{" "}
                {
                  data.props?.find(
                    (prop: any) =>
                      prop.urn.label === "SMILES" && prop.urn.name === "Canonical",
                  )?.value.sval || "N/A"
                }
              </p>
            </div>

            {/* Right Column: PubChem 2D/3D structure image */}
            <div>
              <h3 class="text-xl font-semibold mb-2">Molecular Structure</h3>
              <img
                src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${data.id?.id?.cid}/PNG`}
                alt="Molecular Structure"
                class="rounded border border-gray-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* Error handling */}
      {data?.error && (
        <div class="mx-auto mb-8 p-6 w-full max-w-screen-md text-center text-red-500">
          <p><strong>Error:</strong> {data.error}</p>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  return (
    <nav class="bg-white border-b border-gray-200 p-4">
      <div class="max-w-screen-xl mx-auto flex items-center justify-between">
        <span class="text-2xl font-extrabold text-gray-800">ffragrance</span>
        <ul class="flex space-x-6">
          <li>
            <a href="/" class="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </a>
          </li>
          <li>
            <a href="/chemicals" class="text-gray-700 hover:text-blue-600 font-medium">
              Chemicals Search
            </a>
          </li>
          <li>
            <a href="/formulas" class="text-gray-700 hover:text-blue-600 font-medium">
              Formulas
            </a>
          </li>
          <li>
            <a href="/inventory" class="text-gray-700 hover:text-blue-600 font-medium">
              Inventory
            </a>
          </li>
          <li>
            <a href="/about" class="text-gray-700 hover:text-blue-600 font-medium">
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
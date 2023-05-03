import { ResponsiveHeatMap } from "@nivo/heatmap";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { dataset } from "../../app/api";

export default function Heatmap() {
  const [data, setData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<MapElement[]>([]);
  const [markerList, setMarkerList] = useState<string[]>([]);
  const [phenoList, setPhenoList] = useState<string[]>([]);
  const [markerFilter, setMarkerFilter] = useState<string[]>([]);
  const [phenoFilter, setPhenoFilter] = useState<string[]>([]);
  const [assocList, setAssocList] = useState<{ gene: string; assoc: number }[]>(
    []
  );
  const [assocRange, setAssocRange] = useState<number>(0);

  const transformData = useCallback(
    (arr: Gene[], markers: string[], phenos: string[]) => {
      const dataBuilder: MapElement[] = [];
      const markersCopy =
        markers.length > 0 ? markers.slice() : markerList.slice(0, 24);
      for (let i = 0; i < markersCopy.length; i++) {
        const e: MapElement = {
          id: "",
          data: [],
        };
        e.id = markersCopy[i];
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].marker_symbol === e.id) {
            if (
              phenos.length === 0 ||
              phenos.indexOf(
                arr[j].top_level_phenotype_term.top_level_mp_term_name
              ) >= 0
            ) {
              e.data.push({
                x: arr[j].top_level_phenotype_term.top_level_mp_term_name,
                y: arr[j].phenotype_count,
              });
            }
          }
        }
        dataBuilder.push(e);
      }
      return dataBuilder;
    },
    [markerList]
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataset<any[]>();
      setData(data);

      const markers: string[] = [];
      const phenos: string[] = [];
      for (let i = 0; i < data.length; i++) {
        if (
          markers.length === 0 ||
          markers.indexOf(data[i].marker_symbol) < 0
        ) {
          markers.push(data[i].marker_symbol);
        }
        if (
          phenos.length === 0 ||
          phenos.indexOf(
            data[i].top_level_phenotype_term.top_level_mp_term_name
          ) < 0
        ) {
          phenos.push(data[i].top_level_phenotype_term.top_level_mp_term_name);
        }
      }
      setPhenoList(phenos.sort((a, b) => a.localeCompare(b)));
      setMarkerList(markers.sort((a, b) => a.localeCompare(b)));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const assocs: { gene: string; assoc: number }[] = [];
    for (let i = 0; i < markerList.length; i++) {
      let assocCount = 0;
      for (let j = 0; j < data.length; j++) {
        if (data[j].marker_symbol === markerList[i]) {
          assocCount += data[j].phenotype_count;
        }
      }
      assocs.push({ gene: markerList[i], assoc: assocCount });
    }
    setAssocList(assocs.sort((a, b) => b.assoc - a.assoc));
  }, [markerList, data]);

  useEffect(() => {
    setTableData(transformData(data, markerFilter, phenoFilter));
  }, [data, markerFilter, phenoFilter, transformData]);

  return (
    <main className="container d-flex flex-column gap-3">
      <div>
        <label htmlFor="assocRange" className="form-label fw-bold">
          Filter top 10% of genes with highest phenotype count
        </label>
        <div className="d-flex flex-row gap-4">
          <input
            type="range"
            className="form-range"
            id="assocRange"
            min="0"
            max="0.1"
            step="0.01"
            value={assocRange}
            onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
              const markers: string[] = [];
              for (
                let i = 0;
                i <
                Math.ceil(
                  assocList.length * parseFloat(event.currentTarget.value)
                );
                i++
              ) {
                markers.push(assocList[i].gene);
              }
              setMarkerFilter(markers);
              setAssocRange(parseFloat(event.currentTarget.value));
            }}
          />
          <span>{Math.floor(assocRange * 100)}%</span>
        </div>
      </div>
      <div>
        <label className="fw-bold mb-2">Genes</label>
        <Select
          options={markerList.map((marker) => {
            return { value: marker, label: marker };
          })}
          isMulti
          value={markerFilter.map((marker) => {
            return { value: marker, label: marker };
          })}
          closeMenuOnSelect={false}
          onChange={(selectedOptions) => {
            setMarkerFilter(
              selectedOptions.map((selectedOption) => selectedOption.value)
            );
            setAssocRange(0);
          }}
        />
      </div>
      <div>
        <label className="fw-bold mb-2">Phenotype system</label>
        <Select
          options={phenoList.map((pheno) => {
            return { value: pheno, label: pheno };
          })}
          isMulti
          closeMenuOnSelect={false}
          onChange={(selectedOptions) => {
            setPhenoFilter(
              selectedOptions.map((selectedOption) => selectedOption.value)
            );
            setAssocRange(0);
          }}
        />
      </div>
      <div className="vh-100">
        <ResponsiveHeatMap
          data={tableData}
          margin={{ top: 150, right: 90, bottom: 75, left: 90 }}
          valueFormat=" >-.2d"
          enableLabels={false}
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
          }}
          axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Gene",
            legendPosition: "middle",
            legendOffset: -80,
          }}
          colors={{
            type: "sequential",
            scheme: "orange_red",
            divergeAt: 0.5,
            minValue: 0,
            maxValue: 50,
          }}
          emptyColor="#000"
          legends={[
            {
              anchor: "bottom",
              translateX: 0,
              translateY: 40,
              length: 300,
              thickness: 7,
              direction: "row",
              tickPosition: "after",
              tickSize: 3,
              tickSpacing: 3,
              tickOverlap: false,
              tickFormat: ">-.2d",
              title: "Phenotype Count →",
              titleAlign: "start",
              titleOffset: 6,
            },
          ]}
        />
      </div>
    </main>
  );
}

interface Gene {
  marker_accession_id: string;
  marker_symbol: string;
  top_level_phenotype_term: {
    top_level_mp_term_id: string;
    top_level_mp_term_name: string;
  };
  procedures: string[];
  phenotype_terms: {
    mp_term_id: string;
    mp_term_name: string;
  }[];
  phenotype_count: number;
}

interface MapElement {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}

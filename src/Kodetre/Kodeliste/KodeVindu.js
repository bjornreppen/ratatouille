import Detaljeringsgrad from "./Detaljeringsgrad";
import Overordnet from "./Overordnet";
import React, { useState, useEffect } from "react";
import språk from "../../språk";
import Graf from "./Graf";
import Flagg from "./Flagg";
import Kodekort from "./Kodekort";
import Kodeliste from "./Kodeliste";
import Statistikk from "./Statistikk";
import Gradienter from "./Gradienter";
import Ekspander from "./Ekspander";
import Ingress from "./Ingress";
import Kurver from "./Kurver";
import Kurve from "./Kurve";
import {
  CallSplit,
  MergeType,
  DescriptionOutlined,
  ShowChart,
  Gradient
} from "@material-ui/icons/";
import KurveContainer from "./KurveContainer";
import Nedlasting from "./Nedlasting";

import { SettingsContext } from "../../SettingsContext";

const KodeVindu = ({
  erAktivert,
  onNavigate,
  onFitBounds,
  meta,
  data,
  kurve,
  onMouseEnter,
  onMouseLeave,
  onToggleLayer,
  opplystKode,
  onUpdateLayerProp,
  onUpdateMetaProp
}) => {
  const initialExpand = () =>
    JSON.parse(localStorage.getItem("expand") || "{}");
  const [expand, setExpand] = useState(initialExpand);
  useEffect(() => {
    localStorage.setItem("expand", JSON.stringify(expand));
  }, [expand]);
  if (!meta) return null;
  const {
    kode,
    url,
    farge,
    prefiks,
    bbox,
    ingress,
    infoUrl,
    tittel,
    nivå,
    overordnet,
    antallNaturomrader,
    antallArter,
    stats
  } = meta;
  const mor = overordnet[0] || { tittel: {} };
  const gradientLength = meta.gradient
    ? Object.entries(meta.gradient).length
    : 0;
  const flaggLength = meta.flagg ? Object.entries(meta.flagg).length : 0;
  return (
    <SettingsContext.Consumer>
      {context => {
        return (
          <div
            square="false"
            elevation={4}
            style={{
              position: "relative",
              top: -72
            }}
          >
            <Kodekort
              kode={kode}
              farge={farge}
              url={url}
              prefiks={prefiks}
              bbox={bbox}
              tittel={tittel}
              nivå={nivå}
              overordnet={overordnet}
              onNavigate={onNavigate}
              erAktivert={erAktivert}
              onFitBounds={onFitBounds}
              onToggleLayer={onToggleLayer}
            />
            {kode === "NN-LA-TI" && (
              <Detaljeringsgrad
                onUpdateLayerProp={onUpdateLayerProp}
                value={meta.depth}
              />
            )}
            <Ekspander
              visible={!!ingress}
              expanded={expand.ingress}
              heading="Beskrivelse"
              icon={<DescriptionOutlined />}
              onExpand={() =>
                setExpand({ ...expand, ingress: !expand.ingress })
              }
            >
              <Ingress beskrivelse={ingress} infoUrl={infoUrl} />
            </Ekspander>
            <Ekspander
              visible={prefiks !== "AO" && !!stats}
              expanded={expand.stats}
              heading="Statistikk"
              onExpand={() => setExpand({ ...expand, stats: !expand.stats })}
            >
              <Statistikk
                prefiks={prefiks}
                overordnet={overordnet}
                tittel={språk(meta.tittel)}
                infoUrl={infoUrl}
                stats={stats}
                arealPrefix={mor.areal}
                toppnavn={mor.tittel.nb}
                arealVindu={antallArter}
                arterVindu={antallArter}
                geometrierVindu={antallNaturomrader}
              />
            </Ekspander>

            <Ekspander
              visible={overordnet.length > 0}
              expanded={expand.tagger}
              icon={<MergeType style={{ transform: "rotate(-45deg)" }} />}
              heading="Hierarki"
              heading2={overordnet.length}
              onExpand={() => setExpand({ ...expand, tagger: !expand.tagger })}
            >
              <Overordnet overordnet={overordnet} onNavigate={onNavigate} />
            </Ekspander>
            <Ekspander
              expanded={expand.innhold || overordnet.length === 0}
              visible={meta.barn.length > 0}
              heading={meta.undernivå}
              heading2={meta.barn.length}
              icon={<CallSplit style={{ transform: "rotate(180deg)" }} />}
              onExpand={() =>
                setExpand({ ...expand, innhold: !expand.innhold })
              }
            >
              {false && (
                <KurveContainer
                  key={"a.url"}
                  punkt={{
                    url:
                      "Biota/Plantae/Magnoliophyta/Eudicots/Ericales/Primulaceae/Primula/Scandinavica"
                  }}
                  gradient={{
                    url:
                      "Natur_i_Norge/Landskap/Landskapsgradient/Arealbruksintensitet/",
                    barn: []
                  }}
                >
                  <Kurve logY={true} />
                </KurveContainer>
              )}
              <Kodeliste
                title=""
                parentkode={kode}
                størsteAreal={data.størsteAreal}
                apidata={data.barn}
                metadata={meta.barn}
                onNavigate={onNavigate}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                opplystKode={opplystKode}
                onUpdateMetaProp={onUpdateMetaProp}
              />
            </Ekspander>

            {meta.gradient &&
              Object.entries(meta.gradient).map(([kode, node]) => (
                <Ekspander
                  expanded={expand[node.tittel.nb]}
                  visible={gradientLength > 0}
                  heading={node.tittel.nb}
                  heading2={Object.values(node.barn).length}
                  icon={<Gradient />}
                  onExpand={() =>
                    setExpand({
                      ...expand,
                      [node.tittel.nb]: !expand[node.tittel.nb]
                    })
                  }
                >
                  <Gradienter
                    gradient={node.barn}
                    onNavigate={onNavigate}
                    visKoder={context.visKoder}
                  />
                </Ekspander>
              ))}
            {true && meta.kart.format.raster_gradient && (
              <Ekspander
                expanded={expand.stat1d}
                visible={true}
                heading={"Frekvens"}
                heading2=""
                icon={<ShowChart />}
                onExpand={() => setExpand({ ...expand, frek: !expand.frek })}
              >
                <KurveContainer gradient={meta}>
                  <Kurve logY={true} />
                </KurveContainer>
              </Ekspander>
            )}
            {kurve && (
              <Ekspander
                expanded={expand.stat1d}
                visible={true}
                heading={"Relativ frekvens"}
                heading2=""
                icon={<ShowChart />}
                onExpand={() =>
                  setExpand({ ...expand, stat1d: !expand.stat1d })
                }
              >
                <Kurver
                  meta={meta}
                  punkt={kurve.punkt}
                  gradient={kurve.gradient}
                />
              </Ekspander>
            )}
            <Ekspander
              expanded={expand.flagg}
              visible={flaggLength > 0}
              heading="Egenskaper"
              heading2={flaggLength}
              onExpand={() => setExpand({ ...expand, flagg: !expand.flagg })}
            >
              <Flagg
                flagg={meta.flagg}
                onNavigate={url => {
                  console.warn(url);
                  onNavigate(url);
                }}
              />
            </Ekspander>

            <Graf
              url={url}
              graf={meta.graf}
              parentkode={kode}
              onNavigate={onNavigate}
              expand={expand}
              onSetExpand={setExpand}
            />
            <Nedlasting
              url={url}
              heading="Datakilde"
              noder={meta.datakilde}
              parentkode={kode}
              onNavigate={onNavigate}
              expand={expand}
              onSetExpand={setExpand}
            />
          </div>
        );
      }}
    </SettingsContext.Consumer>
  );
};

export default KodeVindu;

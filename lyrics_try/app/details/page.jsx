"use client";

import { useEffect, useState } from "react";
import { useLyrics } from "../../context/LyricsContext";
import LyricsBackground from "../components/lyrics-background";
import ReactECharts from "echarts-for-react";

export default function DetailsPage() {
    const { lyrics, modelsuccessRate, AGsuccessRate, modelconfidence, AGconfidence, uniq, repe, lexica, Rhythm } = useLyrics(); // Get lyrics from context

    const [autogluonconfidence, setAutogluononfidence] = useState((AGconfidence + modelconfidence).toFixed(2));
    const [ownmodelonfidence, setOwnModelonfidence] = useState(modelconfidence.toFixed(2));


    const [autogluonsucess, setAutogluonsucess] = useState(AGsuccessRate);
    const [ownmodelsucess, setOwnModelsucess] = useState(modelsuccessRate);

    const [uniqueness, setUniqueness] = useState(uniq);
    const [repetition, setRepetition] = useState(repe);
    const [lexical, setLexical] = useState(lexica);
    const [rhythm, setRhythm] = useState(Rhythm);

    const openPDF = (pdfUrl) => {
        window.open(pdfUrl, "_blank");
    };

    // 3D Pie Chart Configuration
    const pieChartOptions = {
        title: {
            text: "Confidence In Prediction",
            left: "center",
            textStyle: { color: "#fff" },
        },
        tooltip: {
            trigger: "item",
        },
        series: [
            {
                type: "pie",
                radius: "70%",
                label: {
                    formatter: "{b}: {d}%",
                    color: "#fff",
                },
                data: [
                    { value: parseFloat(autogluonconfidence), name: "AutoGluon Confidence", itemStyle: { color: "#00C49F" } },
                    { value: parseFloat(ownmodelonfidence), name: "Model Confidence", itemStyle: { color: "#FF8042" } },
                ],
                roseType: "radius",
            },
        ],
        backgroundColor: "transparent",
    };


    return (
        <main className="flex h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
            <LyricsBackground />
            <div className="flex relative w-full h-full">
                {/* Left Side: Lyrics */}
                <div className="flex flex-col w-[35%] h-full">
                    <h2 className="text-xl font-semibold text-white ml-[5px]">Lyrics</h2>
                    <div className="bg-white/10 p-4 rounded-md text-white h-full overflow-y-auto">
                        {lyrics ? (
                            <p className="mt-2 whitespace-pre-line">{lyrics}</p>
                        ) : (
                            <p>No lyrics available.</p>
                        )}
                    </div>
                </div>

                {/* Right Side: Circles + 3D Pie Chart */}
                <div className="w-[65%] p-4 text-white flex flex-col h-full justify-center">
                    {/* Circle Section */}
                    <div className="flex items-center justify-around">
                        {[
                            { content: uniqueness, label: "Uniqueness" },
                            { content: repetition, label: "Repetition" },
                            { content: lexical, label: "Lexical Diversity" },
                            { content: rhythm, label: "Rhythm Density" },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center justify-center gap-3">
                                <h6 className="text-[18px]">{item.label}</h6> {/* Text below the circle */}
                                <div className="h-[150px] w-[150px] text-[18px] bg-transparent border-[3px] border-dotted border-neutral-50 rounded-full flex items-center justify-center">
                                    {item.content}% {/* Text inside the circle */}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 3D Pie Chart Section */}
                    <div className="flex justify-center items-center mt-[50px] text-[20px] font-bold">
                        <div className="flex flex-col items-center justify-center text-[#FF8042]">
                            <div className="mb-[50%] flex flex-col items-center justify-center p-[10px] relative left-[40%]">
                                <div>Model Confidence</div>
                                <div>{parseFloat(ownmodelonfidence)}%</div>
                            </div>
                            <div className="border-[3px] flex flex-col items-center justify-center p-[10px]">
                                <div>Model Estimated Success</div>
                                <div>{ownmodelsucess}%</div>
                            </div>
                        </div>
                        <ReactECharts option={pieChartOptions} style={{ width: "400px", height: "400px" }} />
                        <div className="flex flex-col items-center justify-center text-[#00C49F]">
                            <div className="mb-[50%] flex flex-col items-center justify-center p-[10px] relative right-[30%]">
                                <div>Autogluon Confidence</div>
                                <div>{parseFloat(autogluonconfidence)}%</div>
                            </div>
                            <div className="border-[3px] flex flex-col items-center justify-center p-[10px]">
                                <div>Autogluon Estimated Success</div>
                                <div>{autogluonsucess}%</div>
                            </div>
                           
                        </div>
                    </div>
                    {/* <button
                        onClick={() => openPDF("/path-to-your-autogluon-pdf.pdf")}
                        className="mt-2 px-4 py-2 bg-[#00C49F] text-white rounded-lg hover:bg-[#008F7A]"
                    >
                        View Report
                    </button> */}
                </div>
            </div>
        </main>
    );
}

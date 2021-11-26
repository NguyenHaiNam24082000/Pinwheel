import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { LoadingOverlay } from "@mantine/core";
import ControlPanel from "./ControlPanel";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFReader() {
    const [scale, setScale] = useState(1.0);
    const [rotate, setRotate] = useState(0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [visible, setVisible] = useState(true);
    const [pages,setPages]=useState([]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        for(let i=1;i<=numPages;i++)
        {
            setPages((page)=>[...page,i])
        }
        setVisible(false);
    }
    return (
        <div className="flex justify-center w-full h-full">
            {/* <LoadingOverlay visible={visible} /> */}
            <section
                id="pdf-section"
                className="flex flex-col items-center w-full h-full overflow-y-scroll"
            >
                {visible === false && (
                    <ControlPanel
                        scale={scale}
                        setScale={setScale}
                        numPages={numPages}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        setRotate={setRotate}
                        rotate={rotate}
                        file="../../../assets/docs/example.pdf"
                    />
                )}
                <Document
                    file="../../../assets/docs/example.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<LoadingOverlay visible={visible} />}
                    className="flex flex-col justify-center items-center w-full"
                >
                    <TransformWrapper
                        doubleClick={{ disabled: false }}
                        panning={{ disabled: false }}
                        // contentClass="flex justify-center w-full"
                    >
                        {({
                            zoomIn,
                            zoomOut,
                            resetTransform,
                            centerView,
                            ...rest
                        }) => (
                            <TransformComponent contentClass="flex flex-col justify-center w-full">
                                {
                                    pages.map((page, index)=>(
                                          <Page key={index} pageNumber={page} scale={scale} rotate={rotate} className="page-pdf"/>
                                    ))
                                }
                            </TransformComponent>
                        )}
                    </TransformWrapper>
                </Document>
                {/* <p>
                Page {pageNumber} of {numPages}
            </p> */}
            </section>
        </div>
    );
}

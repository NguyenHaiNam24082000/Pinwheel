import React from 'react';
import PDFPrinter from './PDFPrinter';

const ControlPanel = (props) => {
  const { file, pageNumber, numPages, setPageNumber, scale, setScale, setRotate,rotate } = props;

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
  const lastPageClass = isLastPage ? 'disabled' : 'clickable';

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
  };

  const onPageChange = (e) => {
    const { value } = e.target;
    setPageNumber(Number(value));
  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOutClass = isMinZoom ? 'disabled' : 'clickable';
  const zoomInClass = isMaxZoom ? 'disabled' : 'clickable';

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  const rotatePage =()=>{
      setRotate((rotate%360)+90)
  }

  return (
    <div className="control-panel my-3 p-3 flex items-baseline justify-between">
      <div className="flex justify-between items-baseline">
        <i
          className={`fas fa-fast-backward mx-3 ${firstPageClass}`}
          onClick={goToFirstPage}
        />
        <i
          className={`fas fa-backward mx-3 ${firstPageClass}`}
          onClick={goToPreviousPage}
        />
        <span>
          Page{' '}
          <input
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            className="p-0 pl-1 mx-2"
            value={pageNumber}
            onChange={onPageChange}
          />{' '}
          of {numPages}
        </span>
        <i
          className={`fas fa-forward mx-3 ${lastPageClass}`}
          onClick={goToNextPage}
        />
        <i
          className={`fas fa-fast-forward mx-3 ${lastPageClass}`}
          onClick={goToLastPage}
        />
      </div>
      <div className="flex justify-between items-baseline">
        <i
          className={`fas fa-search-minus mx-3 ${zoomOutClass}`}
          onClick={zoomOut}
        />
        <span>{(scale * 100).toFixed()}%</span>
        <i
          className={`fas fa-search-plus mx-3 ${zoomInClass}`}
          onClick={zoomIn}
        />
        <i className="fas fa-sync-alt cursor-pointer" onClick={rotatePage}></i>
      </div>
      <div className="mx-3">
        <a href="/assets/docs/file-sample.pdf" download={true} title="download">
          <i className="fas fa-file-download clickable" />
        </a>
      </div>
      <div className="mx-3">
        <PDFPrinter file={file} />
      </div>
    </div>
  );
};

export default ControlPanel;

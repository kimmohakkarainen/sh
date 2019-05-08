import * as api from "../api";

export function getPreview({
  beginDate,
  endDate,
  doctorFilter,
  examinationFilter
}) {
//  console.log("actions.getPreview");
//  console.log(beginDate);
//  console.log(endDate);
//  console.log(doctorFilter);
//  console.log(examinationFilter);
  return dispatch => {
    api
      .getPreview({
        beginDate,
        endDate,
        doctorFilter,
        examinationFilter
      })
      .then(resp => {
    	console.log(resp);
        dispatch(fetchPreviewSucceeded(resp.data));
      });
  };
}


export function fetchPreviewSucceeded(data) {
//  console.log("actions.fetchPreviewSucceeded");
//  console.log(data);
  return {
    type: "FETCH_PREVIEW_SUCCEEDED",
    payload: data
  };
}


export function getExcel({
	  beginDate,
	  endDate,
	  doctorFilter,
	  examinationFilter
	}) {
//	  console.log("actions.getExcel");
//	  console.log(beginDate);
//	  console.log(endDate);
//	  console.log(doctorFilter);
//	  console.log(examinationFilter);
	  return dispatch => {
		    api
		      .getExcel({
		        beginDate,
		        endDate,
		        doctorFilter,
		        examinationFilter
		      });
	  };
}


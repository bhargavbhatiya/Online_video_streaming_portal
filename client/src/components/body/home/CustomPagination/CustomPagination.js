import React from "react";
import Pagination from "@material-ui/lab/Pagination";

export default function CustomPagination({ setPage, numOfPages }) {
	// Scroll to top when page changes
	const handlePageChange = (e, p) => {
		setPage(p);
		window.scroll(0, 0);
	};

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				marginTop: 10,
				marginBottom: 20,
				backgroundColor: "#f5f5f5",
			}}
		>
			<Pagination
				ClasName="outlinedPrimary"
				onChange={handlePageChange}
				count={numOfPages}
				color="secondary"
				variant="outlined"
				size="large"
			/>
		</div>
	);
}

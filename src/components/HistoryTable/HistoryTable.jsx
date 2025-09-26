import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import historyData from "../../data/historyData";
import "./HistoryTable.css";

const HistoryTable = () => {
    return (
            <DataTable
                value={historyData}
                className="custom-table"
                responsiveLayout="scroll"
            >
                <Column field="id" header="Cod histórico" style={{ width: "15%" }} />
                <Column field="date" header="Data e hora" style={{ width: "25%" }} />
                <Column field="message" header="Mensagem" style={{ width: "60%" }} />
            </DataTable>
    );
};

export default HistoryTable;

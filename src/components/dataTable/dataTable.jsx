/* eslint-disable react/prop-types */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useRef } from "react";

const Tables = ({products, columns, filters}) => {
  const dt = useRef(null);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({selectionOnly})
  }

  return (
    <>
    <DataTable ref={dt} value={products} tableStyle={{minWidth: '50rem'}} showGridlines size='small'  stripedRows removableSort
    paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    rows={10} scrollable scrollHeight="20rem" filters={filters}>
      {columns.map((element, index) => {
        return <Column key={index} field={element.field} header={element.header} sortable></Column>
      } )}
    </DataTable>
    <div className="mt-4 border-1 border"></div>
    <div className="flex justify-end p-2 pr-8">
      <Button type="button" icon="pi pi-file" style={{backgroundColor: 'green', color: "white", fontSize: '1.5rem'}} rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
    </div>
    
    </>
  )
}

export default Tables;
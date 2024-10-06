/* eslint-disable react/prop-types */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Tables = ({products, columns, filters}) => {
  return (
    <DataTable value={products} tableStyle={{minWidth: '50rem'}} showGridlines size='small'  stripedRows removableSort
    paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
    rows={10} scrollable scrollHeight="400px" filters={filters}>
      {columns.map((element, index) => {
        return <Column key={index} field={element.field} header={element.header} sortable></Column>
      } )}
    </DataTable>
  )
}

export default Tables;
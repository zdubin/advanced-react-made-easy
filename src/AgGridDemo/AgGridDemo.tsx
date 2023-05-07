import { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './AgGridDemo.scss';
import {
    ColDef,
    GetRowIdFunc,
    GetRowIdParams,
    RowSelectedEvent,
    ValueFormatterParams,
    ICellRendererParams,
    CellRendererSelectorResult,
} from 'ag-grid-community';
import { useWindowSize, Size } from '../CustomHooks/useWindowSize';
import MoodRenderer from './MoodRenderer';

interface ICar {
    make: string;
    model: string;
    price: number;
}
interface IDiscountRate {
    discount: number;
}

const AgGridDemo = () => {
    const size: Size = useWindowSize(); // window resize hook
    const gridRef = useRef<AgGridReact<ICar>>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    // Adjust height and width as window is resized.
    const gridStyle = useMemo(() => ({ height: `${Math.floor(size?.height ? size?.height / 2 : 600)}px`, width: `${Math.floor(size?.width ? size?.width / 2 : 600)}px` }), [size]);
    const [rowData, setRowData] = useState<ICar[]>([
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 },
    ]);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            headerName: 'Make', field: 'make',
            cellRendererSelector: (params: ICellRendererParams<ICar>): CellRendererSelectorResult | undefined => {
                return {
                    component: MoodRenderer,
                };
            },
            filter: 'agSetColumnFilter'
        },
        { headerName: 'Model', field: 'model' },
        {
            headerName: 'Price',
            field: 'price',
            valueFormatter: (params: ValueFormatterParams<ICar, number>) => {
                // params.value: number
                return '$' + params.value;
            },
        },
    ]);
    const [cars, setCars] = useState<ICar[]>([]);

    const context = useMemo(() => {
        return {
            discount: 0.9,
        } as IDiscountRate;
    }, []);
    const getRowId = useMemo<GetRowIdFunc>(() => {
        return (params: GetRowIdParams<ICar>) => {
            // params.data : ICar
            return params.data.make + params.data.model;
        };
    }, []);


    const onRowSelected = useCallback(
        (event: RowSelectedEvent<ICar, IDiscountRate>) => {
            // event.data: ICar | undefined
            if (event.data && event.node.isSelected()) {
                const price = event.data.price;
                // event.context: IContext
                const discountRate = event.context.discount;
                console.log('Price with 10% discount:', price * discountRate);
            }
        },
        []
    );

    const onShowSelection = useCallback(() => {
        // api.getSelectedRows() : ICar[]
        const cars: ICar[] = gridRef.current!.api.getSelectedRows();
        setCars(cars);
        console.log(
            'Selected cars are',
            cars.map((c) => `${c.make} ${c.model}`)
        );
    }, []);

    return (
        <>
            <div style={containerStyle}>
                <div className="test-container">
                    <div className="test-header">
                        <button onClick={onShowSelection}>Log Selected Cars</button>
                    </div>

                    <div style={gridStyle} className="ag-theme-alpine">
                        <AgGridReact<ICar>
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            rowSelection={'multiple'}
                            context={context}
                            getRowId={getRowId}
                            onRowSelected={onRowSelected}
                        ></AgGridReact>
                    </div>
                </div>
            </div>
            <div>
                {cars.length ?
                    <>
                        <h4>Selected cars are</h4>
                        <ol>
                            {cars.map((c, i) => <li key={`car-${i}`}>{c.make} {c.model}</li>)}
                        </ol>
                    </>
                    :
                    <></>
                }

            </div>
        </>
    );
};
export default AgGridDemo;
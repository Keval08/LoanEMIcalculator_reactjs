import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chart } from 'primereact/chart';
import Slider from '@mui/material/Slider';
import { InputText } from "primereact/inputtext";
 

export default function EimCalculator() {
    const [products, setProducts] = useState();
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [value, setValue] = useState();
    const [newValue, setNewValue] = useState();
    const [Principal, setPrincipal] = useState(value ? value * (newValue/100) : '')

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Loan Amount', 'Total Interest'],
            datasets: [
                {
                    data: [value, newValue],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'), 
                        documentStyle.getPropertyValue('--blue-500'), 
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-400'), 
                        documentStyle.getPropertyValue('--blue-400'), 
                    ]
                }
            ]
        };
        const options = {
            cutout: '50%'
        };

        setChartData(data);
        setChartOptions(options);
    }, [value, newValue]);

    const val = [{
        Month: 'Apr 23',
        Opening_Balance: value,
        Interest: newValue,
        Principal: Principal,
        Closing_Balance: '4,19,401' 
    },
    {
        Month: 'May 23',
        Opening_Balance: '5,00,000',
        Interest: '6,667',
        Principal: '80,598',
        Closing_Balance: '4,19,401' 
    },
    {
        Month: 'Jun 23',
        Opening_Balance: '5,00,000',
        Interest: '6,667',
        Principal: '80,598',
        Closing_Balance: '4,19,401' 
    },
    {
        Month: 'Jul 23',
        Opening_Balance: '5,00,000',
        Interest: '6,667',
        Principal: '80,598',
        Closing_Balance: '4,19,401' 
    },
    {
        Month: 'Aug 23',
        Opening_Balance: '5,00,000',
        Interest: '6,667',
        Principal: '80,598',
        Closing_Balance: '4,19,401' 
    },
    {
        Month: 'Sep 23',
        Opening_Balance: '5,00,000',
        Interest: '6,667',
        Principal: '80,598',
        Closing_Balance: '4,19,401' 
    }
    ]
    useEffect(() => {
        setProducts(val)
    }, [value, newValue])

    const marks = [
        {
            value: 0,
            label: '0%',
        },
        {
            value: 5,
            label: '5%',
        },
        {
            value: 10,
            label: '10%',
        },
        {
            value: 15,
            label: '15%',
        },
        {
            value: 20,
            label: '20%',
        }
    ];

    return (
        <>
            <div className="card">
                <DataTable value={products} scrollable scrollHeight="218px" showGridlines tableStyle={{ minWidth: '40rem' }}>
                    <Column field="Month" header="Month"></Column>
                    <Column field="Opening_Balance" header="Opening Balance"></Column>
                    <Column field="Interest" header="Interest"></Column>
                    <Column field="Principal" header="Principal"></Column>
                    <Column field="Closing_Balance" header="Closing_Balance"></Column>
                </DataTable>
            </div>

            <div className="card flex justify-content-center pie_chart">
                <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-10rem" />
            </div>
            
            <h1>Loan Amount</h1>
            <div className="card flex justify-content-center">
            <div className="w-14rem">
                <InputText value={value} onChange={(e) => setValue(e.target.value)} className="w-full" />
                <Slider
                    aria-label="Custom marks"
                    onChange={(_, value) =>
                        setValue(value)
                    }
                    step={10000}
                    min={5000}
                    max={2500000}
                    value={value}
                    valueLabelDisplay="auto"
                />
            </div>
            <h1>Loan Interest</h1>
            <div className="w-14rem">
                <InputText value={newValue} onChange={(e) => setNewValue(e.target.value)} className="w-full" />
                <Slider
                    aria-label="Custom marks"
                    onChange={(_, value) =>
                        setNewValue(value)
                    }
                    step={1}
                    min={0}
                    max={20}
                    value={value}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </div>
        </div>
        </>
    );
}


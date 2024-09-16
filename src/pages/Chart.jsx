import React from 'react';
import ChartOne from '../components/Charts/ChartOne';
import ChartThree from '../components/Charts/ChartThree';
import ChartTwo from '../components/Charts/ChartTwo';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Chart = () => {
    return (
        <>
            <Breadcrumb pageName="Chart" />

            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                <ChartOne />
                <ChartTwo />
                <ChartThree />
            </div>
        </>
    );
};

export default Chart;

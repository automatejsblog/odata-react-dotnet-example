import { Spinner, SpinnerSize } from '@fluentui/react';
import { State, toODataString } from '@progress/kendo-data-query';
import { Grid, GridColumn as Column, GridDataStateChangeEvent } from '@progress/kendo-react-grid';
import { IGroupDto } from 'app/generated/backend';
import React, { useEffect, useState } from 'react';

const Groups: React.FC = () => {
    const [data, setData] = useState({
        groups: [] as IGroupDto[],
        isFetching: false
    });

    const [dataState, setDataState] = useState<State | null>(null);

    const dataStateChange = (e: GridDataStateChangeEvent) => {
        setDataState(e.dataState);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({ groups: data.groups, isFetching: true });
                const queryString = dataState ? toODataString(dataState) : '';
                const result = await fetch(process.env.REACT_APP_API_BASE + '/odata/groups?' + queryString);
                const groups = (await result.json()).value;
                setData({ groups, isFetching: false });
            } catch (e) {
                console.log(e);
                setData({ groups: data.groups, isFetching: false });
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataState]);

    return (
        <>
            <h2>Groups</h2>
            <Grid
                filterable={true}
                sortable={true}
                pageable={true}
                {...dataState}
                data={data.groups}
                onDataStateChange={dataStateChange}>
                <Column field="name" title="Name" />
                <Column field="createdDate" filter="date" title="Created" />
                <Column field="updatedDate" filter="date" title="Updated" />
                <Column field="isActive" filter="boolean" title="Is Active" />
            </Grid>
            {data.isFetching && <Spinner size={SpinnerSize.large} />}
        </>
    );
};

export default Groups;

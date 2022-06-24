import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { doctorCategories, doctors } from '../../Services';
import AppContext from '../../context';
import useRouter from './../../hooks/useRouter';
import useDebounce from './../../hooks/useDebounce';
import Item from './item';
import { PlaceholderStatus } from './../../components';

import SearchBar from './../../svg/search-bar-svg';
import DrugItemSvg from './../../svg/drug-item-svg';

export default function Doctors({ history }) {
    const { dispatch, setQueryString, useQueryString, currentPath, notify,
        errorResponse } = React.useContext(AppContext);

    const [categories, setCategories] = React.useState([]);
    const [queryName] = React.useState('doctors');
    const queryClient = useQueryClient();
    const router = useRouter();

    const searchRef = React.useRef();
    const specializationRef = React.useRef();

    const [query, setQuery] = React.useState(router.query);
    const { specialization, search, page } = router.query;

    const [selectedSpecialization, setSelectedSpecialization] = React.useState(specialization || null);
    const [selectedSearch, setSelectSearch] = React.useState(search || null);
    const debouncedSearch = useDebounce(selectedSearch, 500);


    useQuery('doctor-categories', doctorCategories, {
        onError: (error) => setCategories([]),
        onSuccess: (data) => setCategories(data),
    });

    /* Page data */
    const { isLoading, isFetching, isError, data, error, refetch } = useQuery([queryName, query],
        () => doctors(setQueryString(query)), {
        keepPreviousData: true,
        staleTime: 10000,
        onError: (error) => errorResponse({ error, history, dispatch, exclude: [999] }),
    });

    React.useEffect(() => {
        //console.log({ isLoading, isFetching }, 'isLoading...')
    }, [isLoading, isFetching]);

    React.useEffect(() => {
        if (selectedSpecialization) {
            history.push(`${currentPath}${setQueryString({ ...query, specialization: selectedSpecialization })}`);
        }

        if (selectedSpecialization === "") {
            const { specialization, ...restSpecialization } = query;
            setSelectedSpecialization(null);
            history.push(`${currentPath}${setQueryString(restSpecialization)}`);
        }
    }, [selectedSpecialization]);

    React.useEffect(() => {
        if (debouncedSearch) {
            history.push(`${currentPath}${setQueryString({ ...query, search: debouncedSearch })}`);
        }

        if (debouncedSearch === '') {
            const { search, ...restSearch } = query;
            setSelectSearch(null);
            history.push(`${currentPath}${setQueryString(restSearch)}`);
        }
    }, [debouncedSearch]);

    const resetSearch = () => {
        //setSelectSearch(null);
        searchRef.current.value = '';
        specializationRef.current.value = '';
        history.push(currentPath);
    }

    React.useEffect(() => {
        setQuery(router.query);
        /* Clean up */
        return () => setQuery({});
    }, [router.query, data?.data]);

    const PageLoading = () =>
        <>
            <div className="mb-4">
                <SearchBar />
            </div>

            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6"><DrugItemSvg /></div>
                <div className="col-lg-4 col-md-4 col-sm-6"><DrugItemSvg /></div>
                <div className="col-lg-4 col-md-4 col-sm-6"><DrugItemSvg /></div>
            </div>
        </>

    return (<div className="content-body container">

        {isLoading ? (<PageLoading />) : (<>

            {isError && (<div className="p-5">
                <PlaceholderStatus onClick={refetch} />
            </div>)}

            {!isError && data?.data && (<>
                <div className="header-container">
                    <div className="hc-title">Available<br />Doctors</div>
                    <div className="hc-input-group">

                        <div className="input-group">
                            <select className="form-control" ref={specializationRef}
                                onChange={e => setSelectedSpecialization(e.target.value)}
                                value={specialization}>
                                <option value="" >Select Speciality</option>
                                {categories && categories.length > 0 && categories.map((row, index) =>
                                    <option key={index} value={row.aos}>{row.aos}</option>)}
                            </select>

                            <input type="text"
                                defaultValue={selectedSearch} ref={searchRef}
                                onChange={e => setSelectSearch(e.target.value)}
                                className="form-control doctor-search-input" placeholder="Search by Name" />
                            <button type="submit"></button>
                        </div>

                        {(search || specialization) && (<div className="text-reset-2" onClick={resetSearch}>Reset Search</div>)}
                    </div>
                </div>

                {data?.data && data?.data?.length === 0 && <div className="p-5">
                    <PlaceholderStatus text='No result found!' />
                </div>}

                {data?.data?.length > 0 && (<div class="row">
                    {data?.data?.map((row, index) => <Item key={index} data={row} />)}
                </div>)}
            </>)}

        </>)}
    </div>);
}